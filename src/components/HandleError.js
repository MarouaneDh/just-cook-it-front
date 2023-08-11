import React, { useEffect, useState } from "react";

const HandleError = ({ error }) => {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, []);
  return alert && <div>{error.msg}</div>;
};

export default HandleError;
