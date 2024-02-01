import { Session } from "inspector"
import { NextPage } from "next"
import { useEffect } from "react"

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

    const addUserHandler = async (user: UserProps, jwt: {sub: string} ) =>{
        try {
            const response = await fetch('http://localhost:5000/api/Users',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                picture: user.image,
                sub: jwt.sub,
            })})
            
            if(response.ok){
                console.log("User saved in database, please update role")
            }
        } catch (error) {
            console.error('Error during fetch', error);
        }
    }

    useEffect(()=>{
        addUserHandler(user,jwt)
    },[])

    return (
        <div>
            <p className="text-gray-800">
            <strong>Now you are a user! 🎊 </strong>
            your role will be assigned soon {user.name}</p>
        </div>
    )
}
export default SuccessLogin