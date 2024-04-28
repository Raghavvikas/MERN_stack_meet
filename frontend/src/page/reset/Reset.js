import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../component/form/button";
import CaptchaTest from "../../component/form/CaptchaTest";
import Input from "../../component/form/input";
import SectionHead from "../../component/section-head";
import AppLayout from "../../layout/appLayout";
import axios from "axios";
import { FormC } from "../../component/form/Validation";
import Model from "../../component/form/Popup";

function ResetPassword() {
  // useEffect(() => {
  //   getToken();
  // }, []);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [bool, setBool] = useState(false);
  const [state, setState] = useState({
    password: "",
    confirm_password: "",
  });

  const location = useLocation();
  const { token } = Object.fromEntries(new URLSearchParams(location.search));

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(baseUrl + "users/reset-password", {
        password: state.password,
        token: token,
      })
      .then((res) => {
        setState({ password: "", confirm_password: "" });
        setOpen(true);
        setMessage("Password has been reset successfully!");
        setBool(true);
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

  const handleClick = () => {
    if (bool) {
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
    values: {
      ...state,
      captcha: captcha,
    },
    onSubmit,
    onChange,
  });
  console.log(state, "state==");
  return (
    <AppLayout>
      <section className="elem">
        <SectionHead title="Reset Password" />
        <div className="container">
          <form onSubmit={formC.handleSubmit} className="form-center mt-5 pt-5">
            <Input
              type="password"
              label="New Password"
              className="form-control"
              name="password"
              value={state.password}
              errorText={formC.errors.password}
              onChange={formC.handleChange}
              onBlur={formC.handleBlur}
            />
            <Input
              type="password"
              label="Confirm Password"
              className="form-control"
              name="confirm_password"
              value={state.confirm_password}
              errorText={formC.errors.confirm_password}
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
              Reset Password
            </Button>
            <div>
              <a
                href="/login"
                variant="body2"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {"Return to Login!"}
              </a>
            </div>
          </form>
        </div>
      </section>
      <Model open={open}>
        <h1 className="pop_up_h1">{message}</h1>
        <Button type="button" className="btn btn-theme" onClick={handleClick}>
          OK
        </Button>
      </Model>
    </AppLayout>
  );
}
export default ResetPassword;
