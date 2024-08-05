import React from "react";

interface Props {
  number: number;
  image?: string;
}

const Tile = ({ number, image }: Props) => {
  if (number % 2 === 0) {
    return (
      <div className="bg-gray-300">
        <img src={image} alt="" className="h-10 w-10" />
      </div>
    );
  } else {
    return (
      <div className="bg-gray-500">
        <img src={image} alt="" className="h-10 w-10" />
      </div>
    );
  }
};

export default Tile;
