import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-3 h-screen">
        <aside>
          <div className="flex flex-col gap-y-9 fixed w-full h-screen">
            <Skeleton className="max-w-sm w-full h-1/3 rounded-lg" />
            <Skeleton className="max-w-sm w-full h-unit-96 rounded-lg" />
          </div>
        </aside>
        <main className="flex flex-col gap-y-9 col-span-2">
          {[...Array(4)].map((_, idx) => (
            <Skeleton key={idx} className="h-unit-7xl rounded-lg" />
          ))}
        </main>
      </div>
    </>
  );
}
