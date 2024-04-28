import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/form/button";
import CaptchaTest from "../../component/form/CaptchaTest";
import Input from "../../component/form/input";
import SectionHead from "../../component/section-head";
import AppLayout from "../../layout/appLayout";
import axios from "axios";
import { FormC } from "../../component/form/Validation";
import Model from "../../component/form/Popup";

function Login() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [state, setState] = useState({ email: "", password: "", captcha: "" });
  const [, setCaptcha] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(baseUrl + "users/login", {
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          const token = res.data.token;
          const parent_name = res.data.name;
          localStorage.refresh_token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("parent_name", parent_name);
          setState({ email: "", password: "" });
          setMessage("Logged in successfully!!");
          setOpen(true);
        }
      })
      .catch((error) => {
        setOpen(true);
        if (error.response) {
          setMessage(error?.response?.data?.message);
        } else if (error.request) {
          setMessage(error?.response?.data?.message);
        } else {
          setMessage(error?.response?.data?.message);
        }
      });
  };
  const handleClick = () => {
    if (message.includes("success")) {
      navigate("/");
    } else {
      setOpen(false);
    }
  };
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const formC = FormC({
    values: { ...state },
    onSubmit,
    onChange,
  });
  return (
    <AppLayout>
      <section className="elem">
        <SectionHead title="Log in" />
        <div className="container">
          <form
            onSubmit={formC.handleSubmit}
            className="form-center mt-5 pt-5"
            autoComplete="off"
            noValidate
          >
            <Input
              type="email"
              label="Email"
              maxLength={100}
              name="email"
              value={state.email}
              errorText={formC.errors.email}
              className="form-control"
              onChange={formC.handleChange}
              onBlur={formC.handleBlur}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              className="form-control"
              value={state.password}
              errorText={formC.errors.password}
              onChange={formC.handleChange}
              onBlur={formC.handleBlur}
            />
            <CaptchaTest
              errorText={formC.errors.captcha}
              value={state.captcha}
              captchaChange={(val) => setCaptcha(val)}
            />
            <Button
              type="submit"
              className="pet-button pet-button-theme"
              style={{ marginLeft: "35%" }}
            >
              Log in
            </Button>
            <div className="d-flex align-items-center justify-content-between py-4">
              <Link to="/signup" className="link-primary">
                {"Sign up here!"}
              </Link>
              <Link className="link-primary" to="/forget-password">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </section>
      <Model open={open}>
        <div className="text-center p-3">
          <h1 className="pop_up_h1">{message}</h1>
          <Button
            type="button"
            className="pet-button-theme pet-button"
            onClick={handleClick}
          >
            OK
          </Button>
        </div>
      </Model>
    </AppLayout>
  );
}
export default Login;
