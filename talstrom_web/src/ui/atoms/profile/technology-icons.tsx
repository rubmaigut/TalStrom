import React, { FC, useState } from 'react';
import techIcons from "@/lib/reactIconComponents/reactIcons";
import * as ReactIcons from "@/lib/reactIconComponents";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

interface TechnologyProps {
    technologies: string
}

const TechnologyIcons: FC<TechnologyProps> = ({ technologies }) => {
  const techArray = technologies.split(',');
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const getIconForTechnology = (technology: string, scaling: number) => {
    const i = techIcons.findIndex((x) => x.language === technology);
    const iconComponent = (ReactIcons as any)[`${techIcons[i]?.reactIcon}`];

    if (iconComponent && typeof iconComponent === "function") {
      return (
        <div className="flex flex-col items-center">
          {React.createElement(iconComponent as React.ElementType, {
            size: scaling,
            color: techIcons[i].color,
          })}
          <span className="text-xs mt-1">{technology}</span>
        </div>
      );
    }

    return <span>Icon not found for {technology}</span>;
  };

  return (
    <div>
      <div className="flex flex-wrap items-center mt-2">
        {techArray.length ? (
          techArray.slice(0, showAll ? techArray.length : 7).map((tech, index) => (
            <div key={index} className="m-1 text-center">
              {getIconForTechnology(tech, 24)}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No technologies set</p>
        )}
      </div>
      {techArray.length > 6 && (
        <div className="flex items-center justify-center mt-2 cursor-pointer" onClick={handleShowMore}>
          <span className="text-sm text-teal-500">{showAll ? 'Show Less' : 'Show More'}</span>
          {showAll ? (
            <ArrowUpIcon className="w-4 h-4 text-teal-500 ml-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-teal-500 ml-1" />
          )}
        </div>
      )}
    </div>
  );
};

export default TechnologyIcons;
