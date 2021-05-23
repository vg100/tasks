import "./styles.css";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

// let schema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().min(8, (msg) => `password must be ${msg.min}`)
// });

export default function App() {
  const [formValues, setFormValues] = useState({
    email: null,
    password: null,
    isSubmited: false,
    errors: {
      email: ``,
      password: ``
    }
  });

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const validateForm = (errors) => {
    // console.log(errors, `ggg`);
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formValues.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        formValues.errors.email = validEmailRegex.test(e.target.value)
          ? ""
          : "Email is not valid!";

        break;
      case "password":
        formValues.errors.password =
          e.target.value.length < 8
            ? "Password must be 8 characters long!"
            : "";
        break;
      default:
        break;
    }

    setFormValues((preval) => {
      console.log(preval, `pre`);
      return {
        ...preval,
        [e.target.name]: [e.target.value]
      };
    });
  };

  const handleBlur = () => {};

  const isSubmitting = () => {
    return true;
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={formValues.email}
      />
      {formValues.errors.email}
      <input
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={formValues.password}
      />
      {formValues.errors.password}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}
