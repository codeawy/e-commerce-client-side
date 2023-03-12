import { Button } from "@chakra-ui/button";
import { Card, CardBody } from "@chakra-ui/card";
import { useColorMode } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

const ProductCard = ({ id, attributes }) => {
  const { colorMode } = useColorMode();

  return (
    <Card
      border={colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"}
      bg={"none"}
      rounded={"lg"}
      boxShadow={"10px 10px 0px 0px rgba(245,245,245,1)"}
      transition={".3s ease-in-out"}
      _hover={{ transform: "translateY(-20px)" }}
    >
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
            bg={"#6b28ef"}
            color={"#e6f3fd"}
            size={"xl"}
            variant="outline"
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            _hover={{
              bg: "#570af2",
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
