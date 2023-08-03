import Image from "next/image";

const SplashScreen = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div className="space-y-4">
        <Image
          src="/next.svg"
          alt="Next Power Starter"
          height={240}
          width={240}
        />
        <div className="mt-2 text-center text-2xl font-medium text-indigo-600">
          Next Power Starter
        </div>
      </div>
      <div className="absolute bottom-4 text-center">
        <p className="text-sm font-semibold text-gray-600">by</p>
        <p className="bg-gradient-to-br from-indigo-200 via-indigo-400 via-20% to-indigo-600 to-70% bg-clip-text text-lg font-semibold text-transparent">
          Shen Yien
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
