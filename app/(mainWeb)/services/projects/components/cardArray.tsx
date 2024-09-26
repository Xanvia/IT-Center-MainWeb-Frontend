import Info from "../information/info";
import InfoCard from "./infoCard";

export default function cardArray() {
  return (
    <div className="flex flex-col lg:flex-col">
      {Info.map((item) => (
        <InfoCard
          key={item.id}
          id={item.id}
          title={item.Title}
          des={item.Description}
          date={item.Date}
          img={item.Image}
        />
      ))}
    </div>
  );
}
