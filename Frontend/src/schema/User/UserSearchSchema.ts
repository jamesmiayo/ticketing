import * as Yup from "yup";

export const userSearchSchema = Yup.object().shape({
  employee_id: Yup.string().optional(),
  name: Yup.string().optional(),
  role_id: Yup.string().optional(),
});

export type userSearchSchemaFormType = Yup.InferType<typeof userSearchSchema>;
