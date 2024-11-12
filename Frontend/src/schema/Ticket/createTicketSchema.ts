import * as Yup from 'yup';

export const ticketValidationSchema = Yup.object().shape({
  title: Yup.string().optional(),
  concern: Yup.string().optional(),
  category: Yup.string().optional(),
  sub_category: Yup.string().optional(),
  status: Yup.string().optional(),
});
