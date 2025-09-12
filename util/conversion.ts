export function conversion(type: string, value: number, code: string): void {
  if (typeof window !== "undefined" && window.wsa) {
    window.wsa.cnv(type, value, code);
  }
}
