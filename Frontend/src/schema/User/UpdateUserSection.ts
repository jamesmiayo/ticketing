import * as Yup from "yup";
import { warningMessage } from "../validator";

export const sectionUser = Yup.object().shape({
  department_id: Yup.string().required(warningMessage),
  division_id: Yup.string().required(warningMessage),
  section_id: Yup.string().required(warningMessage),
});

export type sectionUserFormType = Yup.InferType<typeof sectionUser>;
