import Info from "../information/info";
import InfoCard from "./infoCard";


export default function cardArray() {

  return (

    <div className="flex flex-col lg:flex-col"> 
      {Info.map((item) => (
        <InfoCard key={item.id} text={item.text} id={item.id} /> 
      ))}
    </div>
  );

}
