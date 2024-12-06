import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";

import "../Login.css"
import {useDispatch} from "react-redux";
import {login} from "@/redux/Auth/Action.js";

const Login = () => {
    const dispatch=useDispatch()
    const form =useForm({
        defaultValues:{
            email:"",
            password:"",
        }
    })


    const onSubmit=(data)=>{
        dispatch(login(data))
        console.log(data)

    }


    return (
        <div className={"space-y-5"}>
            <h1 className={"text-center  text-xl"}>Sign In</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-5"}>



                    <FormField
                        control={form.control}
                        name="email"
                        rules={{required: "Email is required"}}
                        render={({field, fieldState}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter email ..."
                                    />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        rules={{required: "Password is required"}}
                        render={({field, fieldState}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter password ..."
                                    />
                                </FormControl>
                                {fieldState.error && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />
                    <Button className={"w-full bg-sky-700 mt-5 hover:bg-green-700"}>
                        Sign In
                    </Button>
                </form>

            </Form>
        </div>
    );
};

export default Login;
