import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import { db } from '@/db';
import paths from '@/paths';

export default async function TopicList() {
    const topics = await db.topic.findMany();

    const renderedTopicList = topics.map((topic) => (<div key={topic.id}>
        <Link href={paths.topicPath(topic.slug)}>
            <Chip color='warning' variant='shadow'>
                #{topic.slug.toUpperCase()}
            </Chip>
        </Link>
    </div>))

    return <div className='flex flex-row flex-wrap mt-4 gap-2'>{renderedTopicList}</div>
}
