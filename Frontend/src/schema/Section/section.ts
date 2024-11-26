import * as Yup from "yup";
import { warningMessage } from "../validator";

export const section = Yup.object().shape({
  section_description: Yup.string().required(warningMessage),
  section_id: Yup.string().optional(),
  department_id: Yup.string().required(warningMessage),
  b_active: Yup.string().optional(),
});

export type sectionFormtype = Yup.InferType<typeof section>;
