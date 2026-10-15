export interface HairlineHandle {
  set(value: number): void;
  destroy(): void;
  activate?(point: [number, number] | null): void;
}
export interface HairlineDefinition {
  name: string;
  means: string;
  range: [number, number, number];
  mount(host: { stage: HTMLElement; svg: SVGElement; read: { textContent: string } }, value: number): HairlineHandle;
}
interface HairlineEngine {
  inject(root: Document): void;
  mk(tag: string, attributes: Record<string, string>, parent: Element): SVGElement;
}
declare global {
  interface Window {
    HL?: HairlineEngine;
    hairline?: (definition: HairlineDefinition) => void;
  }
}
const names = new Set(['explorer', 'microscope', 'cfgan', 'cardputer', 'index-box', 'folio', 'fridge', 'patch-panel', 'fjord', 'onsen', 'rooftops', 'new-zealand', 'japan', 'china']);
const definitions = new Map<string, HairlineDefinition>();
const pending = new Map<string, Promise<HairlineDefinition>>();
let enginePromise: Promise<HairlineEngine> | undefined;
function loadEngine(): Promise<HairlineEngine> {
  if (enginePromise) return enginePromise;
  window.hairline = (definition) => { definitions.set(definition.name, definition); };
  enginePromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${import.meta.env.BASE_URL}hairline/kernel.js`;
    script.async = true;
    script.onload = () => {
      if (!window.HL) { reject(new Error('Hairline engine did not initialize.')); return; }
      window.HL.inject(document);
      resolve(window.HL);
    };
    script.onerror = () => reject(new Error('Hairline engine could not load.'));
    document.head.append(script);
  });
  return enginePromise;
}
export async function loadFigure(name: string): Promise<{ engine: HairlineEngine; definition: HairlineDefinition }> {
  if (!names.has(name)) throw new Error(`Unknown illustration: ${name}`);
  const engine = await loadEngine();
  let promise = pending.get(name);
  if (!promise) {
    promise = new Promise((resolve, reject) => {
      // Module scripts isolate each figure's constants without transforming the canonical source.
      const script = document.createElement('script');
      script.type = 'module';
      script.src = `${import.meta.env.BASE_URL}hairline/figures/${name}.js`;
      script.onload = () => {
        const definition = definitions.get(name);
        if (definition) resolve(definition);
        else reject(new Error(`Illustration did not register: ${name}`));
      };
      script.onerror = () => reject(new Error(`Illustration could not load: ${name}`));
      document.head.append(script);
    });
    pending.set(name, promise);
  }
  return { engine, definition: await promise };
}
