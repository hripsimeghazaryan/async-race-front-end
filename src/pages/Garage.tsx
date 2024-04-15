import RacingLine from "../components/RacingLine";
import './Garage.css'

function Garage() {

    return (
        <div className="garage-container">
            <div className="racing-track-container">
                <RacingLine />
            </div>
        </div>
    );

}

export default Garage;