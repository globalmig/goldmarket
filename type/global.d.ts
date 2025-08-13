// global.d.ts
declare global {
  interface Window {
    wsa?: {
      inflow: (domain: string) => void;
      [key: string]: any;
    };
    wsa_do?: (arg: any) => void;
  }
}

export {};