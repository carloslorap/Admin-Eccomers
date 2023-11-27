import React from "react";

const CustomInput = (props) => {
  const { type, label,i_id, i_class,  name,val,onCh,onBl} = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        placeholder={label}
        id={i_id}
        name= {name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
      />
      <label for="">{label}</label>
    </div>
  );
};

export default CustomInput;
