import React, { useEffect } from "react";
import { useGlobalContext } from "./context";

const Alert = ({ msg }) => {
  const { todos, refContainer, alert, showAlert } = useGlobalContext();

  useEffect(() => {
    refContainer.current.style.left = `${alert.show ? "15px" : "-100%"}`;

    const timeout = setTimeout(() => {
      refContainer.current.style.left = "-100%";
      showAlert(false, alert.msg);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [alert, refContainer, showAlert, todos]);
  return (
    <p ref={refContainer} className='alert'>
      {msg}
    </p>
  );
};

export default Alert;
