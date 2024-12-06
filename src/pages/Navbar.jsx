import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import CreateProjectForm from "@/pages/CreateProjectForm.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {PersonIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "@/redux/Auth/Action.js";

const Navbar = () => {
    const navigate=useNavigate()
    const {auth}=useSelector(store=>store)
    const dispatch=useDispatch()

    function handleLogout(){
        dispatch(logout())
    }


    return (
        <div className={"border-b py-4 px-5 flex items-center justify-between"}>
            <div className={"flex items-center gap-3"}>
                <p className={"cursor-pointer"} onClick={()=>navigate("/")}>
                    PROJECT MATE
                </p>
                <Dialog>
                    <DialogTrigger>
                        <Button variant={"ghost"}>
                            New Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Create New Project</DialogHeader>
                        <CreateProjectForm/>
                    </DialogContent>
                </Dialog>
                <Button variant={"ghost"} onClick={()=>navigate("/upgrade-plan")}>
                    Upgrade
                </Button>
            </div>
            <div className={"flex gap-3 items-center"}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant={"outline"} size={"icon"} className={"rounded-full border-2 border-gray-500"} >
                            <PersonIcon/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p>{auth?.user?.data?.fullName}</p>
            </div>
        </div>
    );
};

export default Navbar;
