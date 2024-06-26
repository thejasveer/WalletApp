export const Pill = ({title,selected,onclick,fill="bg-white"}:{fill?:string;title:string;selected:boolean;onclick:any})=>{

    return   <div className={selected?`px-2 py-1  ${fill} rounded-full  font-semibold text-slate-800`:"text-slate-400 cursor-pointer"} onClick={onclick}>{title}</div>

}