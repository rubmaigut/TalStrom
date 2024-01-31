import { Session } from "inspector"
import { NextPage } from "next"

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

const SuccessLogin: NextPage<LoginProps> =({user, jwt})=>{

    return (
        <div>
            <h2>Congrats, your role will be assigned soon</h2>
            <span>{user.name}</span>
        </div>
    )
}
export default SuccessLogin