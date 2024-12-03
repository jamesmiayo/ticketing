import * as Yup from "yup";
import { warningMessage } from "../validator";

export const updateUserBranchSection = Yup.object().shape({
  branch_id: Yup.string().required(warningMessage),
  division_id: Yup.string().required(warningMessage),
  department_id: Yup.string().required(warningMessage),
  section_id: Yup.string().required(warningMessage),
});

export type updateUserBranchSectionFormType = Yup.InferType<typeof updateUserBranchSection>;
