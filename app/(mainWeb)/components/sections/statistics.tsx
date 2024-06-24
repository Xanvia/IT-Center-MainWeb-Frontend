import {
  FaGraduationCap,
  FaLaptop,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa6";

export default function Statistics() {
  return (
    <div className="my-5">
      <h2 className="text-3xl font-semibold text-center mb-14">Statistics</h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <FaGraduationCap className="mx-auto mb-2 text-4xl" />
          <p className="text-xl font-medium">50+</p>
          <p className="text-gray-600">Courses</p>
        </div>
        <div>
          <FaLaptop className="mx-auto mb-2 text-4xl" />
          <p className="text-xl font-medium">20+</p>
          <p className="text-gray-600">Laboratories</p>
        </div>
        <div>
          <FaUsers className="mx-auto mb-2 text-4xl" />
          <p className="text-xl font-medium">35+</p>
          <p className="text-gray-600">Academic Staff</p>
        </div>
        <div>
          <FaUserGraduate className="mx-auto mb-2 text-4xl" />
          <p className="text-xl font-medium">200+</p>
          <p className="text-gray-600">Students</p>
        </div>
      </div>
    </div>
  );
}
