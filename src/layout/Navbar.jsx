import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Container,
} from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import CookieService from "../services/CookieService";
import { selectCart } from "../app/features/cartSlice";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";
import { useSelector, useDispatch } from "react-redux";

const NavLink = ({ children }) => (
  <Link
    as={RouterLink}
    to={children.toLowerCase()}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    fontWeight={"500"}
    fontSize={"sm"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector(selectCart);
  const { colorMode, toggleColorMode } = useColorMode();
  const token = CookieService.get("jwt");

  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };

  const onOpen = () => dispatch(onOpenCartDrawerAction());

  return (
    <Box
      borderBottom={colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"}
      px={4}
      mb={16}
    >
      <Container maxW="7xl">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <NavLink fontWeight={"500"} fontSize={"sm"}>
              Home
            </NavLink>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              {token ? <NavLink>Dashboard</NavLink> : null}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoon /> : <BsSun />}
              </Button>
              <Button onClick={onOpen}>Cart ({cartProducts.length})</Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={"https://avatars.dicebear.com/api/male/username.svg"}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
                  <NavLink as={RouterLink} to="/login">
                    Login
                  </NavLink>
                </HStack>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
