import * as Yup from "yup";
import { warningMessage } from "../validator";

export const role = Yup.object().shape({
  name: Yup.string().required(warningMessage),
});

export type roleFormtype = Yup.InferType<typeof role>;
