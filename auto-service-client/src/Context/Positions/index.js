import React from "react";
import { positionService } from "../../Api/services/Positions";

const PositionContext = React.createContext([]);

function PositionsProvider({ children }) {
  const [position, setPosition] = React.useState([]);

  React.useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPosition(data);
    });
  }, []);

  return (
    <PositionContext.Provider value={[{position}]}>
    <>
      {children}
    </>
     </PositionContext.Provider> 
  );
}

const usePositionContext = () => {
  const positionContext = React.useContext(PositionContext);
  return positionContext;
};

export { usePositionContext, PositionsProvider };
