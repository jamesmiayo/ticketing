import * as Yup from "yup";

export const csatType = Yup.object().shape({
  branch_id: Yup.string().nullable(),
  division_id: Yup.string().nullable(),
  department_id: Yup.string().nullable(),
  section_id: Yup.string().nullable(),
  user_id: Yup.string().nullable(),
  start_date: Yup.string().nullable(),
  end_date: Yup.string().nullable(),
});

export type csatFormtype = Yup.InferType<typeof csatType>;
