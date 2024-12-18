import * as Yup from "yup";
import { warningMessage } from "../validator";

export const createAnnouncement = Yup.object().shape({
  title: Yup.string().required(warningMessage),
  description: Yup.string().required(warningMessage),
  file: Yup.string().optional()
});

export type createAnnouncementFormtype = Yup.InferType<typeof createAnnouncement>;
