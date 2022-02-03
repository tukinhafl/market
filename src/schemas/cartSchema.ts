import * as yup from 'yup'

export const cartSchema = yup.object().shape({
  name: yup.string().required("Name obrigatory").lowercase()
})
