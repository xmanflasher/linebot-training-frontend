// src/lib/utils.js

/**
 * ✅ 合併 class names（常用於 Tailwind）
 * 篩掉 falsy 值（false, null, undefined, 0, ""）
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * 🕒 格式化日期為 YYYY-MM-DD
 */
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * ⏱️ debounce：延遲執行，避免高頻觸發
 * @param {Function} fn 
 * @param {number} delay 
 */
export function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * 📋 deepClone：深拷貝一個物件
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 🧩 groupBy：依某個 key 對陣列資料分組
 * @param {Array} array 
 * @param {Function|string} keyFn 
 */
export function groupBy(array, keyFn) {
  const keyGetter = typeof keyFn === 'function' ? keyFn : (item) => item[keyFn];
  return array.reduce((acc, item) => {
    const key = keyGetter(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

/**
 * 🔢 range：生成從 start 到 end（不含）數字陣列
 */
export function range(start, end) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}
