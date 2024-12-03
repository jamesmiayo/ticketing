import * as Yup from "yup";
import { warningMessage } from "../validator";

export const roleUser = Yup.object().shape({
  role_id: Yup.string().required(warningMessage),
});

export type roleUserFormType = Yup.InferType<typeof roleUser>;
