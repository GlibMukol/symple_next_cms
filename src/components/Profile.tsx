'use client';
import { useSession } from 'next-auth/react';

const Profile = () => {
    const session = useSession();
    return (
        <div>{
            session.data?.user ? <p>User</p> : <p>Anonimus</p>
        }</div>
    )
}

export default Profile