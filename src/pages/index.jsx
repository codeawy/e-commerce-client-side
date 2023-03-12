import { Grid, Stack } from "@chakra-ui/layout";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { AiOutlinePlus } from "react-icons/ai";
import ProductSkeleton from "../components/ProductCardSkeleton";
import { Button, Progress } from "@chakra-ui/react";

const HomePage = () => {
  const getProductList = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate=thumbnail,category&pagination[pageSize]=3&pagination[page]=${pageParam}`
    );
    return data;
  };

  // const { isLoading, data } = useQuery("products", getProductList);
  const { data, isLoading, isFetching, fetchNextPage, isError, hasNextPage } = useInfiniteQuery(
    ["products"],
    getProductList,
    {
      getNextPageParam: (lastPage, _) => {
        if (lastPage.meta.pagination.page < lastPage.meta.pagination.pageCount)
          return lastPage.meta.pagination.page + 1;

        return false;
      },
    }
  );

  if (isLoading)
    return (
      <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </Grid>
    );

  return (
    <>
      {isFetching ? (
        <Progress
          size="xs"
          isIndeterminate
          colorScheme={"purple"}
          position={"fixed"}
          top={"0"}
          left={"0"}
          w={"full"}
        />
      ) : null}

      <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
        {data.pages.map(product =>
          product.data.map(product => <ProductCard key={product.id} {...product} />)
        )}
      </Grid>

      {isLoading ? (
        <Stack mx={"auto"} w="fit-content" my={20}>
          <Button colorScheme="purple" variant="solid" width={141} height={"40px"} />
        </Stack>
      ) : null}

      {hasNextPage && !isLoading ? (
        <Stack mx={"auto"} w="fit-content" my={20}>
          <Button
            rightIcon={<AiOutlinePlus />}
            variant="solid"
            onClick={fetchNextPage}
            color="white"
            bg="#6b28ef"
            _hover={{
              bg: "#570af2",
              border: "transparent",
            }}
            fontSize="md"
          >
            LOAD MORE
          </Button>
        </Stack>
      ) : null}
    </>
  );
};

export default HomePage;
