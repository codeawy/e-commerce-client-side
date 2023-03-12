import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  FormHelperText,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/loginSlice";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function LoginPage({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to={-1} replace />;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { loading } = useSelector(selectLogin);

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const goBack = () => navigate(-1);

  const submitHandler = e => {
    e.preventDefault();

    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }

    setIsEmail(false);
    setIsPassword(false);
    dispatch(userLogin(user));
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack mx={"auto"} maxW={"lg"}>
        <Flex
          alignItems={"center"}
          maxW="sm"
          mr={"auto"}
          my={3}
          fontSize={"lg"}
          cursor={"pointer"}
          onClick={goBack}
        >
          <BsArrowLeft />
          <Text ml={2}>Back</Text>
        </Flex>

        <Stack align={"center"}>
          <Heading fontSize={"4xl"} mb={3}>
            Sign in to your account
          </Heading>
        </Stack>

        <Box
          as={"form"}
          rounded={"lg"}
          border={colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"}
          boxShadow={"10px 10px 0px 0px rgba(245,245,245,1)"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isEmail}
                errorBorderColor="crimson"
                name={"identifier"}
                value={user.identifier}
                onChange={onChangeHandler}
              />
              {isEmail ? <FormHelperText color="red.500">Email is required</FormHelperText> : null}
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPassword}
                  errorBorderColor="crimson"
                  name={"password"}
                  value={user.password}
                  onChange={onChangeHandler}
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword(showPassword => !showPassword)}
                    p={0}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword ? (
                <FormHelperText color="red.500">Password is required</FormHelperText>
              ) : null}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"#7f42f8"}>Forgot password?</Link>
              </Stack>
              <Button
                color={"#e6f3fd"}
                bg={isEmail || isPassword ? "red.500" : "#6b28ef"}
                _hover={{
                  bg: "#570af2",
                  border: "transparent",
                }}
                type="submit"
                h={16}
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
