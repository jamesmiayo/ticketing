import * as Yup from "yup";
import { warningMessage } from "../validator";

export const ticketAssign = Yup.object().shape({
  department: Yup.string().required(warningMessage),
  section: Yup.string().required(warningMessage),
  emp_id: Yup.string().required(warningMessage),
  division: Yup.string().required(warningMessage),
  remarks: Yup.string().optional(),
});

export type filterFormtype = Yup.InferType<typeof ticketAssign>;
