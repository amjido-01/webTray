import * as yup from "yup";

export const signupSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full Name is required")
    .min(2, "Name must be at least 2 characters"),
  
  countryCode: yup.string().required("Country code is required"),
  
  phone: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(6, "Phone number must be at least 6 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .lowercase()
    .trim(),
  
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#^()_\-+={}\[\]|\\:;"'<>,./~]/,
      "Password must contain at least one special character"
    ),
});

export type SignupFormData = yup.InferType<typeof signupSchema>;