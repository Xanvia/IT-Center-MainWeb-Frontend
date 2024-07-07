import InfoCard from "./infoCard";
import CardArray from "./cardArray";

export default function ProPage() {
  return (
    <div>
      <h1 className="text-5xl m-10 ">Projects</h1>

      <div className=" border-2 shadow-lg shadow-gray-500/50 m-8 py-10">
        
        <CardArray/>
  
      </div>
        
    </div>
  );
}