'use client'
import usePrice from "@/hook/usePrice";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"

export default function AdminPage() {

    const [form, setForm] = useState({
        buy: 0,
        sell: 0,
    });
    const router = useRouter();

    const currentPrice = usePrice();

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const today = new Date();

        await fetch("api/price", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ buy: form.buy, sell: form.sell, date: today })
        })
        alert("시세가 변경되었습니다.")
        router.push("/");
    }, [form, router]);

    if (!currentPrice) return null;

    return (
        <article className="admin">
            <div>
                <h2>시세 변경</h2>
                <form onSubmit={onSubmit}>
                    <h3>금 시세 변경</h3>
                    <div className="display-flex">
                        <div>
                            <div>
                                <label htmlFor="number">팔때</label>
                            </div>
                            <input type="number" id="buy" name="buy" placeholder="변동된 시세를 입력하세요." onChange={onChange} value={form.buy} />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="number">살때</label>
                            </div>
                            <input type="number" id="sell" name="sell" placeholder="변동된 시세를 입력하세요." onChange={onChange} value={form.sell} />
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
                                    <p>{Number(currentPrice.price).toLocaleString()}원</p>
                                </td>
                                <td>
                                    <p>{Number(currentPrice.sell).toLocaleString()}원</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </article>
    )
}