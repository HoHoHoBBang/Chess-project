import { createContext, useState } from "react";
import pawn_w from "../../assets/images/pawn_w.png";
import pawn_b from "../../assets/images/pawn_b.png";
import rook_w from "../../assets/images/rook_w.png";
import rook_b from "../../assets/images/rook_b.png";
import bishop_w from "../../assets/images/bishop_w.png";
import bishop_b from "../../assets/images/bishop_b.png";
import knight_w from "../../assets/images/knight_w.png";
import knight_b from "../../assets/images/knight_b.png";
import queen_w from "../../assets/images/queen_w.png";
import queen_b from "../../assets/images/queen_b.png";
import king_w from "../../assets/images/king_w.png";
import king_b from "../../assets/images/king_b.png";

interface Pieces {
  image: string;
  type: string;
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

interface ChildrenProps {
  children: React.ReactNode;
}

interface PiecesContextProps {
  pieces: Pieces[];
  selectedPiece: Position | null;
  setSelectedPiece: React.Dispatch<React.SetStateAction<Position | null>>;
  movePiece: (from: Position, to: Position) => void;
  getPossibleMoves: (position: Position) => Position[];
  currentPlayer: string;
  togglePlayer: () => void;
}

const initialPieces: Pieces[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "w" : "b";
  const y = p === 0 ? 7 : 0;

  initialPieces.push({
    image: type === "w" ? rook_w : rook_b,
    x: 0,
    y,
    type: `${type}_rook`,
  });
  initialPieces.push({
    image: type === "w" ? rook_w : rook_b,
    x: 7,
    y,
    type: `${type}_rook`,
  });
  initialPieces.push({
    image: type === "w" ? knight_w : knight_b,
    x: 1,
    y,
    type: `${type}_knight`,
  });
  initialPieces.push({
    image: type === "w" ? knight_w : knight_b,
    x: 6,
    y,
    type: `${type}_knight`,
  });
  initialPieces.push({
    image: type === "w" ? bishop_w : bishop_b,
    x: 2,
    y,
    type: `${type}_bishop`,
  });
  initialPieces.push({
    image: type === "w" ? bishop_w : bishop_b,
    x: 5,
    y,
    type: `${type}_bishop`,
  });
  initialPieces.push({
    image: type === "w" ? queen_w : queen_b,
    x: 3,
    y,
    type: `${type}_queen`,
  });
  initialPieces.push({
    image: type === "w" ? king_w : king_b,
    x: 4,
    y,
    type: `${type}_king`,
  });
}

for (let i = 0; i < 8; i++) {
  initialPieces.push({ image: pawn_w, x: i, y: 6, type: "w_pawn" });
}

for (let i = 0; i < 8; i++) {
  initialPieces.push({ image: pawn_b, x: i, y: 1, type: "b_pawn" });
}

export const PiecesContext = createContext<PiecesContextProps>({
  pieces: initialPieces,
  selectedPiece: null,
  setSelectedPiece: () => {},
  movePiece: () => {},
  getPossibleMoves: () => [],
  currentPlayer: "w",
  togglePlayer: () => {},
});

export const PiecesContextProvider = ({ children }: ChildrenProps) => {
  const [pieces, setPieces] = useState<Pieces[]>(initialPieces);
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string>("w");

  const togglePlayer = () => {
    setCurrentPlayer((prev) => (prev === "w" ? "b" : "w"));
  };

  const movePiece = (from: Position, to: Position) => {
    setPieces((prev) => {
      const updatedPieces = prev
        .filter((piece) => !(piece.x === to.x && piece.y === to.y))
        .map((piece) => {
          if (piece.x === from.x && piece.y === from.y) {
            return { ...piece, x: to.x, y: to.y };
          }
          return piece;
        });
      return updatedPieces;
    });
    togglePlayer();
  };

  const knightMoves = [
    { x: 2, y: 1 },
    { x: 2, y: -1 },
    { x: -2, y: 1 },
    { x: -2, y: -1 },
    { x: 1, y: 2 },
    { x: 1, y: -2 },
    { x: -1, y: 2 },
    { x: -1, y: -2 },
  ];

  const getPossibleMoves = (position: Position): Position[] => {
    const piece = pieces.find((p) => p.x === position.x && p.y === position.y);
    if (!piece) return [];

    const possibleMoves: Position[] = [];
    const isBlocked = (x: number, y: number) =>
      pieces.some((p) => p.x === x && p.y === y);
    const isOpponentPiece = (x: number, y: number, type: string) => {
      const targetPiece = pieces.find((p) => p.x === x && p.y === y);
      return targetPiece && targetPiece.type[0] !== type[0];
    };

    const addMoves = (dx: number, dy: number) => {
      let x = position.x + dx;
      let y = position.y + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        possibleMoves.push({ x, y });
        if (isBlocked(x, y)) break;
        x += dx;
        y += dy;
      }
    };

    switch (piece.type) {
      case "w_pawn":
        if (!isBlocked(position.x, position.y - 1))
          possibleMoves.push({ x: position.x, y: position.y - 1 });
        if (
          position.y === 6 &&
          !isBlocked(position.x, position.y - 2) &&
          !isBlocked(position.x, position.y - 1)
        )
          possibleMoves.push({ x: position.x, y: position.y - 2 });

        if (isOpponentPiece(position.x - 1, position.y - 1, piece.type))
          possibleMoves.push({ x: position.x - 1, y: position.y - 1 });
        if (isOpponentPiece(position.x + 1, position.y - 1, piece.type))
          possibleMoves.push({ x: position.x + 1, y: position.y - 1 });
        break;

      case "b_pawn":
        if (!isBlocked(position.x, position.y + 1))
          possibleMoves.push({ x: position.x, y: position.y + 1 });
        if (
          position.y === 1 &&
          !isBlocked(position.x, position.y + 2) &&
          !isBlocked(position.x, position.y + 1)
        )
          possibleMoves.push({ x: position.x, y: position.y + 2 });

        if (isOpponentPiece(position.x - 1, position.y + 1, piece.type))
          possibleMoves.push({ x: position.x - 1, y: position.y + 1 });
        if (isOpponentPiece(position.x + 1, position.y + 1, piece.type))
          possibleMoves.push({ x: position.x + 1, y: position.y + 1 });
        break;

      case "w_rook":
      case "b_rook":
        addMoves(1, 0);
        addMoves(-1, 0);
        addMoves(0, 1);
        addMoves(0, -1);
        break;

      case "w_bishop":
      case "b_bishop":
        addMoves(1, 1);
        addMoves(-1, 1);
        addMoves(1, -1);
        addMoves(-1, -1);
        break;

      case "w_knight":
      case "b_knight":
        knightMoves.forEach((move) => {
          const newX = position.x + move.x;
          const newY = position.y + move.y;
          if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
            possibleMoves.push({ x: newX, y: newY });
          }
        });
        break;

      case "w_queen":
      case "b_queen":
        addMoves(1, 0);
        addMoves(-1, 0);
        addMoves(0, 1);
        addMoves(0, -1);
        addMoves(1, 1);
        addMoves(-1, 1);
        addMoves(1, -1);
        addMoves(-1, -1);
        break;

      case "w_king":
      case "b_king":
        [-1, 0, 1].forEach((dx) => {
          [-1, 0, 1].forEach((dy) => {
            if (dx !== 0 || dy !== 0) {
              const newX = position.x + dx;
              const newY = position.y + dy;
              if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                possibleMoves.push({ x: newX, y: newY });
              }
            }
          });
        });
        break;
    }
    return possibleMoves;
  };

  return (
    <PiecesContext.Provider
      value={{
        pieces,
        selectedPiece,
        setSelectedPiece,
        movePiece,
        getPossibleMoves,
        currentPlayer,
        togglePlayer,
      }}
    >
      {children}
    </PiecesContext.Provider>
  );
};
