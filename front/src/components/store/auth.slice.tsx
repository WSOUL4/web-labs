import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {login,refresh} from '../../api/authService';
import {getProfile} from '../../api/profile';
import axios from "axios";
import {handleLogout} from '../../utils/localStorage';
interface AuthState{
    user: null | {id: number,name:string, email: string}
    isAuthenticated:boolean
    isLoading:boolean
    isError: boolean 
    errorMessage: string|null
}
const initialState: AuthState={
    user:null,
    isAuthenticated:false,
    isLoading:false,
    isError:false,
    errorMessage:null,
}

export const loginUser=createAsyncThunk(
    'auth/login',
    async(credentials:{email:string,password:string},thunkAPI)=>{
        
        await login(credentials.email,credentials.password);
        
            const response= getProfile();
        
        
            return response;
    }
)
const authSlice= createSlice(
    {
        name:'auth',
        initialState,
        reducers:{
            logout(state){
                //console.log('logging out')
                handleLogout();
                state.user=null;
                state.isAuthenticated=false;
                
            },
        },
        extraReducers:(builder)=>{
            builder
            .addCase(loginUser.pending,(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.errorMessage=null;
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.user=action.payload;
                state.isAuthenticated=true;
                state.errorMessage=null;
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.errorMessage=action.error.message + ' Ошибка входа';
            })
        },
    }
)
export const {logout}=authSlice.actions;
export default authSlice.reducer;