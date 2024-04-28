import { useState } from "react";
import Required from "./required";
export default function Input({ errorText, type, label, ...rest }) {
  const [passwordShow, setPasswordShow] = useState(false);
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="form-input">
        <input type={passwordShow ? "text" : type} {...rest} />
        {type === "password" ? (
          <button
            type="button"
            className="passwordIcon"
            onClick={() => setPasswordShow(!passwordShow)}
          >
            {passwordShow ? (
              <i className="fa-regular fa-eye"></i>
            ) : (
              <i className="fa-regular fa-eye-slash"></i>
            )}
          </button>
        ) : null}
      </div>
      <Required errorText={errorText} />
    </div>
  );
}
