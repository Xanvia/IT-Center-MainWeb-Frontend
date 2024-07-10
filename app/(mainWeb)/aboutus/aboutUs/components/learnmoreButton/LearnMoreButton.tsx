"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";

const LearnMoreContent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-5">
      {!isExpanded ? (
        <Button className="bg-yellow-400" onClick={handleToggle}>
          Learn More
        </Button>
      ) : (
        <>
          <p style={{ paddingTop: "1rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            nec felis libero. Sed viverra lorem sit amet nisi dictum, ac
            vestibulum arcu egestas. Integer eget eros tincidunt, feugiat turpis
            non, varius massa. Nullam at quam vitae erat volutpat auctor.
          </p>
          <Button color="primary" onClick={handleToggle}>
            Show Less
          </Button>
        </>
      )}
    </div>
  );
};

export default LearnMoreContent;
