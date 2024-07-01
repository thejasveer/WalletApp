export const DropdownItem= ({label,action}:{label:string,action:any})=>{


    return <div onClick={action} className="hover:bg-[#6a51a6]   hover:text-gray-100 p-2 ">
        {label}
    </div>

}