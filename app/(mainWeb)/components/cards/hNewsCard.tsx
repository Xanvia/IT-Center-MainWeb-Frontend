import { Card, CardHeader, Image } from "@nextui-org/react";
import { News } from "../../news/page";
import { FC } from "react";

interface HNewsCardProps {
  news?: News;
}

const HNewsCard: FC<HNewsCardProps> = ({ news }) => {
  return (
    <Card className="h-60 w-80 relative">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        {news ? (
          <>
            <p className="text-tiny text-white/60 uppercase font-bold">
              {news.date}
            </p>
            <h4 className="text-white font-medium text-large">{news.title}</h4>
          </>
        ) : (
          <>
            <p className="text-tiny text-white/60 uppercase font-bold">
              Plant a tree
            </p>
            <h4 className="text-white font-medium text-large">
              Contribute to the planet
            </h4>
          </>
        )}
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src={
          news?.images?.[0]?.path ||
          "https://nextui.org/images/card-example-3.jpeg"
        }
      />
    </Card>
  );
};

export default HNewsCard;
