import React from "react";

const FormGroup = ({ children }) => {
  return (
    <div className="form-group">
      <span className="span-form-group">Rp</span>
      {children}
    </div>
  );
};

export default FormGroup;
