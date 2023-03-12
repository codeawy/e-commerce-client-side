import { useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const InternetConnectionProvider = ({ children }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const toastIdRef = useRef();

  function close() {
    toast.closeAll(toastIdRef.current);
  }

  function addToast() {
    toastIdRef.current = toast({
      title: "You'r offline.",
      description: "Please make sure you have internet connectivity.",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  }
  const setOnline = () => {
    dispatch(networkMode(true));
    close();
  };

  const setOffline = () => {
    dispatch(networkMode(false));
    addToast();
  };

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      // ** Cleanup
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return children;
};

export default InternetConnectionProvider;
