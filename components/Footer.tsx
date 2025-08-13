import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
export default function Footer() {

    return (
        <>
            <footer>
                <Link href="tel:010-5482-4215" className="display-flex" style={{ width: '40px', maxWidth: '70px' }}>
                    <Image src="/icons/tel.png" alt="전화문의" width={100} height={100} />
                </Link>
                <div className="display-flex">
                    <div>
                        <ul className="display-flex">
                            <li><Link href="/admin">관리자페이지</Link></li>
                        </ul>
                        <div>
                            <p>쇼핑몰 기본정보</p>
                            <ul className="display-flex-flow">
                                <li>상호명 <span>(주)한국금시장거래소 압구정점</span></li>
                                <li>대표자 <span>김보은</span></li>
                                <li>사업장 주소 <span>서울특별시 강남구 압구정로 28길 14, 1층 101호 (신사동)</span></li>
                                <li>대표 전화 <span>010-5482-4215</span></li>
                                <li>사업자 등록번호 <span>784-66-00614</span></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Image src="/images/business_card.png" alt="대표님 명함" width={557} height={346} />
                    </div>
                </div>
            </footer>
            <Script
                src="//wsa.mig-log.com/wsalog.js"
                type="text/javascript"
                strategy="beforeInteractive"
            />
            <Script
        src="//wsa.mig-log.com/wsalog.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.wsa?.inflow(".goldmarket.co.kr");
          window.wsa_do?.(window.wsa);
        }}
      />
        </>
    )
}