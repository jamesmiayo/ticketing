import * as Yup from "yup";
import { warningMessage } from "../validator";

export const phoneNumberUser = Yup.object().shape({
    phone_number: Yup.string()
  .required(warningMessage)
  .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
});

export type phoneNumberUserFormType = Yup.InferType<typeof phoneNumberUser>;
