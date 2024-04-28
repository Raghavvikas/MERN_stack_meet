import React, { useState, useEffect } from "react";
import Button from "./button";
import Required from "./required";

const CaptchaTest = ({ errorText,captchaChange}) => {
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState(errorText);
  useEffect(() => {
    generateString();
  }, []);
  useEffect(() => {
    setError(errorText);
  }, [errorText]);
  const chars = "abc123";
  const generateString = () => {
    let result = "";
    const charactersLength = chars.length;
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCaptcha(result);
  };

  const onSubmit = (e) => {
    captchaChange(e.target.value)
    if (e.key === "Enter") {
      if (e.target.value === captcha) {
        setTimeout(() => {
          setError("Captcha Matched");
        }, 2000);
      } else {
        setTimeout(() => {
          setError("Captcha Does NOT Matched");
        }, 2000);
      }
    }
  };

  return (
    <div className="form-group">
      <label>Enter Captcha</label>
      <div className="d-flex captcha-input">
        <span>{captcha}</span>
        <div className="form-input w-100">
          <input
            type="text"
            className="form-control"
            name="captcha"
            onKeyDown={(e) => onSubmit(e)}
          />
          <Button
            type="button"
            className="refresh passwordIcon"
            onClick={generateString}
          >
            <i
              className="fa fa-refresh"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
            />
            &nbsp;
          </Button>
        </div>
      </div>
      {error ? <Required errorText={error} /> : ""}
    </div>
  );
};

export default CaptchaTest;
