'use client'
import { conversion, naverConversion } from "@/util/conversion";
import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

interface TellButtonProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties
}

export default function TellButton({ children, className, style }: TellButtonProps) {

    const onClickTelButton = () => {
        conversion('4', 1, 'UAVHsFC')
        naverConversion('lead', 's_2744ddc174ff')
    }

    return (
        <Link href="tel:010-5482-4215" onClick={onClickTelButton}
            className={className} style={style}>
            {children}
        </Link>
        
    )
}