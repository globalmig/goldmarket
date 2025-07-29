'use client'

import { ReactNode } from "react"

interface PrivacyLayoutProps {
    title: string,
    children: ReactNode 
}

export default function PrivacyLayout({title, children} : PrivacyLayoutProps) {
    return(
        <article className="privacy-layout">
            <div>
                <div>
                    <h2>{title}</h2>
                </div>
                <>
                {children}
                </>
            </div>
        </article>
    )
}