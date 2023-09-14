"use client";
import TweetInput from "@/components/input_tweet";
import ProfileCard from "@/components/profile_card";
import TweetCard from "@/components/tweet_card";
import UsersCard from "@/components/users_card";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-[1fr_2fr]">
        <aside className="">
          <div className="flex flex-col gap-y-9 fixed">
            <ProfileCard />
            <UsersCard />
          </div>
        </aside>
        <main className="flex flex-col gap-y-9">
          <TweetInput />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
        </main>
      </div>
    </>
  );
}
