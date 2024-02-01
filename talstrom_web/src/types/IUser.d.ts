interface User {
    id: number;
    name: string;
    email: string;
    picture: string;
    sub: string;
    role: string;
}

type UserProps = {
  email: string
  image: string
  name : string
}
interface LoginProps {
  user: UserProps
  jwt: {
      sub: string
  }
}