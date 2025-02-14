import * as Yup from "yup";
import { warningMessage } from "../validator";

export const faq_hdr = Yup.object().shape({
  description: Yup.string().required(warningMessage),
  FAQ_ID: Yup.string().optional(),
});

export type faq_hdrFormtype = Yup.InferType<typeof faq_hdr>;

export const faq_dtl = Yup.object().shape({
  FAQ_ID: Yup.string().required(warningMessage),
  title: Yup.string().required(warningMessage),
  body: Yup.string().required(warningMessage),
});

export type faq_dtlFormtype = Yup.InferType<typeof faq_dtl>;
