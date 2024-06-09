import { useRecoilState, useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balance"

export const useBalance = (id: number ) => {
 
 
    const [balance, setBalance] = useRecoilState(balanceAtom(id));
    return {balance,setBalance};
}