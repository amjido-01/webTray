import * as yup from "yup";
import { CategoryFormData } from "@/types";

export const categorySchema: yup.ObjectSchema<CategoryFormData> = yup.object().shape({
  name: yup
    .string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters")
    .trim(),
  description: yup
    .string()
    .optional()
    .max(200, "Description must be less than 200 characters")
    .trim(),
});

export type ValidationErrors = Partial<Record<keyof CategoryFormData, string>>;