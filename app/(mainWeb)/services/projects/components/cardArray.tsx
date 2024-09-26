import { useEffect, useState } from "react";
import InfoCard from "./infoCard";

interface ProjectData {
  title: string;
  description: string;
  date?: string;
  images?: string[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export default function cardArray() {
  // data state
  const [data, setData] = useState<[ProjectData] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-col">
      {data &&
        data.map((item) => (
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
