import { title } from 'process';
'use server';

import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {redirect} from 'next/navigation';
import {z} from 'zod';
import {db} from '@/db';
import paths from '@/paths';
import {auth} from '@/auth'

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(1)
});

interface ICreatePostState {
    errors: {
        title?:  string[],
        content?: string[],
        _form?: string[]
    }
}

export async function createPost(slug: string, formState: ICreatePostState, formData: FormData): Promise<ICreatePostState>{
    const results = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });
    const session = await auth();

    if(!results.success) {
        return {
            errors: results.error.flatten().fieldErrors
        }
    }

    if(!(session && session.user && session.user.name)){
        return {
            errors: {
                _form: ['Not authorize']
            }
        }
    }
    const topic = await db.topic.findFirst({
        where: {slug}
    });

    if(!topic) {
        return {
            errors: {
                _form: ['Can not find topic']
            }
        }
    }
    
    let post: Post;
    try {
      
        post = await db.post.create({
            data: {
                title: results.data.title,
                content: results.data.content,
                userId: "1",
                topicId: topic.id,
            }
        })


    } catch (err: unknown) {
        if(err instanceof Error) {
            console.log('err', err)
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Unexpected error']
                }
            }
        }
    }

   revalidatePath(paths.topicPath(slug)) 
   redirect(paths.postShowPath(slug, post.id))
}
