type MediaRecord = {
  list: MediaQueryList;
  listeners: Set<EventListenerOrEventListenerObject>;
};

const queries = new Map<string, MediaRecord>();

export function setMediaQuery(query: string, matches: boolean) {
  const record = getRecord(query);
  Object.defineProperty(record.list, 'matches', { value: matches, configurable: true });
  const event = Object.assign(new Event('change'), { matches, media: query });
  for (const listener of record.listeners) {
    if (typeof listener === 'function') listener.call(record.list, event);
    else listener.handleEvent(event);
  }
}

function getRecord(query: string): MediaRecord {
  const existing = queries.get(query);
  if (existing) return existing;
  const listeners = new Set<EventListenerOrEventListenerObject>();
  const list = {
    media: query,
    matches: query === '(prefers-reduced-motion: reduce)' || query === '(prefers-reduced-motion)',
    onchange: null,
    addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => listeners.add(listener),
    removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => listeners.delete(listener),
    addListener: (listener: EventListenerOrEventListenerObject) => listeners.add(listener),
    removeListener: (listener: EventListenerOrEventListenerObject) => listeners.delete(listener),
    dispatchEvent: () => true,
  } as MediaQueryList;
  const record = { list, listeners };
  queries.set(query, record);
  return record;
}

export function resetMediaQueries() {
  queries.clear();
  Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => getRecord(query).list,
    configurable: true,
    writable: true,
  });
}
