// use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL ="https://589a-2402-a00-404-23fb-2dca-669-49dd-37c5.ngrok-free.app/"
  process.env.NODE_ENV == 'production' ? 'https://589a-2402-a00-404-23fb-2dca-669-49dd-37c5.ngrok-free.app/':'http://localhost:3000'
