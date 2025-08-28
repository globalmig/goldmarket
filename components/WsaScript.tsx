"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function WsaScript() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      if (window.wsa && typeof window.wsa.inflow === "function") {
        console.log("✅ wsa 객체 발견됨:", window.wsa);

        try {
          window.wsa.inflow("www.goldmarket.co.kr");

          if (typeof window.wsa_do === "function") {
            window.wsa_do(window.wsa);
            console.log("🚀 wsa 실행 완료");
          }
        } catch (err) {
          console.error("wsa 실행 중 에러:", err);
        }

        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Script src="//wsa.mig-log.com/wsalog.js" strategy="afterInteractive" />
      <Script
        id="wsa-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function initWsa() {
                if (window.wsa && typeof window.wsa.inflow === "function") {
                  window.wsa.inflow("www.goldmarket.co.kr");
                  if (typeof window.wsa_do === "function") {
                    window.wsa_do(window.wsa);
                  }
                } else {
                  setTimeout(initWsa, 300);
                }
              }
              initWsa();
            })();
          `,
        }}
      />
    </>
  );
}
