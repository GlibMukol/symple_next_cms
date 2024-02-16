"use server";
import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from 'next/cache'

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: "Topic must be in lower case" }),
  description: z.string().min(10),
});

interface ICreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: ICreateTopicFormState,
  formData: FormData
): Promise<ICreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  const session = await auth();

  if (!(session && session.user)) {
    return {
      errors: {
        _form: ["user not auth, please sign in"],
      },
    };
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
        return {
            errors: {
                _form : ['Something wring']
            }
        }
    }
  }
  revalidatePath(paths.homePath());
  redirect(paths.topicPath(topic.slug));
}
