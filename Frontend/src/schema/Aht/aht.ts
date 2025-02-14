import * as Yup from "yup";

export const aht = Yup.object().shape({
  title: Yup.string().optional(),
  priority: Yup.string().optional(),
  start_date: Yup.string().optional(),
  end_date: Yup.string().optional(),
});

export type ahtFormtype = Yup.InferType<typeof aht>;
