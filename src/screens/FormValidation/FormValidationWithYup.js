import React, { Fragment, useState } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import "./FormValidationWithYup.css";
import { Row, Col } from "react-bootstrap";
import * as Yup from "yup";

const FormValidationWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });
  const [errors, setErrors] = useState();

  // ? YUP VALIDATION SCHEMA
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required "),
    lastName: Yup.string().required("Last Name is required "),
    email: Yup.string().email("Invalid Email").required("Email is required "),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digit")
      .required(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    birthDate: Yup.date().required("Date of birth is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
  });

  // ? SUBMIT BUTTON CLICK HANDLER
  const submitBtnClickHandler = async (e) => {
    setErrors();
    e.preventDefault();
    try {
      const result = await validationSchema.validate(formData, {
        abortEarly: false,
      });
      console.log("Result-->", result);
    } catch (error) {
      const newError = {};
      console.log(error.inner);
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });

      setErrors(newError);
    }
  };

  // ? HANDLE CHANGE FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ? HANDLER CHECKBOX
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  // ? JSX FOR FORM START
  return (
    <Fragment>
      <div className="yup_container">
        <h3 className="primary_heading">Form Validation With Yup Library</h3>
        <Row className="row">
          <Col>
            <div className="text_container">
              <label className="label_text">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData?.firstName}
                placeholder="Enter your first name"
                onChange={handleChange}
              />
              {errors?.firstName && (
                <div className="error_text">{errors?.firstName}</div>
              )}
            </div>
          </Col>
          <Col>
            <div className="text_container">
              <label className="label_text">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData?.lastName}
                placeholder="Enter your last name"
                onChange={handleChange}
              />
              {errors?.lastName && (
                <div className="error_text">{errors?.lastName}</div>
              )}
            </div>
          </Col>
          <Col>
            <div className="text_container">
              <label className="label_text">Email</label>
              <input
                type="email"
                name="email"
                value={formData?.email}
                placeholder="Enter your email"
                onChange={handleChange}
              />
              {errors?.email && (
                <div className="error_text">{errors?.email}</div>
              )}
            </div>
          </Col>
          <Col>
            <div className="text_container">
              <label className="label_text">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData?.phoneNumber}
                placeholder="Enter your phone number"
                onChange={handleChange}
              />
              {errors?.phoneNumber && (
                <div className="error_text">{errors?.phoneNumber}</div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text_container">
              <label className="label_text">Password</label>
              <input
                type="password"
                name="password"
                value={formData?.password}
                placeholder="Enter your password"
                onChange={handleChange}
              />
              {errors?.password && (
                <div className="error_text">{errors?.password}</div>
              )}
            </div>
          </Col>
          <Col>
            <div className="text_container">
              <label className="label_text">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData?.confirmPassword}
                placeholder="Confirm your password"
                onChange={handleChange}
              />
              {errors?.confirmPassword && (
                <div className="error_text">{errors?.confirmPassword}</div>
              )}
            </div>
          </Col>
          <Col>
            <div className="text_container">
              <label className="label_text">Age</label>
              <input
                type="number"
                name="age"
                value={formData?.age}
                placeholder="Enter your age"
                onChange={handleChange}
              />
              {errors?.age && <div className="error_text">{errors?.age}</div>}
            </div>
          </Col>
          <Col>
            <div className="text_container">
              <label className="label_text">Gender</label>
              <select
                className="dropdown"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors?.gender && (
                <div className="error_text">{errors?.gender}</div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <div className="text_container">
              <label className="label_text">Date of Birth</label>
              <input
                type="date"
                name="birthDate"
                value={formData?.birthDate}
                placeholder="Enter your date of birth"
                onChange={handleChange}
                className="dropdown"
              />
              {errors?.birthDate && (
                <div className="error_text">{errors?.birthDate}</div>
              )}
            </div>
          </Col>
          <Col md={6}>
            <div className="text_container">
              <label className="label_text">Interests</label>
              <div className="checkBox_container">
                <label>
                  <input
                    type="checkbox"
                    name="coding"
                    checked={formData?.interests.includes("coding")}
                    onChange={handleCheckboxChange}
                  />
                  <span className="checkbox">Coding</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="sports"
                    checked={formData?.interests.includes("sports")}
                    onChange={handleCheckboxChange}
                  />
                  <span className="checkbox">Sports</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="reading"
                    checked={formData?.interests.includes("reading")}
                    onChange={handleCheckboxChange}
                  />
                  <span className="checkbox">Reading</span>
                </label>
              </div>

              {errors?.interests && (
                <div className="error_text">{errors?.interests}</div>
              )}
            </div>
          </Col>
        </Row>

        <button
          onClick={(e) => submitBtnClickHandler(e)}
          className="submit_button"
        >
          Submit
        </button>

        <GoBackButton />
      </div>
    </Fragment>
  );
};

export default FormValidationWithYup;
