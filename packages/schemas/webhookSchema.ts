import {z} from "zod";
export const bankWebhookSchema = z.object({
    token: z.string().min(1,{message:"Token required"}),
    userId : z.number().min(1,{message:"User id required"}),
    amount : z.number().min(1,{message:"amount id required"}),
}) 
 
export type bankWebookParam = z.infer<typeof bankWebhookSchema>
 