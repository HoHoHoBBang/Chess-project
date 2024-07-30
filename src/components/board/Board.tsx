import React from "react";

const Board = () => {
  const vertical: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontal: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const tile = [];

  for (let i = vertical.length - 1; i >= 0; i--) {
    for (let j = 0; j < horizontal.length; j++) {
      tile.push(horizontal[j] + vertical[i]);
    }
  }

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="flex">
        <div className="mb-8 grid grid-rows-8">
          {vertical.reverse().map((data) => (
            <p className="flex w-8 items-center justify-center">{data}</p>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="h-[600px] w-[600px]">
            <div className="grid h-full w-full grid-cols-8 grid-rows-8">
              {tile.map((tile, index) => (
                <div
                  className={`${(Math.floor(index / 8) + index) % 2 === 0 ? "bg-gray-300" : "bg-gray-500"} flex items-center justify-center`}
                  key={tile}
                >
                  {tile}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-8">
            {horizontal.map((data) => (
              <p className="flex h-8 items-center justify-center" key={data}>
                {data}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
