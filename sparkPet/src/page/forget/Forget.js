import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/form/button";
import CaptchaTest from "../../component/form/CaptchaTest";
import Input from "../../component/form/input";
import SectionHead from "../../component/section-head";
import AppLayout from "../../layout/appLayout";
import axios from "axios";
import { FormC } from "../../component/form/Validation";
import Model from "../../component/form/Popup";

function ForgetPassword() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");
  const [state, setState] = useState({ email: "" });
  const token = localStorage.getItem("token");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        baseUrl + "users/forget-password",
        {
          email: state.email,
        },
        { headers: { Authorization: `${token}` } }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setState({ email: "" });
          setMessage(
            "An Email to reset your password, has been sent on your email id!"
          );
          setOpen(true);
        }
      })
      .catch((error) => {
        if (error?.response) {
          setMessage(error?.response?.data?.message);
        } else if (error?.request) {
          setMessage(error?.response?.data?.message);
        } else {
          setMessage(error?.response?.data?.message);
        }
        setOpen(true);
      });
  };

  const handleClick = () => {
    if (message.includes("email")) {
      navigate("/login");
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
    values: { ...state, captcha: captcha },
    onSubmit,
    onChange,
  });
  return (
    <AppLayout>
      <section className="elem">
        <SectionHead title="Forget Password" />
        <div className="container">
          <form
            onSubmit={formC.handleSubmit}
            noValidate
            className="form-center mt-5 pt-5"
          >
            <Input
              type="email"
              label="Email"
              name="email"
              value={state.email}
              errorText={formC.errors.email}
              className="form-control"
              onChange={formC.handleChange}
              onBlur={formC.handleBlur}
            />
            <CaptchaTest
              errorText={formC.errors.captcha}
              captchaChange={(val) => setCaptcha(val)}
            />
            <Button
              type="submit"
              className="pet-button pet-button-theme"
              style={{ marginLeft: "35%" }}
            >
              Forget Password
            </Button>
            <div className="py-4">
              <Link to="/login" variant="body2" className="link-primary">
                {"Return to Login!"}
              </Link>
            </div>
          </form>
        </div>
        <Model open={open}>
          <h1 className="pop_up_h1">{message}</h1>
          <Button type="button" className="btn btn-theme" onClick={handleClick}>
            OK
          </Button>
        </Model>
      </section>
    </AppLayout>
  );
}
export default ForgetPassword;
