export function xmlEscape(value: string): string {
  return value.replace(/[<>&'\"]/g, (char) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;',
  }[char] || char));
}
