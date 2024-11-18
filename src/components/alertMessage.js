import React, { useEffect } from "react";

export default function AlertMessage({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const alertClass = type === "success" ? "alert-success" : "alert-danger";

  return (
    <div
      className={`alert ${alertClass} position-fixed top-0 start-50 translate-middle-x w-50`}
      role="alert"
      style={{ marginTop: '32px' }}
    >
      {message}
      <button
        type="button"
        className="btn-close position-absolute top-50 end-0 translate-middle-y"
        aria-label="Close"
        onClick={onClose}
      />
    </div>
  );
}
