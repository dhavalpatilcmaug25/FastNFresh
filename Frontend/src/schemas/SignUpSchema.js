import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Please select a role"),
});
