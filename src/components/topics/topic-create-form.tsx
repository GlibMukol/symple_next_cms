'use client';

import {
    Input,
    Textarea,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import FormButton from '@/components/common/form-button';

import { useFormState } from 'react-dom';


import * as actions from '@/actions';

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, { errors: {} })
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg">Create a Topic</h3>
                        <Input
                            name="name"
                            label="name"
                            labelPlacement="outside"
                            placeholder="topic name"
                            isInvalid={!!formState.errors.name}
                            errorMessage={formState.errors?.name?.join(", ")}
                        />
                        <Textarea
                            name="description"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Describe your topicx"
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(', ')}
                        />
                        {formState.errors._form && <p className='bg-red-400 p-2 border border-red-400 rounded'>{formState.errors._form.join(', ')}</p>}
                        <FormButton >Create topic</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}