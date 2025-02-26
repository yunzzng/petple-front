import Description from "./Description";
import Root from "./Root";
import ToastContainer from "./ToastContainer";
import useToast from "../hooks/useToast";
import Close from "./Close";

const Toast = {
  Root,
  Description,
  Close,
};

export { useToast, ToastContainer };
export default Toast;
