import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const ContactForm = () => {

  const [selectGender, setSelectGender] = useState("Select Gender");


  const [user, SetUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  let name, value;

  const getUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    SetUser({ ...user, [name]: value });
  };

  const SubmitUser = async (e) => {
    e.preventDefault();

    const { name, email, mobile, address } = user;

    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9+-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

    if(regEx.test(email)){
      if (name && email && mobile && address && selectGender) {
        if (mobile.length == 10) {
          if (name.length >= 3) {
            const res = await fetch(
              "https://fir-app-39509-default-rtdb.firebaseio.com/firebase-app.json",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  mobile,
                  gender: selectGender,
                  address,
                }),
              }
            );
            if (res) {
              SetUser({
                name: "",
                email: "",
                mobile: "",
                address: "",
              })
  
              alert("User added successfully");
            }
  
           
          } else {
            alert("name should be more than 3 charcters long");
          }
        } else {
          alert("number should be 10 digits");
        }
      } else {
        alert("All fields are required");
      }
    }else if(!regEx.test(email) && email !== ""){
      alert("email is not valid")
    }else{
      return
    }


  };

  return (
    <>
      <section className="get_in_touch">
        <h1 className="title">Get in touch</h1>

        <div className="container">
          <div className="contact-form row">
            <div className="form-field col-lg-6">
              <input
                id="name"
                className="input-text"
                type="text"
                name="name"
                value={user.name}
                onChange={getUserData}
                autoComplete="off"
                required
              />
              <label htmlFor="name" className="label">
                Name
              </label>
            </div>

            <div className="form-field col-lg-6">
              <input
                id="email"
                className="input-text"
                type="email"
                name="email"
                value={user.email}
                onChange={getUserData}
                autoComplete="off"
                required
              />
              <label htmlFor="email" className="label">
                Email
              </label>
            </div>

            <div className="form-field col-lg-6">
              <input
                id="mobile"
                className="input-text"
                type="mobile"
                name="mobile"
                value={user.mobile}
                onChange={getUserData}
                autoComplete="off"
                required
              />
              <label htmlFor="mobile" className="label">
                Phone No
              </label>
            </div>

            <div className="form-field col-lg-6">
             
              <select
                className="form-select input-text"
                name="gender"
                value={user.gender}
                onChange={(e) => setSelectGender(e.target.value)}
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="form-field h-12 col-lg-12">
              <textarea
                id="mobile"
                className="input-text textarea"
                type="text"
                name="address"
                value={user.address}
                onChange={getUserData}
                autoComplete="off"
                required
              />
              <label htmlFor="mobile" className="label">
                Address
              </label>
            </div>

            <div className="form-field col-lg-6">
              <input
                id="name"
                className="submit-btn"
                type="submit"
                value="submit"
                onClick={SubmitUser}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
