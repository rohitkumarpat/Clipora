import { currentUser } from "@clerk/nextjs/server";
import { prismaclient } from "./db";



export  async function check_user() {
      const user = await currentUser()
       
      if(!user) {
         return null;
      }   

      let existuser=await prismaclient.user.findUnique({
        where:{
            clerkId:user.id    
        }
      })

     if(!existuser) {
            existuser=await prismaclient.user.create({
            data:{
                clerkId:user.id,
                name: user.firstName || '',
                email: user.emailAddresses[0].emailAddress || '',
            }
           })
     }
     
     return existuser;
}