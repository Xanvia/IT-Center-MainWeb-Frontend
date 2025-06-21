import { STATISTICS } from "@/CONSTANT_DATA/D.Stats";
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
          <p className="text-4xl font-medium text-yellow-600">
            {STATISTICS.courses.count}
          </p>
          <p className="text-gray-600">{STATISTICS.courses.label}</p>
        </div>
        <div>
          <FaLaptop className="mx-auto mb-5 text-5xl" />
          <p className="text-4xl font-medium text-yellow-600">
            {STATISTICS.laboratories.count}
          </p>
          <p className="text-gray-600">{STATISTICS.laboratories.label}</p>
        </div>
        <div>
          <FaUsers className="mx-auto mb-5 text-5xl" />
          <p className="text-4xl font-medium text-yellow-600">
            {STATISTICS.academicStaff.count}
          </p>
          <p className="text-gray-600">{STATISTICS.academicStaff.label}</p>
        </div>
        <div>
          <FaUserGraduate className="mx-auto mb-5 text-5xl" />
          <p className="text-4xl font-medium text-yellow-600">
            {STATISTICS.students.count}
          </p>
          <p className="text-gray-600">{STATISTICS.students.label}</p>
        </div>
      </div>
    </div>
  );
}
