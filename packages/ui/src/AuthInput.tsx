"use client"

export const AuthInput = ({
    placeholder,
    onChange,
    label,
    val,type='text',keyStr,
    grid=false,
    disabled=false
}: {
    placeholder: string;
    onChange: (value: any) => void;
    label: string;
    val?:string | null |number| undefined
    type?:string,
    keyStr:string,
    grid?:boolean,
    disabled?:boolean
}) => {
    return <div className={`pt-2 ${grid &&'items-center grid grid-cols-3'} `}>
        <label className="col-span-1 block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input disabled={disabled} type={type} onChange={(e) => onChange((prev:any)=>({...prev, [keyStr]:e.target.value}))}   value={val||""}  className={`bg-gray-50 ${disabled&& 'cursor-not-allowed '} border col-span-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 disabled:bg-slate-200 focus:border-blue-500 block w-full p-2`} placeholder={placeholder} />
    </div>
}