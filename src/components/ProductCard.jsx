import { Button } from "@chakra-ui/button";
import { Card, CardBody } from "@chakra-ui/card";
import { useColorMode } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

const ProductCard = ({ id, attributes }) => {
  console.log(attributes?.thumbnail);
  const { colorMode } = useColorMode();

  return (
    <Card border={"1px solid #2d3748"} bg={"none"} rounded={"lg"}>
      <CardBody>
        <Image
          src={attributes?.thumbnail?.data?.attributes?.formats?.small?.url}
          alt="Green double couch with wooden legs"
          rounded="lg"
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} mb={2}>
            {attributes.title}
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"}>
            This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned
            spaces and for people who love a chic design with a sprinkle of vintage design.
          </Text>
          <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
            $450
          </Text>
          <Button
            as={Link}
            to={`/products/${id}`}
            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
            size={"xl"}
            variant="outline"
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            _hover={{
              bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
              color: colorMode === "light" ? "white" : "#9f7aea",
              border: "transparent",
            }}
            mt={6}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
