// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL ="https://i-choose-higher.vercel.app/"
  process.env.NODE_ENV == 'production' ? 'https://i-choose-higher.vercel.app/':'http://localhost:3000'
