import { atom } from "recoil";

export interface UserInterface{
    email:string|null;
    name:string|null;
    id:number|null;
    number:number|null;
    netbankingLoginToken:string|null;
    
}
export const userAtom= atom<UserInterface|null>({
    key:"user",
    default:null
})