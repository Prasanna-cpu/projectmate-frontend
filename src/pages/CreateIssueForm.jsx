import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch} from "react-redux";
import {createIssue} from "@/redux/Issue/Action.js";
import {useParams} from "react-router-dom";

const CreateIssueForm = ({status}) => {


    const {id}=useParams()

    const dispatch=useDispatch()

    const form=useForm({
        defaultValues:{
            issueName:"",
            description:""
        }
    })
    const onSubmit=(data)=>{
        data.projectId=id
        dispatch(createIssue({
            title:data.issueName,
            description:data.description,
            status,
            projectId:id
        }))
        console.log(data)
    }




    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-5"}>
                    <FormField
                        control={form.control}
                        name="issueName"
                        rules={{ required: "Project name is required" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5 mt-1"
                                        placeholder="Name of issue"
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
                        name="description"
                        rules={{ required: "Project name is required" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5 mt-1"
                                        placeholder="Issue Description"
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
                    <DialogClose>
                        <Button type="submit" className="w-full py-5 mt-5">
                            Create Issue
                        </Button>
                    </DialogClose>
                </form>

            </Form>

        </div>
    );
};

export default CreateIssueForm;
