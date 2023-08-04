import Button from "@/components/buttons/Button";
import { NextPageWithAttributes } from "./_app";
import Link from "next/link";

const Custom404: NextPageWithAttributes = () => {
  return (
    <div className="h-screen">
      <h1 className="text-center text-[240px] font-medium text-indigo-600">
        404
      </h1>
      <div className="-mt-12 text-center text-3xl text-slate-600">
        Oops, we can{"'"}t find the page you{"'"}re looking for
      </div>
      <div className="mt-12 text-center">
        <Link href="/">
          <Button size="lg">Back to home</Button>
        </Link>
      </div>
    </div>
  );
};

Custom404.isPublic = true;
Custom404.title = "Not Found";

export default Custom404;
