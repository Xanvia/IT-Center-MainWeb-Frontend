import InfoCard from "./infoCard";
import CardArray from "./cardArray";

export default function ProPage() {
  return (
    <div>
      <h1 className="font-sans md:text-xl sm:text-lg text-base m-10 bg-gray-100" style={{ marginRight: '32px' }}>Projects</h1>

      <div className=" border-2 shadow-lg shadow-gray-500/50 m-8 py-10">
        
        <CardArray/>
  
      </div>
        
    </div>
  );
}
