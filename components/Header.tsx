'use client'
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";

export default function Header() {

    // const pathname = usePathname();
    // const isHome = pathname === '/'
    const [navOpen, setNavOpen] = useState(false);

    return (
        <header className="inner-header">
            <div className="display-flex">
                <div>
                    <Link href="/">
                        <Image src="/images/logo.png" alt="메인페이지 이동" width={300} height={60} />
                    </Link>
                </div>
                <nav className={navOpen ? "open-nav" : ""}>
                    <div>
                        <button className="mo" type="button" onClick={() => setNavOpen(false)}>
                            <Image src="/icons/close.png" alt="메뉴 닫기 버튼" width={25} height={25} />
                        </button>
                    </div>
                    <ul className="display-flex">
                        <li><Link href="/">메인 화면</Link></li>
                        <li><Link href="/goldbar" onClick={() => setNavOpen(false)}>골드바</Link></li>
                        <li><Link href="/silverbar" onClick={() => setNavOpen(false)}>실버바</Link></li>
                        <li><Link href="/goldbaby" onClick={() => setNavOpen(false)}>순금베이비</Link></li>
                        <li><Link href="/goldgift" onClick={() => setNavOpen(false)}>순금기념품</Link></li>
                        <li><Link href="/goldcoin" onClick={() => setNavOpen(false)}>순금코인</Link></li>
                    </ul>
                </nav>
                <div className={`mo ${navOpen ? "overlay" : ""}`}></div>
                <div>
                    <button className="mo" type="button" onClick={() => setNavOpen(true)}>
                        <div>
                            <Image src="/icons/menu.png" alt="메뉴 열기 버튼" width={30} height={25} />
                        </div>
                    </button>
                </div>
            </div>
            <Script src="//wsa.mig-log.com/wsalog.js" type="text/javascript" strategy="beforeInteractive" />
            <Script
                id="wsa-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
             wsa.inflow("goldmarket.co.kr");
            wsa_do(wsa);
          `
                }}
            />
        </header>
    )
}