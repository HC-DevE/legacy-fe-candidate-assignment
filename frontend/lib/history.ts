export type HistoryItem = {
  message: string;
  signature: string;
  signer: string;
  isValid: boolean;
  at: number;
};

function key(addr?: string) {
  return addr ? `dm.history:${addr.toLowerCase()}` : "dm.history:anon";
}

export function readHistory(addr?: string): HistoryItem[] {
  return JSON.parse(localStorage.getItem(key(addr)) || "[]");
}

export function pushHistory(addr: string | undefined, item: HistoryItem) {
  const prev = readHistory(addr);
  const next = [item, ...prev].slice(0, 50);
  localStorage.setItem(key(addr), JSON.stringify(next));
  return next;
}

export function clearHistory(addr?: string) {
  localStorage.removeItem(key(addr));
}
