import * as yup from 'yup'

export const userSchema = yup.object().shape({
  name: yup.string().required("Name obrigatory"),
  email: yup.string().email("Wrong email type").required("Email obrigatory"),
  password: yup.string().min(4).required("Password obrigatory"),
  adm: yup.bool()
})
