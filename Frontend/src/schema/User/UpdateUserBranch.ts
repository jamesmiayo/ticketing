import * as Yup from "yup";
import { warningMessage } from "../validator";

export const branchUser = Yup.object().shape({
  branch_id: Yup.string().required(warningMessage),
});

export type branchUserFormType = Yup.InferType<typeof branchUser>;
