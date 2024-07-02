import { useEffect, useState } from "react";

export const Dropdown= ({children,label}:{icon?:React.ReactNode;children: React.ReactNode ;label:string})=>{

const [sd,setSd] = useState(false)

    const handleD= ()=>{
        setSd(!sd)
    }
    return<div className="relative   w-28   text-slate-500 " onMouseLeave={handleD} onMouseEnter={handleD}>
       { 
      <div  className={` flex justify-between cursor-pointer items-center gap-4   text-slate-500 ${sd?'rounded-t-md':'rounded-md'} border  px-3  py-2 text-sm   font-semibold `}>
            <div>{label}</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 ">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>

         </div>
           }
        {sd &&    <div onClick={handleD}   className=" w-27  absolute top-9 cursor-pointer    text-sm   rounded-b-md   bg-white shadow-b-md border w-full">
            {children}

         </div>
        } 


    </div>
}