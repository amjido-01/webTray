import * as yup from 'yup';

const onboardingSchema = yup.object().shape({
  businessName: yup.string().required("Business name is required"),
  businessType: yup.string().required("Business type is required"),
  description: yup.string().required("Business description is required"),
  address: yup.string().required("Business address is required"),
  contactInfo: yup.object().shape({
    phone: yup.string().required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  }),
  category: yup.object().shape({
    main: yup.array().of(yup.string().required()).min(1, "Please select at least one category").required(),
  }),
  storeName: yup.string().required("Store name is required"),
  slogan: yup.string().optional(),
  customeDomain: yup.string().optional(),
  currency: yup.string().required("Currency is required"),
  paymentMethods: yup.object().shape({
    paystack: yup.boolean().required(),
    bankTransfer: yup.boolean().required(),
    cashOnDelivery: yup.boolean().required(),
  }).test(
    "at-least-one",
    "Please select at least one payment method",
    (value) => value.paystack || value.bankTransfer || value.cashOnDelivery
  ),
  deliveryOptions: yup.object().shape({
    inHouse: yup.boolean().required(),
    thirdParty: yup.array().of(yup.string().required()).required(),
  }).test(
    "at-least-one",
    "Please select at least one delivery option",
    (value) => value.inHouse || value.thirdParty.length > 0
  ),
})

export default onboardingSchema