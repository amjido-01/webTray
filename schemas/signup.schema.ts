import * as yup from "yup";

export const signupSchema = yup.object().shape({
  fullname: yup.string().required("Full Name is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 8 characters")
    .required("Password is required"),
});

export type SignupFormData = yup.InferType<typeof signupSchema>;