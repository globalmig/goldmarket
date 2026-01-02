export function conversion(type: string, value: number, code: string): void {
  if (typeof window !== "undefined" && window.wsa) {
    window.wsa.cnv(type, value, code);
  }
}

export function naverConversion(type: string, wa: string): void {
  if (typeof window === "undefined" || !window.wcs) return;

  window.wcs_add = window.wcs_add ?? {};
  window.wcs_add.wa = wa;

  window.wcs.trans({ type });
}