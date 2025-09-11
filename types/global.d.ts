// global.d.ts
export {};

declare global {
  interface Window {
  wsa?: {
    cnv: (type: string, value: number, code: string) => void;
    inflow?: (domain: string) => void;
    id?: string;
    key?: string;
  };
  wsa_do?: (wsa: typeof window.wsa) => void;
}

}
