import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
// import {tags} from "@/pages/ProjectList.jsx";
// import {Cross1Icon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {useDispatch} from "react-redux";
import {inviteToProjectById} from "@/redux/Project/Action.js";
import {useParams} from "react-router-dom";

const InviteUserForm = () => {

    const dispatch=useDispatch()
    const {id}=useParams()
    const form=useForm({
        defaultValues:{
            email:""
        }
    })

    const onSubmit = (data) => {
        dispatch(inviteToProjectById({
            email:data.email,
            projectId:id
        }))
        console.log(data);
    };

    return(
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                >
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: "Project name is required" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Enter email of invitee"
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

                    {/* Description Field */}


                    {/* Submit Button */}
                    <DialogClose>
                        <Button type="submit" className="w-full py-5 mt-5">
                            Invite User
                        </Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};

export default InviteUserForm;
