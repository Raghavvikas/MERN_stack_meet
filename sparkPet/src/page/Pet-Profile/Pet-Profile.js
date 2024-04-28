import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/form/button";
import Input from "../../component/form/input";
import SectionHead from "../../component/section-head";
import AppLayout from "../../layout/appLayout";
import axios from "axios";
import { FormC, onKeyPress } from "../../component/form/Validation";
import Model from "../../component/form/Popup";

function PetProfile() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("refresh_token");

  useEffect(() => {
    axios
      .get(baseUrl + `users/get-profile`, {
        headers: { authorization: `${token}` },
      })
      .then((d) => {
        setState({
          _id: d.data.user._id ? d.data.user._id : "",
          pet_name: d.data?.user?.pet_name ? d.data?.user?.pet_name : "",
          pet_age: d?.data?.pet?.pet_age ? d?.data?.pet?.pet_age : "",

          color: d?.data?.pet?.color ? d?.data?.pet?.color : "",

          category: d?.data?.pet?.category ? d?.data?.pet?.category : "",

          breed: d?.data?.pet?.breed ? d?.data?.pet?.breed : "",

          pet_photo: d?.data?.pet?.pet_photo ? d?.data?.pet?.pet_photo : "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        pet_name: state.pet_name,
        pet_age: state.pet_age,
        color: state.color,
        category: state.category,
        breed: state.breed,
        pet_photo: state.pet_photo,
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
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
        <SectionHead title="Pet Profile " />
        <div className="container">
          <form
            onSubmit={formC.handleSubmit}
            className="form-center mt-5 pt-5"
            noValidate
          >
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
              type="tel"
              label="Pet Age"
              className="form-control"
              name="pet_age"
              value={state.pet_age}
              onChange={formC.handleChange}
              errorText={formC.errors.pet_age}
              onBlur={formC.handleBlur}
            />
            <Input
              type="text"
              label="Color"
              className="form-control"
              name="color"
              value={state.color}
              onChange={formC.handleChange}
              errorText={formC.errors.color}
              onBlur={formC.handleBlur}
            />
            <Input
              type="text"
              label="Category"
              className="form-control"
              name="category"
              value={state.category}
              onChange={formC.handleChange}
              errorText={formC.errors.category}
              onBlur={formC.handleBlur}
            />
            <Input
              type="text"
              label="Breed"
              className="form-control"
              name="breed"
              value={state.breed}
              onChange={formC.handleChange}
              errorText={formC.errors.breed}
              onBlur={formC.handleBlur}
            />
            <Input
              type="file"
              label="Pet Photo"
              className="form-control"
              name="pet_photo"
              // value={state.pet_photo}
              onChange={formC.handleChange}
              errorText={formC.errors.pet_photo}
              onBlur={formC.handleBlur}
              multiple
            />
            <Button
              type="submit"
              style={{ marginLeft: "35%" }}
              className="pet-button pet-button-theme"
            >
              Update
            </Button>
            <div className="d-flex align-items-center justify-content-between py-4">
              <Link to="/signup" className="link-primary">
                {"Add a new pet?"}
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

export default PetProfile;
