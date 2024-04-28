import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/form/button";
import Input from "../../component/form/input";
import SectionHead from "../../component/section-head";
import AppLayout from "../../layout/appLayout";
import axios from "axios";
import { FormC, onKeyPress } from "../../component/form/Validation";
import Model from "../../component/form/Popup";

function SignUp() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    parent_name: "",
    pet_name: "",
    email: "",
    address: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    await axios
      .post(baseUrl + "users/signup", {
        parent_name: state.parent_name,
        pet_name: state.pet_name,
        email: state.email,
        phone: state.phone_number,
        password: state.password,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setState({
            parent_name: "",
            pet_name: "",
            email: "",
            phone_number: "",
            password: "",
            confirm_password: "",
          });
          setMessage("Registered Successfully!!");
          setOpen(true);
        }
      })
      .catch((error) => {
        setOpen(true);
        if (error?.response) {
          setMessage(error?.response?.data?.message);
        } else if (error?.request) {
          setMessage(error?.response?.data?.message);
        } else {
          setMessage(error?.response?.data?.message);
        }
      });
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const formC = FormC({
    values: state,
    onSubmit,
    onChange,
  });

  const handleClick = () => {
    if (message.includes("success")) {
      navigate("/login");
    } else {
      setOpen(false);
    }
  };
  return (
    <AppLayout>
      <section className="elem">
        <SectionHead title="Sign up" />
        <div className="container">
          <form
            onSubmit={formC.handleSubmit}
            className="form-center mt-5 pt-5"
            noValidate
          >
            <Input
              type="text"
              label="Parent Name"
              className="form-control"
              maxLength={70}
              value={state.parent_name}
              name="parent_name"
              errorText={formC.errors.parent_name}
              onChange={formC.handleChange}
              onBlur={formC.handleBlur}
            />
            <Input
              type="text"
              label="Pet Name"
              maxLength={70}
              className="form-control"
              name="pet_name"
              value={state.pet_name}
              onChange={formC.handleChange}
              errorText={formC.errors.pet_name}
              onBlur={formC.handleBlur}
            />
            <Input
              type="email"
              label="Email"
              maxLength={100}
              className="form-control"
              name="email"
              value={state.email}
              onChange={formC.handleChange}
              errorText={formC.errors.email}
              onBlur={formC.handleBlur}
            />
            <Input
              type="tel"
              label="Phone Number"
              maxLength={10}
              className="form-control"
              name="phone_number"
              value={state.phone_number}
              onChange={formC.handleChange}
              onKeyPress={onKeyPress}
              errorText={formC.errors.phone_number}
              onBlur={formC.handleBlur}
            />
            <Input
              type="password"
              label="Password"
              className="form-control"
              name="password"
              value={state.password}
              onChange={formC.handleChange}
              errorText={formC.errors.password}
              onBlur={formC.handleBlur}
            />
            <Input
              type="password"
              label="Confirm Password"
              className="form-control"
              name="confirm_password"
              value={state.confirm_password}
              onChange={formC.handleChange}
              errorText={formC.errors.confirm_password}
              onBlur={formC.handleBlur}
            />
            <Button
              type="submit"
              style={{ marginLeft: "35%" }}
              className="pet-button pet-button-theme"
            >
              Register
            </Button>
            <div className="d-flex py-4">
              <p>Already have an account?</p>&nbsp;
              <Link to="/login" variant="body2" className="link-primary">
                {"Sign in here!"}
              </Link>
            </div>
          </form>
        </div>
      </section>
      <Model open={open}>
        <h1 className="pop_up_h1">{message}</h1>
        <Button type="button" className="btn btn-theme " onClick={handleClick}>
          OK
        </Button>
      </Model>
    </AppLayout>
  );
}
export default SignUp;
