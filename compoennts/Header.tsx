'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname();
    const isHome = pathname === '/'

    return (
        <header className={`display-flex ${isHome ? "home-header" : "inner-header"}`}>
            <div>
                <Image src="/images/logo.png" alt="로고" width={250} height={50}/>
            </div>
            <nav>
                <ul className="display-flex">
                    <li><Link href="/">메인 화면</Link></li>
                    <li><Link href="/goldbar">골드바</Link></li>
                    <li><Link href="/silverbar">실버바</Link></li>
                    <li><Link href="/jewelry">순금주얼리</Link></li>
                    <li><Link href="/goldcoin">순금코인</Link></li>
                    <li><Link href="/goldbaby">순금베이비</Link></li>
                    <li><Link href="/goldgift">순금기념품</Link></li>
                </ul>
            </nav>
        </header>
    )
}