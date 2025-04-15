import { Navigate, Outlet } from "react-router"
import {  useSelectorMy } from './store/store'; 
export const ProtectedRoute=()=>{
    const {isAuthenticated}=useSelectorMy((state)=>state.auth)
    if(!isAuthenticated){
        return <Navigate to ='/auth/login' replace />
    }
    return <Outlet />
}