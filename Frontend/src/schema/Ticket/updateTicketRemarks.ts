import * as Yup from "yup";
import { warningMessage } from "../validator";

export const updateTicketRemarks = Yup.object().shape({
  remarks: Yup.string().required(warningMessage),
});

export type updateTicketRemarksFormtype = Yup.InferType<typeof updateTicketRemarks>;
