import { Grid } from "@chakra-ui/layout";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useQuery } from "react-query";
import ProductSkeleton from "../components/ProductCardSkeleton";

const ProductsPage = () => {
  const getProductList = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/products?populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data } = useQuery("products", getProductList);

  if (isLoading)
    return (
      <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </Grid>
    );

  return (
    <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
      {data.data.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
