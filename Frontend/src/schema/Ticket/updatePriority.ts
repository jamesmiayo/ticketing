import * as Yup from 'yup';
import { warningMessage } from '../validator';

export const updatePrioritySchema = Yup.object().shape({
  ticket_id: Yup.string().optional(),
  priority: Yup.string().required(warningMessage),
});
