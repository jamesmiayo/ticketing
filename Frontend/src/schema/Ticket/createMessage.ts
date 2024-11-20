import * as Yup from 'yup';

export const messageValidationSchema = Yup.object().shape({
  ticket_id: Yup.string().optional(),
  message: Yup.string().optional(),
});
