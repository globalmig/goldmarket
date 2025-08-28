// global.d.ts
declare global {
  interface Window {
   wsa?: {
      cnv: (type: string, value: number, code: string) => void;
      inflow?: (domain: string) => void;
    };
    wsa_do?: (wsa: typeof window.wsa) => void;
  }
  }

export {};
