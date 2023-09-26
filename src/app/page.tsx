import TweetInput from "@/components/input_tweet";
import ProfileCard from "@/components/profile_card";
import TweetList from "@/components/tweetList";
import UsersCard from "@/components/users_card";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user_id = session!.user.id;
  const avatar_url = session!.user.avatar_url;

  return (
    <>
      <div className="grid grid-cols-3">
        <aside>
          <div className="flex flex-col gap-y-9 fixed w-full h-screen">
            <ProfileCard user_id={user_id} />
            <UsersCard user_id={user_id} />
          </div>
        </aside>
        <main className="flex flex-col gap-y-9 col-span-2">
          <TweetInput avatar_url={avatar_url} />
          <TweetList user_id={user_id} />
        </main>
      </div>
    </>
  );
}
          
            
            
          
            
            
