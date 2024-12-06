import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {createComment} from "@/redux/Comment/Action.js";
import {useDispatch} from "react-redux";

const CreateCommentForm = ({issueId}) => {

    const dispatch=useDispatch()



    const form=useForm({
        defaultValues:{
            content:""
        }
    })

    const onSubmit=(data)=>{
        dispatch(createComment({
            content:data.content,
            issueId
        }))
    }


    return (
        <div>
            <Form {...form}>


                <form className={"mt-4 flex gap-2"} onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="content"
                        rules={{ required: "Add content" }}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        placeholder="Project description..."
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


                    <Button type="submit">
                        Add comment
                    </Button>

                </form>




            </Form>
        </div>
    );
};


export default CreateCommentForm