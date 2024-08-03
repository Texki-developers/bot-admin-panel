import { createAsyncThunk } from "@reduxjs/toolkit"
import { ISecretCodeBody } from "../../types/components/Forms/form.type"
import { axiosInstance } from "../../app/axiosInstance"

export const createSecretCode = createAsyncThunk<
    string,
    {body: ISecretCodeBody}
>('secret-code/create', async (req, {rejectWithValue}) => {
    try{
        const result = await axiosInstance.post('secret/generate', req.body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        
        if(result.status){
            return "Form submitted successfully"
        }else{
            return "Something went wrong on uploading"
        }
    }catch(error:any){
        return rejectWithValue(error.message)
    }
})

export const getSecretCode = createAsyncThunk('secret-code/get', async (req, {rejectWithValue}) => {
    try{
        const {data:{data}} = await axiosInstance.get('secret/token')
        
        return data
    }catch(error:any){
        return rejectWithValue(error.message)
    }
})

export const deleteSecretCode = createAsyncThunk<any, any>('secret-code/delete', async(req, {rejectWithValue}) => {
    try{
        const {data} = await axiosInstance.delete(`secret/token/${req?.id}`)
        
        return data?.message
    }catch(error:any){
        return rejectWithValue(error.message)
    }
})

