'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname();
    const isHome = pathname === '/'

    return (
        <header className={`${isHome ? "home-header" : "inner-header"}`}>
            <div className="display-flex">
                <div>
                    <Link href="/">
                        <Image src="/images/logo.png" alt="메인페이지 이동" width={300} height={60} />
                    </Link>
                </div>
                <nav>
                    <ul className="display-flex">
                        <li><Link href="/">메인 화면</Link></li>
                        <li><Link href="/goldbar">골드바</Link></li>
                        <li><Link href="/silverbar">실버바</Link></li>
                        <li><Link href="/goldbaby">순금베이비</Link></li>
                        <li><Link href="/goldgift">순금기념품</Link></li>
                        <li><Link href="/goldcoin">순금코인</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}