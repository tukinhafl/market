export interface IUserProps {
  name: string,
  password: string,
  email: string,
  adm: boolean
  cart: any
}

export interface ILoginProps {
  email: string,
  password: string
}

export interface IProductProps {
  name: string,
  price: number
}
