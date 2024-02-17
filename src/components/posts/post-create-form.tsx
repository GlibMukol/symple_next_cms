"use client";

import { useFormState } from "react-dom";
import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@nextui-org/react';
import FormButton from "@/components/common/form-button";

import * as actions from '@/actions';

interface IPostCreateProps {
    slug: string
}

export default function PostCreateForm({ slug }: IPostCreateProps) {
    const [formState, action] = useFormState(actions.createPost.bind(null, slug), { errors: {} })
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create Post</h3>
                        <Input
                            isInvalid={!!formState.errors.title}
                            errorMessage={formState.errors.title?.join(', ')}
                            name="title"
                            label="Title"
                            labelPlacement="outside"
                            placeholder="Title"
                        />

                        <Textarea
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(', ')}
                            name="content"
                            label="Content"
                            labelPlacement="outside"
                            placeholder="Content"
                        />
                        {formState.errors._form && <p className="border border-red-400 bg-red-400 rounded p-2"> {formState.errors._form}</p>}
                        <FormButton>Create Post</FormButton>
                    </div>
                </form>
            </PopoverContent>

        </Popover>
    );
}