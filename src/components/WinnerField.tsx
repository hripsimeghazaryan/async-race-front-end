import { useContext } from "react";
import { WinnersType } from "../interfaces/WinnersType";
import { WinnersDataContext } from "../contexts/winners-data";
import WinnerLine from "./WinnerLine";


function WinnerField() {
  const { winners } = useContext(WinnersDataContext) as WinnersType;

  return (
    <div className="winner-container">
        {
          winners?.map((winner) => (
            <WinnerLine key={winner.id} id={winner.id} name={winner.name} color={winner.color} time={winner.time} wins={winner.wins} />
          ))
        }
    </div>
  );
}

export default WinnerField;
