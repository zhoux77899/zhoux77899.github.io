import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { Window } from 'happy-dom';

// Static fallbacks use the real rest geometry and the site's complete CSS cascade.
// Happy DOM supplies CSS values; no browser, image rasterizer, or rewritten kernel is needed.
const root = fileURLToPath(new URL('../../', import.meta.url));
const names = ['cfgan', 'cardputer', 'index-box', 'folio', 'fridge', 'patch-panel'];
const kernel = readFileSync(resolve(root, 'public/hairline/kernel.js'), 'utf8');
const brandCss = readFileSync(resolve(root, 'src/styles/globals.css'), 'utf8');
const kernelSha256 = createHash('sha256').update(kernel).digest('hex');
const output = resolve(root, 'public/hairline/previews');
const shapeSelector = 'path,polygon,ellipse,line,circle,polyline,rect';
const styleProperties = ['fill', 'stroke', 'stroke-width', 'stroke-opacity', 'fill-opacity', 'stroke-linecap',
  'stroke-linejoin', 'vector-effect', 'stroke-dasharray', 'opacity'];
const report = [];
mkdirSync(output, { recursive: true });

for (const name of names) {
  const source = readFileSync(resolve(root, `public/hairline/figures/${name}.js`), 'utf8');
  const figureSha256 = createHash('sha256').update(source).digest('hex');
  const instrumented = source.replace(/=\s*HL\s*;/, '=globalThis.__previewKernel;');
  assert.notEqual(instrumented, source, `${name}: the figure must consume the public HL API.`);

  for (const theme of ['light', 'dark']) {
    const window = new Window();
    const document = window.document;
    const brandStyle = document.createElement('style');
    // @import is the bundler's job. The local site overrides provide all color values.
    brandStyle.textContent = brandCss.replace(/^@(?:import|source)[^;]+;/gm, '');
    document.head.append(brandStyle);
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    const stage = document.createElement('div');
    stage.className = 'hairline-stage';
    stage.dataset.hairline = name;
    document.body.append(stage);
    let definition;
    const ticks = [];
    const context = vm.createContext({ document, window, console, performance: { now: () => 0 },
      hairline: (value) => { definition = value; } });
    vm.runInContext(kernel, context);
    context.HL.inject(document);
    context.__previewKernel = { ...context.HL, pointer: () => () => {}, register: (_stage, callback) => {
      ticks.push(callback); return { wake() {}, unregister() {} };
    } };
    vm.runInContext(instrumented, context);
    assert.equal(definition?.name, name, `${name}: figure registration must match the destination.`);
    const svg = context.HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, stage);
    const read = { textContent: 'rest' };
    const controller = definition.mount({ stage, svg, read }, definition.range[1]);
    let moving = true, frames = 0;
    while (moving && frames < 240) {
      moving = ticks.map((tick) => tick(1 / 60, frames * 1000 / 60)).some(Boolean);
      frames++;
    }
    assert.equal(moving, false, `${name}: the resting figure must settle.`);
    assert.equal(read.textContent, 'rest', `${name}: exporting must not activate an item.`);

    const rootStyle = window.getComputedStyle(document.documentElement);
    const palette = Object.fromEntries(['background', 'foreground', 'accent'].map((key) =>
      [key, rootStyle.getPropertyValue(`--${key}`).trim()]));
    for (const [key, value] of Object.entries(palette)) assert(value.startsWith('oklch('), `${name}: missing ${theme} ${key}.`);
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', '400'); clone.setAttribute('height', '320');
    clone.setAttribute('data-theme', theme); clone.setAttribute('data-hairline', name);
    clone.setAttribute('focusable', 'false');
    clone.setAttribute('style', `display:block;background:${palette.background};color:${palette.foreground}`);
    const originalShapes = [...svg.querySelectorAll(shapeSelector)];
    const copiedShapes = [...clone.querySelectorAll(shapeSelector)];
    let highlights = 0;
    originalShapes.forEach((shape, index) => {
      if (shape.closest('defs')) return;
      const css = window.getComputedStyle(shape);
      const properties = styleProperties.flatMap((key) => {
        const value = css.getPropertyValue(key).trim();
        return value ? [`${key}:${value}`] : [];
      });
      copiedShapes[index].setAttribute('style', properties.join(';'));
      if (shape.classList.contains('hi')) {
        assert.equal(css.stroke, palette.accent, `${name}: highlighted strokes must use the site's accent.`);
        assert.equal(copiedShapes[index].style.stroke, palette.accent);
        highlights++;
      }
    });
    assert(highlights > 0, `${name}: the resting drawing must have an accent mark.`);
    const content = clone.outerHTML + '\n';
    assert(!/NaN|Infinity/.test(content), `${name}: every geometry coordinate must be finite.`);
    assert(!/<(?:script|text|foreignObject|image)\b/i.test(content), `${name}: the fallback must contain only self-contained SVG geometry.`);
    assert(!/var\(|(?:href|src)\s*=|url\(\s*["']?(?!#)/i.test(content), `${name}: every style and reference must be self-contained.`);
    const ids = new Set([...clone.querySelectorAll('[id]')].map((element) => element.id));
    for (const [, id] of content.matchAll(/url\(["']?#([^"')]+)["']?\)/g)) assert(ids.has(id), `${name}: unresolved SVG resource ${id}.`);
    const file = `${name}-${theme}.svg`;
    writeFileSync(resolve(output, file), content);
    const geometrySha256 = createHash('sha256').update(originalShapes.map((shape) => shape.getAttribute('d') ?? shape.outerHTML).join('\n')).digest('hex');
    report.push({ name, theme, file, paths: svg.querySelectorAll('path').length, highlights, frames, palette, figureSha256, geometrySha256 });
    controller.destroy();
    assert.equal(svg.childNodes.length, 0, `${name}: destruction must clear the figure.`);
    window.happyDOM.abort();
  }
}

for (const name of names) {
  const pair = report.filter((entry) => entry.name === name);
  assert.equal(pair[0].geometrySha256, pair[1].geometrySha256, `${name}: both themes must use identical geometry.`);
}
const summary = { kernelSha256, browserInspected: false, previews: report };
if (process.argv[2]) {
  const destination = resolve(root, process.argv[2]);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, JSON.stringify(summary, null, 2) + '\n');
}
console.log(JSON.stringify(summary, null, 2));
