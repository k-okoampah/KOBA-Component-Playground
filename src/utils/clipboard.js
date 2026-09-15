/**
 * Safe clipboard utility supporting modern Async Clipboard API with
 * seamless execCommand fallback for sandboxed iframes and non-focused documents.
 * Never throws unhandled promise rejections.
 *
 * @param {string} text - The text string to copy
 * @returns {Promise<boolean>} Resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text) {
  if (!text || typeof text !== 'string') return false;

  // 1. Try modern navigator.clipboard API first
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Modern API rejected (e.g. document not focused in iframe), proceed to fallback
    }
  }

  // 2. Fallback using temporary textarea + execCommand
  if (typeof document !== 'undefined') {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // Position off-screen without altering scroll
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '-9999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus({ preventScroll: true });
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Boolean(success);
    } catch {
      return false;
    }
  }

  return false;
}
