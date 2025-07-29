import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer>

            <Link href="tel:010-9624-6765" className="display-flex" style={{ width: '40px', maxWidth: '70px' }}>
                <Image src="/icons/tel.png" alt="전화문의" width={100} height={100} />
            </Link>

            <div className="display-flex">
                <div>
                    <ul className="display-flex">
                        <li>브랜드소개</li>
                        <li><Link href="/member/agreement">이용약관</Link></li>
                        <li><Link href="/member/privacy">개인정보처리방침</Link></li>
                        <li><Link href="/member/term">이용안내</Link></li>
                        <li><Link href="/admin">관리자페이지</Link></li>
                    </ul>
                    <div>
                        <p>쇼핑몰 기본정보</p>
                        <ul className="display-flex-flow">
                            <li>상호명 <span>(주) 스태리그룹</span></li>
                            <li>대표자 <span>김보은</span></li>
                            <li>사업장 주소 <span>03139 서울 종로구 돈화문로5가길 1 피카디리플러스 5층 512호</span></li>
                            <li>대표 전화 <span>010-9624-6765</span></li>
                            <li>사업자 등록번호 <span>422-86-01687</span></li>
                            <li>통신판매업 신고번호 <span> 제 2020-서울종로-0777호 </span>
                                <span> [사업자정보확인] </span></li>
                            <li>개인정보보호책임자 <span>이은수</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Image src="/images/business_card.png" alt="대표님 명함" width={557} height={346}/>
                </div>
            </div>

        </footer>
    )
}