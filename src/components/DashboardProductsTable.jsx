import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Textarea,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import TableSkeleton from "./TableSkeleton";
import {
  useCreateDashboardProductsMutation,
  useDeleteDashboardProductsMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../app/services/products";
import CustomAlertDialog from "../shared/AlertDialog";
import { useEffect, useState } from "react";
import CustomModal from "../shared/Modal";
import { useSelector } from "react-redux";
import { selectNetwork } from "../app/features/networkSlice";

const DashboardProductsTable = () => {
  const { isOnline } = useSelector(selectNetwork);
  const [clickedProductId, setClickedProductId] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToCreate, setProductToCreate] = useState({
    title: "",
    description: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();
  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });
  const [destroyProduct, { isLoading: isDestroying, isSuccess }] =
    useDeleteDashboardProductsMutation();
  const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdatingSuccess }] =
    useUpdateDashboardProductsMutation();
  const [createProduct, { isLoading: isCreating, isSuccess: isCreatingSuccess }] =
    useCreateDashboardProductsMutation();

  /** --------- EDITING --------- */
  const onChangeHandler = e => {
    const { name, value } = e.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
  };

  const onChangePriceHandler = value =>
    setProductToEdit({
      ...productToEdit,
      price: +value,
    });

  const onChangeStockHandler = value =>
    setProductToEdit({
      ...productToEdit,
      stock: +value,
    });

  const onChangeThumbnailHandler = e => setThumbnail(e.target.files[0]);

  const onSubmitHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
      })
    );
    formData.append("files.thumbnail", thumbnail);
    updateProduct({ id: clickedProductId, body: formData });
  };

  /** --------- CREATING --------- */
  const onChangeCreateHandler = e => {
    const { name, value } = e.target;

    setProductToCreate({
      ...productToCreate,
      [name]: value,
    });
  };

  const onChangePriceCreateHandler = value =>
    setProductToCreate({
      ...productToCreate,
      price: +value,
    });

  const onChangeStockCreateHandler = value =>
    setProductToCreate({
      ...productToCreate,
      stock: +value,
    });

  const onSubmitCreateHandler = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToCreate.title,
        description: productToCreate.description,
        price: productToCreate.price,
        stock: productToCreate.stock,
      })
    );
    formData.append("files.thumbnail", thumbnail);
    createProduct(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
    if (isUpdatingSuccess) {
      setClickedProductId(null);
      onModalClose();
    }
    if (isCreatingSuccess) {
      onCreateModalClose();
    }
  }, [isSuccess, isUpdatingSuccess, isCreatingSuccess]);

  if (isLoading || !isOnline) return <TableSkeleton />;

  return (
    <>
      <Flex direction={"column"} maxW="85%" mx={"auto"} my={6}>
        <Button
          rightIcon={<AiOutlinePlus />}
          colorScheme="green"
          onClick={() => {
            onCreateModalOpen();
          }}
          ml={"auto"}
          w={"fit-content"}
        >
          Create
        </Button>
        <TableContainer border={"1px solid #2d3748"} rounded={"lg"} p={3} my={6}>
          <Table variant="simple">
            <TableCaption>Total Entries: {data?.data?.length ?? 0}</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.map(product => (
                <Tr key={product.id}>
                  <Td>{product?.id}</Td>
                  <Td>{product?.attributes?.title}</Td>
                  <Td>{product?.attributes?.category?.data?.attributes?.title ?? "N/A"}</Td>
                  <Td>
                    <Image
                      borderRadius="full"
                      objectFit={"cover"}
                      boxSize="40px"
                      src={
                        product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url
                      }
                      alt={product?.attributes?.title}
                    />
                  </Td>
                  <Td isNumeric>${product?.attributes?.price}</Td>
                  <Td isNumeric>{product?.attributes?.stock}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
                      colorScheme="purple"
                      variant="solid"
                      mr={3}
                      onClick={() => {}}
                    >
                      <AiOutlineEye size={17} />
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="solid"
                      mr={3}
                      onClick={() => {
                        setClickedProductId(product.id);
                        onOpen();
                      }}
                    >
                      <BsTrash size={17} />
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => {
                        setClickedProductId(product.id);
                        setProductToEdit(product.attributes);
                        onModalOpen();
                      }}
                    >
                      <FiEdit2 size={17} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>

      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={"Are you sure?"}
        description={"Do you really want to destroy this product? This product cannot be undone."}
        okTxt="Destroy"
        isLoading={isDestroying}
        onOkHandler={() => destroyProduct(clickedProductId)}
      />

      <CustomModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={"Update Product"}
        okTxt="Update"
        onOkClick={onSubmitHandler}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            my={3}
            placeholder="Product Title"
            name="title"
            value={productToEdit?.title}
            onChange={onChangeHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            name="description"
            value={productToEdit?.description}
            onChange={onChangeHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={productToEdit?.price}
            onChange={onChangePriceHandler}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in Stock</FormLabel>
          <NumberInput
            precision={2}
            step={0.2}
            name="price"
            defaultValue={productToEdit?.stock}
            onChange={onChangeStockHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>

      <CustomModal
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        title={"Update Product"}
        okTxt="Upload"
        onOkClick={onSubmitCreateHandler}
        isLoading={isCreating}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            my={3}
            placeholder="Product Title"
            name="title"
            value={productToCreate?.title}
            onChange={onChangeCreateHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            name="description"
            value={productToCreate?.description}
            onChange={onChangeCreateHandler}
          />
        </FormControl>

        <FormControl mb={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            name="price"
            defaultValue={productToCreate?.price}
            onChange={onChangePriceCreateHandler}
            precision={2}
            step={0.2}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in Stock</FormLabel>
          <NumberInput
            precision={2}
            step={0.2}
            name="price"
            defaultValue={productToCreate?.stock}
            onChange={onChangeStockCreateHandler}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id="thumbnail"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg"
            onChange={onChangeThumbnailHandler}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashboardProductsTable;
