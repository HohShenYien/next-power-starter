import Image from "next/image";
import { NextPageWithAttributes } from "./_app";
import NiceLink from "@/components/links/NiceLink";
import useSession from "@/features/Auth/hooks/useSession";

const Home: NextPageWithAttributes = () => {
  const session = useSession();
  return (
    <div className="flex min-h-screen w-full flex-col items-stretch">
      <div className="mt-16 self-start">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/pages/index.tsx</code>
        </p>
      </div>
      <div className="">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-6 py-16">
            <div className="space-y-2">
              <p className="text-slate-500">Hassle-free Starter Template</p>
              <div className="space-y-1">
                <h2 className="text-6xl font-bold text-indigo-500">
                  Next.js Power Starter
                </h2>
                <p className="text-4xl font-semibold">
                  Configuration made simple
                </p>
              </div>
              <p className="text-slate-600">
                The template which balances flexibility and simplicity
              </p>
            </div>
            <div>
              <div>You are {session.status}</div>
              <NiceLink href="/protected">Protected Page</NiceLink>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="before:bg-gradient-radial after:bg-gradient-conic relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-3/4 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/4 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
              <Image
                className="relative drop-shadow-[0_0_0.3rem_#ffffff70]"
                src="/next.svg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.isPublic = true;
export default Home;
