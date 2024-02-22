import React, { Fragment, useState } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import "./FormValidationWithoutYup.css";
import { Row, Col } from "react-bootstrap";

const FormValidationWithoutYup = () => {
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

  // ? EMAIL VALIDATION
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  // ? PHONE NUMBER VALIDATION
  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for basic phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // ? PASSWORD VALIDATION
  const isValidPassword = (password) => {
    // Regular expressions for password validation
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  // ? AGE VALIDATION
  const isValidAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  };

  // ? CUSTOM VALIDATION RULES
  const validateForm = () => {
    let newErrors = {};

    if (!formData?.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData?.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData?.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords must match";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (!isValidAge(formData.age)) {
      newErrors.age =
        "You must be at least 18 years old and not older than 100 years";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (formData.interests.length === 0) {
      newErrors.interests = "Select at least one interest";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  console.log(errors);

  // ? SUBMIT BUTTON HANDLER
  const submitBtnClickHandler = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      console.log("Form Submitted", formData);
    } else {
      console.log("Form Validation Failed");
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
        <h3 className="primary_heading">Form Validation Without Yup Library</h3>
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

export default FormValidationWithoutYup;
