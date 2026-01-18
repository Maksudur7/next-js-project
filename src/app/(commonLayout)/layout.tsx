import { Navbar1 } from "@/components/layout/navbar1";
import { ReactNode } from "react";

export default function commonLayout({children} : {children: ReactNode}) {
    return (
        <div>
        <Navbar1></Navbar1>
        {children}
        </div>
    );
}
