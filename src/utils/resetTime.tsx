import { RealtimeQueue } from "@/types/queue";

// Hitung expire jam 12 malam
export function getMidnightExpiry() {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // besok
    0,
    0,
    0,
    0
  );
  return midnight.getTime();
}

export function setWithMidnight(key: string, value: RealtimeQueue) {
  const item = {
    value,
    expire: getMidnightExpiry(),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithMidnight(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  if (Date.now() > item.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
