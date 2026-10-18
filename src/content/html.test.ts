import { describe, expect, it } from 'bun:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import viteConfig, { siteMetadataPlugin } from '../../vite.config';
import { content } from './index';
import { escapeHtml, renderSiteHtml } from './html';
import type { SiteContent } from './types';

const template = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');

function expectMetadata(html: string, metadata: SiteContent['metadata']) {
  const page = new DOMParser().parseFromString(html, 'text/html');
  expect(page.documentElement.lang).toBe(metadata.lang);
  expect(page.title).toBe(metadata.title);
  for (const [selector, value] of [
    ['meta[name="description"]', metadata.description],
    ['meta[name="author"]', metadata.author],
    ['meta[name="keywords"]', metadata.keywords],
    ['meta[property="og:title"]', metadata.socialTitle],
    ['meta[property="og:description"]', metadata.socialDescription],
    ['meta[property="og:url"]', metadata.url],
    ['meta[property="og:image"]', metadata.image],
    ['meta[name="twitter:title"]', metadata.socialTitle],
    ['meta[name="twitter:description"]', metadata.socialDescription],
    ['meta[name="twitter:image"]', metadata.image],
  ]) expect(page.querySelector(selector)?.getAttribute('content')).toBe(value);
  expect(page.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(metadata.url);
  expect(html).not.toMatch(/__SITE_[A-Z_]+__/);
  return page;
}

describe('site metadata', () => {
  it('renders the current SEO into the production HTML template before React runs', () => {
    const html = siteMetadataPlugin.transformIndexHtml.handler(template);
    expect(viteConfig.plugins).toContain(siteMetadataPlugin);
    expect(html).toBe(renderSiteHtml(template, content.metadata));
    expectMetadata(html, content.metadata);
    expect(content.metadata.title).toBe('zhoux77899 | Projects, research & life');
    expect(content.metadata.description).toBe("zhoux77899's personal site: AI, microscopy research, small devices, open-source tools, and travels.");
    expect(content.metadata.socialDescription).toBe('AI, microscopy research, small devices, open-source tools, and travels.');
  });

  it('uses the same metadata through the development HTML transform', async () => {
    const server = await createServer({
      configFile: false,
      root: fileURLToPath(new URL('../../', import.meta.url)),
      cacheDir: '.tools/vite-content-test',
      plugins: [siteMetadataPlugin],
      optimizeDeps: { noDiscovery: true, include: [] },
      server: { middlewareMode: true, watch: null, hmr: false },
    });
    try {
      expectMetadata(await server.transformIndexHtml('/', template), content.metadata);
    } finally {
      await server.close();
    }
  });

  it('escapes text and attributes without allowing metadata to inject markup', () => {
    const value = '\'" data-injected="true"><script>alert("x")</script> & text';
    const metadata: SiteContent['metadata'] = {
      lang: value,
      title: value,
      description: value,
      author: value,
      keywords: value,
      socialTitle: value,
      socialDescription: value,
      url: value,
      image: value,
    };
    const page = expectMetadata(renderSiteHtml(template, metadata), metadata);
    expect(page.querySelector('[data-injected]')).toBeNull();
    expect(page.querySelectorAll('script')).toHaveLength(2);
    expect(escapeHtml('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;');
  });

  it('rejects misspelled metadata tokens instead of publishing unfinished HTML', () => {
    expect(() => renderSiteHtml('<title>__SITE_TITEL__</title>', content.metadata))
      .toThrow('Unknown site metadata token: __SITE_TITEL__');
  });
});
