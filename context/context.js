import { createContext, useState } from "react";

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [gameCollections, setGameCollections] = useState([]);

  return (
    <GameContext.Provider value={{ gameCollections, setGameCollections }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
