import { Dropdown } from "./Dropdown"
import { DropdownItem } from "./DropdownItem"

export const Filter=({label,items,action}:{label:string;items:any;action:any} )=>{

 

    return <div>
        <Dropdown label={label} >
            {
                items.map((item:any,i:number)=>{
                  return  <DropdownItem key={label+'_'+i} label={item.name} action={item.action}/>
                })
            }
        </Dropdown>

    </div>
} 