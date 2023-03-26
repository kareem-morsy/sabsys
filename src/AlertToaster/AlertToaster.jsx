import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AlertToaster(){
  const notify = (tostarState) => toast(tostarState);
  toast.success('Welcome!', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  return (
    <div>
      <button onClick={() => notify("ERORR!")}>Notify Error!</button>
      <button onClick={() => notify("Success!")}>Notify Success!</button>
        
    <ToastContainer
    position="top-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    </div>
  );
}
