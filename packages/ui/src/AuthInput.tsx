"use client"

export const AuthInput = ({
    placeholder,
    onChange,
    label,
    val,type='text',keyStr
}: {
    placeholder: string;
    onChange: (value: any) => void;
    label: string;
    val?:number
    type?:string,
    keyStr:string
}) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input type={type} onChange={(e) => onChange((prev:any)=>({...prev, [keyStr]:e.target.value}))}   value={val}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
    </div>
}