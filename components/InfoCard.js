import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";

function InfoCard({ img, location, title, description, star, price, total }) {
  return (
    <div
      className="flex  flex-wrap py-7 px-2 pr-4 border-b cursor-pointer first:border-t 
         shadow-lg rounded-2xl mb-3 hover:scale-105 hover:mx-10 hover:gray-100 
         transition transform duration-200 ease-out"
    >
      <div className="relative h-[300px] w-[300px] mx-auto md:h-52 md:w-80 flex-shrink-0 mb-2 md:mb-0">
        {/* relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 */}
        <Image
          className="rounded-2xl"
          src={img}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex flex-col flex-grow pl-5 ">
        <div className="flex justify-between">
          <p>{location}</p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">{title}</h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow pr-3">
          {description}
        </p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>
          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
