import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Container maxW="7xl" mb={16}>
        <Outlet />
      </Container>
    </>
  );
};

export default AppLayout;
