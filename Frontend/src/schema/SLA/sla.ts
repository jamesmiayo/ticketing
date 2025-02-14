import * as Yup from "yup";
import dayjs from "dayjs";
import { warningMessage } from "../validator";

export const sla = Yup.object().shape({
  priority_label: Yup.string().required(warningMessage),
  response_time: Yup.mixed<dayjs.Dayjs>().nullable().required(warningMessage),
  SLA_ID: Yup.string().optional(),
});

export type slaFormtype = Yup.InferType<typeof sla>;
