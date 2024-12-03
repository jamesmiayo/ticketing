import * as Yup from "yup";
import { warningMessage } from "../validator";

export const category = Yup.object().shape({
  category_description: Yup.string().required(warningMessage),
  category_id: Yup.string().optional(),
  b_active: Yup.string().optional(),
});

export type categoryFormtype = Yup.InferType<typeof category>;

export const subCategory = Yup.object().shape({
  subcategory_description: Yup.string().required(warningMessage),
  category_id: Yup.string().required(warningMessage),
  subcategory_id: Yup.string().optional(),
  b_active: Yup.string().optional(),
});

export type subCategoryFormtype = Yup.InferType<typeof subCategory>;
