import * as yup from "yup";

export const profileSettingsSchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .min(6, "Phone number must be at least 6 digits"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .lowercase()
    .trim(),
});

export const passwordSettingsSchema = yup.object().shape({
  currentpassword: yup
    .string()
    .required("Current password is required"),
  newpassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmnewpassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newpassword")], "Passwords must match"),
});

export type ProfileSettingsFormData = yup.InferType<typeof profileSettingsSchema>;
export type PasswordSettingsFormData = yup.InferType<typeof passwordSettingsSchema>;
