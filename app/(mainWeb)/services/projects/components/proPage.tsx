import CardArray from "./cardArray";

export default function ProPage() {
  return (
    <div>
      <h1 className=" from-red-700 to-gray-800 bg-clip-text text-transparent bg-gradient-to-t font-bold md:text-3xl sm:text-lg text-center gird">
        Projects
      </h1>
      <div className="flex justify-center mt-1">
        <div className="bg-yellow-600 h-1 md:w-36 rounded-md"></div>
      </div>
      <div className=" border-2 shadow-lg shadow-gray-500/50 m-8 py-10">
        <CardArray />
      </div>
    </div>
  );
}
