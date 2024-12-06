import * as Yup from "yup";
import { warningMessage } from "../validator";

export const changeTicketStatus = Yup.object().shape({
  status: Yup.string().required(warningMessage),
});

export type changeTicketStatusFormtype = Yup.InferType<typeof changeTicketStatus>;
