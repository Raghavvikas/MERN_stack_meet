import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/form/button";
import Input from "../../component/form/input";
import Model from "../../component/form/Popup";
import { FormC, onKeyPress } from "../../component/form/Validation";
import SectionHead from "../../component/section-head";
import AppLayout from "../../layout/appLayout";

const Profile = () => {
  useEffect(() => {
    axios
      .get(baseUrl + `users/get-profile`, {
        headers: { authorization: `${token}` },
      })
      .then((d) => {
        console.log(d.data, "testtt");
        setState({
          _id: d.data.user._id ? d.data.user._id : "",
          parent_name: d.data?.user?.parent_name
            ? d.data?.user?.parent_name
            : "",
          pet_name: d.data?.user?.pet_name ? d.data?.user?.pet_name : "",
          email: d.data?.user?.email ? d.data?.user?.email : "",
          phone_number: d.data?.user?.phone_number
            ? d.data?.user?.phone_number
            : "",
          gender: d?.data?.profile?.gender ? d?.data?.profile?.gender : "",
          date_of_birth: d?.data?.profile?.date_of_birth
            ? d?.data?.profile?.date_of_birth
            : "",
          address: d?.data?.profile?.address ? d?.data?.profile?.address : "",
          parent_photo: d?.data?.profile?.parent_photo
            ? d?.data?.profile?.parent_photo
            : "",
          pet_age: d?.data?.pet?.pet_age ? d?.data?.pet?.pet_age : "",

          color: d?.data?.pet?.color ? d?.data?.pet?.color : "",

          category: d?.data?.pet?.category ? d?.data?.pet?.category : "",

          breed: d?.data?.pet?.breed ? d?.data?.pet?.breed : "",

          pet_photo: d?.data?.pet?.pet_photo ? d?.data?.pet?.pet_photo : "",
        });
        // setDate(d.data.profile.date_of_birth.substring(0, 10));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  var formData = new FormData();

  const [state, setState] = useState({
    _id: "",
    parent_name: "",
    pet_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    address: "",
    parent_photo: [],
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [multiFile, setMultiFile] = useState([]);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("refresh_token");

  const onSubmit = async (e) => {
    console.log(state, "test1");
    for (let param in state) {
      console.log("hitt");
      formData.append("param", state[param]);
    }
    console.log(formData, "testtt");

    await axios
      .post(
        baseUrl + "users/update-profile",

        {
          _id: state._id,
          parent_name: state.parent_name,
          pet_name: state.pet_name,
          email: state.email,
          phone_number: state.phone_number,
          gender: state.gender,
          date_of_birth: state.date_of_birth,
          address: state.address,
          parent_photo: state.parent_photo,
        },
        { headers: { authorization: `${token}` } }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setMessage("Profile updated successfully!!");
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

  const onSingleImage = (e) => {
    setState(e.target.files[0]);
  };

  const onMultiImage = (e) => {
    setMultiFile(e.target.files);
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const formC = FormC({
    values: { ...state, multiFile },
    onSubmit,
    onChange,
    onSingleImage,
    onMultiImage,
  });
  const handleClick = () => {
    if (message.includes("success")) {
      navigate("/");
    } else {
      setOpen(false);
    }
  };

  return (
    <AppLayout>
      <section className="elem">
        <SectionHead title="Parent Profile " />
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
              type="text"
              label="Gender"
              className="form-control"
              name="gender"
              default={state.gender}
              value={state.gender}
              onChange={formC.handleChange}
              errorText={formC.errors.gender}
              onBlur={formC.handleBlur}
            />
            <Input
              type="date"
              label="Date of birth"
              className="form-control"
              name="date_of_birth"
              value={state.date_of_birth}
              onChange={formC.handleChange}
              errorText={formC.errors.date_of_birth}
              onBlur={formC.handleBlur}
            />

            <Input
              type="text"
              label="Address"
              className="form-control"
              name="address"
              value={state.address}
              onChange={formC.handleChange}
              errorText={formC.errors.address}
              onBlur={formC.handleBlur}
            />
            <div>
              <Input
                type="file"
                label="Parent Photo"
                className="form-control"
                name="parent_photo"
                onChange={formC.handleChange}
                errorText={formC.errors.parent_photo}
                onBlur={formC.handleBlur}
              />
            </div>

            <Button
              type="submit"
              style={{ marginLeft: "35%" }}
              className="pet-button pet-button-theme"
            >
              Update
            </Button>
            <div className="d-flex align-items-center justify-content-between py-4">
              <Link className="link-primary" to="/pet-profile">
                Edit existing pet?
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
};

export default Profile;
