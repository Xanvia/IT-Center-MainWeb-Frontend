import {
  FaGraduationCap,
  FaLaptop,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";

export default function Statistics() {
  return (
    <div className="md:pb-10 ">
      <h2 className="md:text-5xl text-4xl font-semibold text-center md:mb-14 mb-10 text-maroon drop-shadow-md">
        Statistics{" "}
        <span className="inline-block text-yellow-600">
          <IoStatsChart />
        </span>
      </h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 text-center text-maroon">
        <div>
          <FaGraduationCap className="mx-auto mb-5 text-5xl" />
          <p className="text-4xl font-medium text-yellow-600">50+</p>
          <p className="text-gray-600">Courses</p>
        </div>
        <div>
          <FaLaptop className="mx-auto mb-5 text-5xl" />
          <p className="text-4xl font-medium text-yellow-600">20+</p>
          <p className="text-gray-600">Laboratories</p>
        </div>
        <div>
          <FaUsers className="mx-auto mb-5 text-5xl" />
          <p className="text-4xl font-medium text-yellow-600">35+</p>
          <p className="text-gray-600">Academic Staff</p>
        </div>
        <div>
          <FaUserGraduate className="mx-auto mb-5 text-5xl" />
          <p className="text-4xl font-medium text-yellow-600">200+</p>
          <p className="text-gray-600">Students</p>
        </div>
      </div>
    </div>
  );
}
