import React from "react";
import Image from "next/image";

function MediumCard({ img, title }) {
  return (
    <div>
      <div className="  cursor-pointer hover:gray-100 hover:scale-105 transition transform duration-200 ease-out">
        <div className="relative h-80 w-80 ">
          <Image
            className="rounded-xl"
            src={img}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h2 className="text-gray-500">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export default MediumCard;
