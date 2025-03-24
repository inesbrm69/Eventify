import React from "react";
import { Button } from "../../atoms";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative min-w-[300px] max-w-xl w-full">
        <Button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
          &#10005;
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;