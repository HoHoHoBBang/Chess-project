import Tile from "../Tile/Tile";

const Board = () => {
  const vertical: string[] = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const horizontal: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const board = [];

  for (let i = 0; i < vertical.length; i++) {
    for (let j = 0; j < horizontal.length; j++) {
      const number = i + j;
      const name = vertical[i] + horizontal[j];

      board.push(<Tile key={name} number={number} x={j} y={i} />);
    }
  }

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="relative h-[600px] w-[600px]">
        <div className="absolute -left-10 flex h-full w-10 flex-col items-center justify-around">
          {vertical.map((v) => (
            <span key={v}>{v}</span>
          ))}
        </div>

        <div className="grid h-full w-full grid-cols-8 grid-rows-8">
          {board}
        </div>

        <div className="absolute -bottom-10 flex h-10 w-full items-center justify-around">
          {horizontal.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
