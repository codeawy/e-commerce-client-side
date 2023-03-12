import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import imgFalBack from "../assets/img-placeholder.png";
import { addToCart } from "../app/features/cartSlice";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=thumbnail,category&fields=title,price,description`
    );
    return data;
  };

  const { isLoading, data } = useQuery(["products", id], getProductList);
  const goBack = () => navigate(-1);

  const addToCartHandler = () => dispatch(addToCart(data.data));

  if (isLoading)
    return (
      <Box maxW="sm" mx={"auto"} my={20}>
        <ProductDetailsSkeleton />
      </Box>
    );

  return (
    <>
      <Flex
        alignItems={"center"}
        maxW="sm"
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card maxW="sm" mx={"auto"} mb={20} border={"1px solid #a8b5c8"} bg={"none"}>
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${
              data?.data?.attributes?.thumbnail?.data?.attributes?.url
            }`}
            alt={data?.data?.attributes?.title}
            borderRadius="lg"
            h={"200px"}
            w={"full"}
            fallbackSrc={imgFalBack}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"}>
              {data?.data?.attributes?.title}
            </Heading>
            <Text textAlign={"center"}>{data?.data?.attributes?.description}</Text>
            <Text color="blue.100" fontSize="2xl" textAlign={"center"}>
              {data?.data?.attributes?.category?.data?.attributes?.title}
            </Text>
            <Text color="blue.300" fontSize="2xl" textAlign={"center"}>
              ${data?.data?.attributes?.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="purple"
            onClick={addToCartHandler}
            w={"full"}
            size={"lg"}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "white" : "#9f7aea",
              border: "transparent",
            }}
            p={8}
            textTransform={"uppercase"}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductPage;
