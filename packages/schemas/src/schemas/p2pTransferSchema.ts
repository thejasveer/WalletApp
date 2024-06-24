import {z} from 'zod'

export const  p2pTransferSchema = z.object({
    number:z.string(),
    amount:z.number()

})

