import Home from "@/pages/Home.jsx";
import Navbar from "@/pages/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import ProjectDetails from "@/pages/ProjectDetails.jsx";
import IssueDetails from "@/pages/IssueDetails.jsx";
import Subscription from "@/pages/Subscription.jsx";
import Auth from "@/pages/Auth.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "@/redux/Auth/Action.js";
import {useEffect} from "react";
import {fetchProjects} from "@/redux/Project/Action.js";
import UpgradeSuccess from "@/pages/UpgradeSuccess.jsx";

const App = () => {

    const dispatch=useDispatch()

    const {auth}=useSelector(store=>store)


    console.log(auth)


    useEffect(() => {
        dispatch(getUser(localStorage.getItem("jwt")))
        dispatch(fetchProjects({}))
    }, [auth.jwt || localStorage.getItem("jwt")]);





    return (
        <div>
            {
                auth.user ? (
                    <div>
                        <Navbar/>
                        <Routes>
                            <Route path={"/"} element={<Home/>}/>
                            <Route path={"/project/:id"} element={<ProjectDetails/>}/>
                            <Route path={"/project/:projectId/issue/:issueId"} element={<IssueDetails/>}/>
                            <Route path={"/upgrade-plan"} element={<Subscription/>}/>
                            <Route path={"/upgrade-plan/success"} element={<UpgradeSuccess/>}/>
                        </Routes>
                    </div>
                ):(
                    <Auth/>
                )
            }
        </div>
    );
};

export default App;
