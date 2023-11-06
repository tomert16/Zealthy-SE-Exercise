import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const requestTicketSubmitted = () => {
    toast.success('Your request has been sent✅', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  export const requestNotSubmitted = () => {
    toast.error('Unable to submit request❌', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  export const successgullySentEmail = (request) => {
    toast.success(`Email successfully sent to ${request.name}✅`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };