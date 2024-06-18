import {z} from "zod";
export const bankWebhookSchema = z.object({
    token: z.string().min(1,{message:"Token required"}),
    status : z.string().min(1,{message:"Status required"}),
   
}) 
 
export type bankWebookParam = z.infer<typeof bankWebhookSchema>
 