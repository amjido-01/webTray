import * as yup from "yup";

export const productValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name cannot exceed 100 characters"),
  category: yup.string().required("Category is required"),
  price: yup
    .string()
    .required("Price is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Price must be a valid number")
    .test("min-price", "Price must be greater than 0", function (value) {
      return parseFloat(value || "0") > 0;
    }),
  stock: yup
    .string()
    .required("Stock quantity is required")
    .matches(/^\d+$/, "Stock must be a whole number")
    .test("min-stock", "Stock must be at least 0", function (value) {
      return parseInt(value || "0") >= 0;
    }),
  description: yup
    .string()
    .optional()
    .max(500, "Description cannot exceed 500 characters"),
});
