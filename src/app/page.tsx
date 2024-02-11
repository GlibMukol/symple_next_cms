import { Button } from '@nextui-org/react'
import * as actions from '@/actions';
import { auth } from "@/auth";
import Profile from '@/components/Profile'


export default async function Home() {

  const userSession = await auth();
  return (
    <div className="">
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>

      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>

      </form>

      {userSession ? <p>Sign In</p> : <p>Sign Out</p>}
      <Profile />
    </div>
  );
}

