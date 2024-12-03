import * as Yup from "yup";
import { warningMessage } from "../validator";

export const division = Yup.object().shape({
  division_description: Yup.string().required(warningMessage),
  division_id: Yup.string().optional(),
  b_active: Yup.string().optional(),
});

export type divisionFormtype = Yup.InferType<typeof division>;
