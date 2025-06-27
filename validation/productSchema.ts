import * as yup from "yup";

export const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .min(0, "Quantity cannot be negative")
    .required("Quantity is required"),
  storeId: yup.number().required("Store is required"),
  categoryId: yup.number().required("Category is required"),
  images: yup.object({
    main: yup.string().url().required(),
    thumbnail: yup.string().url().required(),
  }),
});

export type ProductFormData = yup.InferType<typeof productSchema>;
