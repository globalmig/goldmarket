"use client";
import Script from "next/script";
import { useEffect } from "react";

interface WsaTrackerProps {
  domain?: string;
}

export default function WsaScript({ domain = "www.goldmarket.co.kr" }: WsaTrackerProps) {
  useEffect(() => {
    const initWSA = () => {
      if (window.wsa?.inflow) window.wsa.inflow(domain);
      if (typeof window.wsa_do === "function") window.wsa_do(window.wsa);
    };

    if (window.wsa) {
      initWSA();
    } else {
      window.addEventListener("load", initWSA);
      return () => window.removeEventListener("load", initWSA);
    }
  }, [domain]);

  return (
    <>
      <Script src="//wsa.mig-log.com/wsalog.js" type="text/javascript" strategy="afterInteractive" />
      <Script
        id="wsa-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            wsa.inflow("www.goldmarket.co.kr");
            wsa_do(wsa);
          `
        }}
      />
    </>
  )
}
