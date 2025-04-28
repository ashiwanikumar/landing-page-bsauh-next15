import React from "react";

const ErrorModal = ({ isVisible, onClose, message }) => {
  if (!isVisible) return null;

  return (
    <div className="error-modal-backdrop">
      <div className="error-modal">
        <div className="error-modal-header">
          <button onClick={onClose} className="error-modal-close-btn">
            X
          </button>
        </div>
        <div className="error-modal-body">
          <p>{message}</p>
        </div>
        <div className="error-modal-footer">
          <button onClick={onClose} className="error-modal-close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
