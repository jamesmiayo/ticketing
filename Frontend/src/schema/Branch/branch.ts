import * as Yup from "yup";
import { warningMessage } from "../validator";

export const branch = Yup.object().shape({
  branch_description: Yup.string().required(warningMessage),
  branch_id: Yup.string().optional(),
  b_active: Yup.string().optional(),
});

export type branchFormtype = Yup.InferType<typeof branch>;
