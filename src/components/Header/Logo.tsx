import { Image } from "@chakra-ui/react"
import Link from "next/link";

export function Logo(){
    return(
        <Link href="/">
            <Image
                width={{
                    base: '100%',
                    sm: '55%',
                    md: '40%',
                    lg: '40%',
                    xl: '30%',
                }}
                src="/images/logo2.png" 
                alt="logo"
            /> 
        </Link>
    )
}