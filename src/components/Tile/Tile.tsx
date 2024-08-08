import { useContext } from "react";
import { PiecesContext } from "../Context/PiecesContext";

interface Props {
  number: number;
  x: number;
  y: number;
}

const Tile = ({ number, x, y }: Props) => {
  const {
    selectedPiece,
    setSelectedPiece,
    movePiece,
    getPossibleMoves,
    currentPlayer,
    pieces,
  } = useContext(PiecesContext);

  const piece = pieces.find((p) => p.x === x && p.y === y);
  const isSelected = selectedPiece?.x === x && selectedPiece?.y === y;
  const isPossibleMove =
    selectedPiece &&
    getPossibleMoves(selectedPiece).some((pos) => pos.x === x && pos.y === y);

  const clickHandler = () => {
    if (isSelected) {
      setSelectedPiece(null);
    } else if (selectedPiece) {
      if (isPossibleMove) {
        movePiece(selectedPiece, { x, y });
        setSelectedPiece(null);
      } else {
        setSelectedPiece(null);
      }
    } else {
      if (piece && piece.type.startsWith(currentPlayer)) {
        setSelectedPiece({ x, y });
      }
    }
  };

  const tileClass = number % 2 === 0 ? "bg-gray-300" : "bg-gray-500";

  return (
    <div
      className={`flex cursor-pointer items-center justify-center ${tileClass}`}
      onClick={clickHandler}
    >
      {isPossibleMove && !piece && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500"></div>
      )}
      {isSelected && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500"></div>
      )}
      {piece && (
        <img src={piece.image} alt="" className="h-full w-full cursor-grab" />
      )}
    </div>
  );
};

export default Tile;
