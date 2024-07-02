import { memo } from "react"

const Errors = memo(({errors}:any)=>{
     return <div className="text-red-500 ">
     
       {errors.length > 0 && (
       
                <div>
                     
                       <b>Errors</b>
                    {errors.map((err:any, i:number) => (
                        <Error key={i*Math.random()} err={err} />
                    ))}
                </div>
            )}
     </div>
     
    
})

const Error = ({err}:any) => {
    
return  <p className="list-item mb-1" >  {err.message}</p>
 

}
export default Errors;