export const Pill = ({title,selected,onclick,fill="bg-white"}:{fill?:string;title:string;selected:boolean;onclick:any})=>{

    return   <div className={selected?`px-2 py-1 text-slate-800  ${fill||'text-slate-800 '} rounded-full  font-semibold `:"text-slate-400 cursor-pointer"} onClick={onclick}>{title}</div>

}