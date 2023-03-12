import { Box, Skeleton, SkeletonText, useColorMode } from "@chakra-ui/react";

const ProductSkeleton = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="transparent"
      rounded={"lg"}
      border={colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"}
    >
      <Skeleton mt="4" h={200} rounded={"md"} spacing="4" />
      <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" mx={"auto"} />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <Skeleton mt="4" h={50} rounded={"md"} spacing="4" />
    </Box>
  );
};

export default ProductSkeleton;
