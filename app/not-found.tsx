import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex gap-y-5 items-center justify-center flex-col">
      <p className="text-white text-3xl font-semibold">
        Sorry, the page you&apos;re looking for cannot be found.
      </p>
      <p className="font-extrabold text-9xl text-green-500">404</p>
      <p className="font-bold text-3xl text-green-500">Not Found</p>
      <Link
        href="/"
        className="text-white font-semibold py-2 px-4 my-10 bg-green-500 hover:bg-green-400 rounded-full"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
