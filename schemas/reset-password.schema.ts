import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Those passwords don't match. Try again.")
    .required("Please confirm your password"),
})

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;