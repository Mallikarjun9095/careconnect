/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie'

import { jwtDecode } from "jwt-decode";
import { adminCookie } from '../apiRequest/config';





export const protectedRouter = () => {

    let cookie:string | undefined  = ""
    let role:string | undefined = ""

    if (Cookies.get(adminCookie)) {

        cookie = Cookies.get(adminCookie)
        role = "admin"
    }
  

    if (cookie) {
        const decodedToken: any = jwtDecode(cookie);
        const currentTime = Date.now() / 1000;
  
        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          // Token has expired, clear user data
          
          if (role == "admin") {
              Cookies.remove(adminCookie)
          }
        
          return false
          
         
        } else {
            console.log(role);
            return role

            
            
        }
      }


}