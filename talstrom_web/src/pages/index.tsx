import Header from "@/ui/header";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  
  return (
    <>
    <Header/>
    
    </>
     
  );
}
