import { toast } from 'react-toastify';

// Success Toast
export const successHandle = (msg) => {
    toast(msg, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}

// Error Toast
export const errorHandle = (msg) => {
    toast(msg, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
}