"use client"
import {  useSetRecoilState, userAtom } from "@repo/store";
import { useEffect, useState } from "react";
 
import { useMessage } from "../hooks/useMessage";
import { PageTitle } from "./PageTitle";
import { AuthInput } from "@repo/ui/AuthInput";
import { Button } from "@repo/ui/button";
import Errors from "./Errors";
import axios from "axios";
import { Card } from "@repo/ui/card";
 

export const Dasboard=({user}:any)=>{

    const setUser = useSetRecoilState(userAtom)

    const [input,setInput] = useState({
        name:user.name,
        email:user.email,
        password:null,
        number:user.number
    });
    const [loading,setLoading]= useState(false)

    const {bark} = useMessage();
    
  async  function handleSubmit(){
            setLoading(true)
            const res:any =await  axios.post('/api/user/info',{
               name: input.name,

               number:input.number,
               password:input.password
            })
            

            if(!res.data.success){
                setErrors(res.data.error)
                setLoading(false)
                setInput(prev=>({...prev,password:null}))

            }else{
           
              setErrors([])
              setLoading(false)
              // setUser(prev=>({...prev,name:"Ss"}))
              bark({message: "Info updated successfully",success:true});
            }
    }   
    useEffect(()=>{
      console.log(input)
      },[input])
    const [errors,setErrors] = useState([])
    
    return user && <div>
           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <PageTitle title={"Hi, "+ user?.name}/ >
              <Card title={"Account Info"}>
              <div className="space-y-4 md:space-y-6"  >
                <div>
                <AuthInput val={input.name}  grid={true} keyStr={"name"} onChange={setInput} 
                label={"Name"}      placeholder={"Enter your name"}/>
                </div>
                  <div>
                      <AuthInput val={input.number}  disabled={true} grid={true} keyStr={"number"}  onChange={setInput} label={"Number"} placeholder={"Enter your phone number"}/>
                   
                  </div>
                  <div>
                  <AuthInput val={input.email}  disabled={true} grid={true} keyStr={"email"}type={"email"} onChange={setInput}  label={"Email"} placeholder={"Enter your Email"}/>
                  </div>
                  <div>
                  <AuthInput grid={true} keyStr={"password"}type={"password"} onChange={setInput} val={input.password}   label={"Password"} placeholder={"**********"}/>
                  </div>
                 
                 
                   
                      <div className="flex w-full justify-center">
                         <Button loading={loading} onClick={handleSubmit}>Save</Button>
               
                      </div>
           
              
                
              </div>

              <Errors errors={errors}/>
              </Card> 
          </div>
    </div>

}
