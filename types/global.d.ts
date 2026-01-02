// global.d.ts
export { };

declare global {
  interface Window {
    wsa?: {
      cnv: (type: string, value: number, code: string) => void;
    };
    wcs?: {
      trans: (conv: { type?: string }) => void;
    };
    wcs_add?: { wa?: string };
  }
}
