'use client'
import usePrice from "@/hook/usePrice";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"

export default function AdminPage() {

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const [form, setForm] = useState({
        buy: 0,
        sell: 0,
        rate: 0,
    });

    const router = useRouter();
    const currentPrice = usePrice();

    useEffect(() => {
        if (currentPrice?.buy != null && currentPrice?.sell != null) {
            setForm({
                buy: currentPrice.buy,
                sell: currentPrice.sell,
                rate: currentPrice.rate ?? 0,
            });
        }
    }, [currentPrice]);

    const onSubmitPassword = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: password })
        });

        if (res.ok) {
            setIsAuth(true);
            alert("관리자페이지 접속에 성공했습니다.")
        } else {
            alert("비밀번호가 틀렸습니다.")
        }
    }, [password]);

    const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { buy, sell } = form;

        if (!buy.toString().trim()) {
            alert("살때의 시세를 입력해주세요.");
            return;
        }

        if (!sell.toString().trim()) {
            alert("팔때의 시세를 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('buy', String(form.buy));
        formData.append('sell', String(form.sell));
        formData.append('rate', String(form.rate));

        const res = await fetch("/api/price", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("시세가 변경되었습니다.")
            router.push("/");
        } else {
            const err = await res.json();
            console.log(err)
            alert("시세 변동을 실패했습니다. 다시 시도해주세요.");
        }
    }, [form, router]);

    if (!currentPrice) return null;

    return (
        <article className="admin">
            <div>
                <h2>{isAuth ? "시세 변경" : "관리자 인증 확인"}</h2>
                {isAuth ?
                    <>
                        <form onSubmit={onSubmit} className="change-form">
                            <h3>금 시세 변경</h3>
                            <div className="display-flex">
                                <div>
                                    <div>
                                        <label htmlFor="buy">팔때</label>
                                    </div>
                                    <input type="number" id="buy" name="buy" placeholder="변동된 시세를 입력하세요." onChange={onChange} value={form.buy} />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="sell">살때</label>
                                    </div>
                                    <input type="number" id="sell" name="sell" placeholder="변동된 시세를 입력하세요." onChange={onChange} value={form.sell} />
                                </div>
                                <div>
                                    <div>
                                        <label htmlFor="rate">요율</label>
                                    </div>
                                    <input type="number" id="rate" name="rate" placeholder="요율을 입력하세요." onChange={onChange} value={form.rate} />
                                </div>
                            </div>
                            <button type="submit">변경</button>
                        </form>
                        <div>
                            <h4>오늘의 시세</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th><p>살때 <span>(VAT포함)</span></p></th>
                                        <th><p>팔때</p></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p>{Number(currentPrice.buy).toLocaleString()}원</p>
                                        </td>
                                        <td>
                                            <p>{Number(currentPrice.sell).toLocaleString()}원</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <form onSubmit={onSubmitPassword}>
                        <h3>비밀번호 입력</h3>
                        <div>
                            <input type="password" id="password" name="password" placeholder="비밀번호를 입력하세요." onChange={onChangePassword} value={password}/>
                        </div>
                        <button type="submit">인증하기</button>
                    </form>
                }
            </div>
        </article>
    )
}