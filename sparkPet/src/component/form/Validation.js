import { useState, useEffect } from "react";

export const validation = (data) => {
  const errors = {};
  for (const property in data) {
    if (
      data[property] === null ||
      data[property] === undefined ||
      !data[property].toString()
    )
      errors[property] = `Please enter ${
        property?.split("_") ? property?.split("_").join(" ") : property
      }`;
    if (property === "email" && data[property]) {
      if (ValidateEmailAddress(data[property])) {
        errors[property] = ValidateEmailAddress(data[property]);
      }
    }
    if (property === "confirm_password") {
      if (data["confirm_password"] !== data["password"])
        errors["confirm_password"] = "Password mismatch";
    }
    if (property === "confirm_new_password") {
      if (data["confirm_new_password"] !== data["new_password"])
        errors["confirm_new_password"] = "Password mismatch";
    }
    if (property.includes("password")) {
      let ragex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!ragex.test(data[property])) {
        errors[property] =
          "Password must have at least 8 characters and must be a combination of uppercase letters, lowercase letters, numbers and symbols.";
      }
    }
  }
  return errors;
};

export const ValidateEmailAddress = (emailString) => {
  if (!emailString) return "Please enter email";
  var atSymbol = emailString.indexOf("@");
  if (atSymbol < 1) return "Please enter email";
  var dot = emailString.indexOf(".");
  if (dot <= atSymbol + 2) return "Email is not valid";
  if (dot === emailString.length - 1) return "Email is not valid";
  return "";
};
export const onKeyPress = (evt, reg) => {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = reg ? reg : /^[0-9\b]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
};
export const FormC = ({ values, removeValidValue, onSubmit, onChange }) => {
  const [err, setErr] = useState({});
  const [stateParam, setStateParam] = useState({});
  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(stateParam)) {
      setStateParam(values);
    }
  }, [values]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = removeFormValidation(stateParam);
    const error = validation(data);
    setErr(error);
    if (Object?.keys(data)?.length) {
      onSubmit(e);
    } else {
      const err = Object.keys(error);
      if (err.length) {
        const input = document.querySelector(`input[name=${err[0]}]`);
        input.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
      }
    }
  };
  const handleNewError = (error) => {
    setErr({ ...err, ...error });
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const state = {
      ...stateParam,
      [name]: value,
    };
    setStateParam(state);
    const data = removeFormValidation({ [name]: value });
    if (!Object?.keys(data)?.length) {
      let error = validation(state);
      setErr(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!value) {
      return;
    }
    const state = {
      ...stateParam,
      [name]: value,
    };

    const data = removeFormValidation({ [name]: value });
    if (Object?.keys(data)?.length) {
      let error = validation(state);
      onChange(e);
      setErr(error);
    }
  };
  const removeFormValidation = (stateUpdate) => {
    let d = { ...stateUpdate };
    if (removeValidValue?.length) {
      for (let name in d) {
        if (removeValidValue?.includes(name)) {
          delete d[name];
        }
      }
    }
    return d;
  };
  const obj = {
    handleBlur,
    removeFormValidation,
    handleChange,
    handleSubmit,
    handleNewError,
    errors: err,
  };

  return obj;
};
