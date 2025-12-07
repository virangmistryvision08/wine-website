// toastMessage.js
import { toast } from "react-toastify";

const ToastMessage = {
  success: (message) => {
    toast.success(message || "Success!");
  },

  error: (message) => {
    toast.error(message || "Something went wrong!");
  },

  info: (message) => {
    toast.info(message || "Information");
  },

  warn: (message) => {
    toast.warn(message || "Warning!");
  },
};

export default ToastMessage;
