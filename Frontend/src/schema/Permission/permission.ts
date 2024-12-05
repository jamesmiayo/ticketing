import * as Yup from 'yup'
import { warningMessage } from '../validator'

export const permission = Yup.object().shape({
  name: Yup.string().required(warningMessage),
})

export type permissionFormtype = Yup.InferType<typeof permission>
