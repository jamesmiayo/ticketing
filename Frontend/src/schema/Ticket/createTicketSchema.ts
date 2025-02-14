import * as Yup from 'yup';
import { warningMessage } from '../validator';

export const ticketValidationSchema = Yup.object().shape({
  title: Yup.string().required(warningMessage),
  concern: Yup.string().optional(),
  category: Yup.string().required(warningMessage),
  subcategory_id: Yup.string().required(warningMessage),
  status: Yup.string().required(warningMessage),
  division_id: Yup.string().required(warningMessage),
  files: Yup.array().optional(),
});

export type ticketValidationSchemaFormtype = Yup.InferType<typeof ticketValidationSchema>;
