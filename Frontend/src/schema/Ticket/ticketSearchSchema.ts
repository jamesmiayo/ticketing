import * as Yup from "yup";

export const filterTicket = Yup.object().shape({
  title: Yup.string().optional(),
  concern: Yup.string().optional(),
});

export type filterFormtype = Yup.InferType<typeof filterTicket>;
