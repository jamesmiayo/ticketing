import * as Yup from "yup";

export const createTicketSatisfactory = Yup.object().shape({
  satisfactory_1: Yup.string().optional(),
  satisfactory_2: Yup.string().optional(),
  satisfactory_3: Yup.string().optional(),
  satisfactory_4: Yup.string().optional(),
  satisfactory_5: Yup.string().optional(),
  overrall_satsifaction: Yup.string().optional(),
});
export type createTicketSatisfactorytype = Yup.InferType<
  typeof createTicketSatisfactory
>;
