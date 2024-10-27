import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"

const PrivatrRoute = () => {
        const{currentUser}=useSelector((state) =>state.user)
  return currentUser ? <Outlet /> : <Navigate to ='signIn' />
};

export default PrivatrRoute
