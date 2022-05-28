import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";

export function Header() {
    const { asPath } = useRouter()
    const isDetail = asPath.includes('detail') 

    return(
        <Flex
            as="header"
            w="100%"
            maxWidth={1460}
            h="28"
            mx="auto"
            px="6"
            align="center"
            justify={{
                base: 'center',
                sm: "center",
                md: "center",
                lg: "space-between"
            }}
            flexWrap="wrap"
            borderBottom="1px solid"
            borderBottomColor="teal.100"
        >
            <Logo/>
            {!isDetail && <SearchBox/>}
        </Flex>
    )
}