import * as Yup from "yup";
import { warningMessage } from "../validator";

export const department = Yup.object().shape({
  department_description: Yup.string().required(warningMessage),
  department_id: Yup.string().optional(),
  division_id: Yup.string().optional(),
  b_active: Yup.string().optional(),
});

export type departmentFormtype = Yup.InferType<typeof department>;
