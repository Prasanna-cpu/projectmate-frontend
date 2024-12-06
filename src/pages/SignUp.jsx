import { useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {register} from "@/redux/Auth/Action.js";

const SignUp = () => {

    const dispatch=useDispatch()

    const onSubmit=(data)=>{
        dispatch(register(data))
    }

    const form =useForm({
        defaultValues:{
            email:"",
            password:"",
            fullName:""
        }
    })

    return (
        // <div className={"space-y-5"}>
        //     <h1 className={"text-center  text-xl"}>Register</h1>
        //     <Form {...form}>
        //         <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-5"}>
        //
        //             <FormField
        //                 control={form.control}
        //                 name="fullName"
        //                 rules={{ required: "Full name is required" }}
        //                 render={({ field, fieldState }) => (
        //                     <FormItem>
        //                         <FormControl>
        //                             <Input
        //                                 {...field}
        //                                 type="text"
        //                                 className="border w-full border-gray-700 py-5 px-5"
        //                                 placeholder="Enter your Full Name ..."
        //                             />
        //                         </FormControl>
        //                         {fieldState.error && (
        //                             <p className="text-red-500 text-sm mt-1">
        //                                 {fieldState.error.message}
        //                             </p>
        //                         )}
        //                     </FormItem>
        //                 )}
        //             />
        //
        //             <FormField
        //                 control={form.control}
        //                 name="email"
        //                 rules={{ required: "Email is required" }}
        //                 render={({ field, fieldState }) => (
        //                     <FormItem>
        //                         <FormControl>
        //                             <Input
        //                                 {...field}
        //                                 type="text"
        //                                 className="border w-full border-gray-700 py-5 px-5"
        //                                 placeholder="Enter email ..."
        //                             />
        //                         </FormControl>
        //                         {fieldState.error && (
        //                             <p className="text-red-500 text-sm mt-1">
        //                                 {fieldState.error.message}
        //                             </p>
        //                         )}
        //                     </FormItem>
        //                 )}
        //             />
        //
        //             <FormField
        //                 control={form.control}
        //                 name="password"
        //                 rules={{ required: "Password is required" }}
        //                 render={({ field, fieldState }) => (
        //                     <FormItem>
        //                         <FormControl>
        //                             <Input
        //                                 {...field}
        //                                 type="password"
        //                                 className="border w-full border-gray-700 py-5 px-5"
        //                                 placeholder="Enter password ..."
        //                             />
        //                         </FormControl>
        //                         {fieldState.error && (
        //                             <p className="text-red-500 text-sm mt-1">
        //                                 {fieldState.error.message}
        //                             </p>
        //                         )}
        //                     </FormItem>
        //                 )}
        //             />
        //             <Button className={"w-full bg-sky-700 mt-5 hover:bg-green-700"}>
        //                 Sign Up
        //             </Button>
        //         </form>
        //
        //     </Form>
        // </div>


        <div className="space-y-5">
            <h1 className="text-center text-xl">Register</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter your full name"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="enter your email"
                                    />
                                </FormControl>

                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password" // Added password field
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password" // Added type attribute for password input
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter your password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-slate-400 py-5">
                        REGISTER
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignUp;
