import { Carousel } from "./components/carousal";
import { MainLink } from "./components/mainLink";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      {/* header body */}
      <div className="bg-maroon h-96">
        <div className="ml-20 mt-20">
          <div>
            <h1 className="text-5xl text-white font-vietnam">
              Welcome to Our IT Center
            </h1>
            <h3 className="mt-3 ml-1 text-gray-300 font-sans text-xl">
              Empowering your digital journey
            </h3>
          </div>
          <div className="mt-10 space-x-5">
            <button className="bg-yellow-400 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 border border-yellow-300 rounded-lg">
              Dashboard
            </button>
            <button className="bg-transparent hover:bg-yellow-600 text-yellow-300 font-semibold hover:text-maroon py-2 px-4 border border-yellow-300 hover:border-transparent rounded-lg">
              Course Registration
            </button>
          </div>
        </div>
      </div>

      {/* Main Quick Links */}
      <div className="flex justify-evenly items-center my-7">
        <MainLink imgSrc="/animation/courses.jpg" heading="Courses" />
        <MainLink imgSrc="/animation/courses.jpg" heading="Reservations" />
        <MainLink
          imgSrc="/animation/consultation.jpg"
          heading="Consultations"
        />
        <MainLink imgSrc="/animation/consultation.jpg" heading="M O O C" />
      </div>

      {/* Vision and Photo Slide */}

      <div className="bg-maroon py-10">
        <div className="text-white text-center">
          <h1 className="text-3xl ">
            Innovative IT Solutions for Your Business
          </h1>
          <p className="m-10 text-lg mx-20 text-slate-400">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris."
          </p>
        </div>
        <div className="m-40">
          <Carousel />
        </div>
      </div>
    </main>
  );
}
