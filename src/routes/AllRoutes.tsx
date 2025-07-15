import { Route, Routes } from "react-router";
import { HomePage,AccountPage} from "../pages";
//import { ProtuctedRoutes } from "./ProtuctedRoutes";

export const AllRouters = () => {

    return(
            <>
            <Routes>
                <Route path="/" element = {<HomePage/>}/>
                <Route path="/home" element = {<HomePage/>}/>
                <Route path="/account" element = {<AccountPage/>}/>
            </Routes>
            </>

    )

}