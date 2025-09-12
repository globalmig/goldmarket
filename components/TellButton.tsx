'use client'
import { conversion } from "@/util/conversion";
import Link from "next/link";
import { ReactNode } from "react";

interface TellButtonProps {
  children: ReactNode;
  className?: string;
  style?: {}
}

export default function TellButton({children, className, style} : TellButtonProps) {
    return(
        <Link href="tel:010-5482-4215" onClick={()=> conversion('4',1,'UAVHsFC')}
        className={className} style={style}>
            {children}
        </Link>
    )
}