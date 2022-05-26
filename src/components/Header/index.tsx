import { Flex } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { SearchBox } from "./SearchBox";

export function Header() {
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
            <SearchBox/>
        </Flex>
    )
}