import { useEffect, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Redux slice
import {
  toggle,
  winner,
  borderColor,
  incrementPlayerScore,
  incrementComputerScore,
} from "../redux/elementsStates";

// Components
import LightNightButton from "./lightNightButton";

// CSS
import "../styles/scss/game.scss";

// Main functions
const playFunctions = require(".././functions/playFunctions");

// Types
interface RootState {
  gameElement: any;
}

// Items
const items = ["scissors", "paper", "rock", "lizard", "spock"];

/* PICK */
const ItemsPick = () => {
  // States
  const [hoverItem, setHoverItem] = useState<string>("");

  // Redux actions dispatching
  const dispatch = useDispatch();

  // Pick
  const pick = async (pickedItem: string) => {
    // Play function
    const players = await playFunctions.play(pickedItem);

    // Add 1 to player's score
    if (players.player1 && !players.player2) {
      dispatch(incrementPlayerScore());
    }

    // Add 1 to player's score
    if (!players.player1 && players.player2) {
      dispatch(incrementComputerScore());
    }

    // Record redux
    dispatch(
      winner({
        player: players.item1,
        computer: players.item2,
        fullObj: players,
      })
    );

    // Set replay button
    dispatch(toggle(true));
  };

  // Display popover
  const displayPopover = (element: string) => {
    setHoverItem(element);
  };

  return (
    <>
      {/* Items List */}
      <div className="list">
        {/* First row */}
        <div className="first">
          <div className="pulse">
            {hoverItem === items[0] ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(items[0])}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(items[0])}
              src={require(`./../assets/img/${items[0]}.png`)}
              alt={items[0]}
            />
          </div>
        </div>

        {/* Second row */}
        <div className="second">
          <div className="pulse">
            {hoverItem === items[1] ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(items[1])}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(items[1])}
              src={require(`./../assets/img/${items[1]}.png`)}
              alt={items[1]}
            />
          </div>
          <div className="pulse">
            {hoverItem === items[2] ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(items[2])}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(items[2])}
              src={require(`./../assets/img/${items[2]}.png`)}
              alt={items[2]}
            />
          </div>
        </div>

        {/* Third row */}
        <div className="third">
          <div className="pulse">
            {hoverItem === items[3] ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(items[3])}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(items[3])}
              src={require(`./../assets/img/${items[3]}.png`)}
              alt={items[3]}
            />
          </div>
          <div className="pulse">
            {hoverItem === items[4] ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(items[4])}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(items[4])}
              src={require(`./../assets/img/${items[4]}.png`)}
              alt={items[4]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

/* BUTTON */
const ReplayButton = () => {
  // Redux actions dispatching
  const dispatch = useDispatch();

  // Reset
  const reset = () => {
    // Set replay button
    dispatch(toggle(false));
    // Set border color
    dispatch(borderColor("blue"));
  };

  return (
    <div className="replay replayButton">
      <img
        onClick={() => reset()}
        src={require(`./../assets/img/replay.png`)}
        alt="replay"
      />
    </div>
  );
};

/* FIREWORKS */
const Fireworks = () => {
  return (
    <>
      {/* Fireworks animation */}
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    </>
  );
};

/* WINNER */
const Winner = ({ playerObj }: any) => {
  // Redux actions dispatching
  const dispatch = useDispatch();

  useEffect(() => {
    // Set border color div
    if (playerObj.fullObj.player1 && !playerObj.fullObj.player2) {
      dispatch(borderColor("green"));
    }
    if (!playerObj.fullObj.player1 && playerObj.fullObj.player2) {
      dispatch(borderColor("red"));
    }
  });

  return (
    <>
      <div className="winner">
        <div>
          <span>Player</span>
          <img
            src={require(`./../assets/img/${playerObj.player}.png`)}
            alt="player"
            className="tada"
          />
        </div>
        <div>
          <img
            src={require(`./../assets/img/vs.png`)}
            alt="vs"
            className="bounceIn"
          />
        </div>
        <div>
          <span>Computer</span>
          <img
            src={require(`./../assets/img/${playerObj.computer}.png`)}
            alt="computer"
            className="tada"
          />
        </div>
      </div>
      <div className="win">
        {/* Winner */}
        {playerObj.fullObj.player1 && !playerObj.fullObj.player2 ? (
          <>
            <Fireworks />
            <img
              src={require(`./../assets/img/win.png`)}
              alt="win"
              className="zoomInDown"
            />
          </>
        ) : null}
        {/* Loser */}
        {!playerObj.fullObj.player1 && playerObj.fullObj.player2 ? (
          <>
            {/* Thunder effect */}
            <div id="lightning_hero"></div>
            <div className="overlay"></div>
            <img
              src={require(`./../assets/img/lose.png`)}
              alt="lose"
              className="zoomInDown"
            />
          </>
        ) : null}
        {/* Equality */}
        {!playerObj.fullObj.player1 && !playerObj.fullObj.player2 ? (
          <img
            src={require(`./../assets/img/equality.png`)}
            alt="equality"
            className="zoomInDown equality"
          />
        ) : null}
      </div>
    </>
  );
};

/* RULES */
const Rules = () => {
  return (
    <div className="rules">
      <h2>Rules</h2>
      <p>
        Each player picks a variable and reveals it at the same time. The winner
        is the one who defeats the others. In a tie, the process is repeated
        until a winner is found.
      </p>
      <ul>
        <li>Rock crushes Scissors or crushes Lizard</li>
        <li>Scissors cuts Paper or decapitates Lizard</li>
        <li>Paper covers Rock or disproves Spock</li>
        <li>Lizard eats Paper or poisons Spock</li>
        <li>Spock vaporizes Rock or smashes Scissors</li>
      </ul>
    </div>
  );
};

/* SCORE */
const Score = () => {
  // Read score from redux store
  const scorePlayerArr: any = useSelector(
    (state: RootState) => state.gameElement.scorePlayerArr
  );
  const scoreComputerArr: any = useSelector(
    (state: RootState) => state.gameElement.scoreComputerArr
  );

  return (
    <div className="score">
      <div>
        <span>You</span>
      </div>
      <div>
        {/* Player score */}
        {scorePlayerArr.map((element: any, i: number) => {
          return (
            <img
              key={i}
              src={require(`./../assets/img/numbers/${element}.png`)}
              alt="number"
              className="number"
            />
          );
        })}
      </div>
      <div>
        <img
          src={require(`./../assets/img/versus.png`)}
          alt="versus"
          className="versus"
        />
      </div>
      <div>
        <span>Com</span>
      </div>
      <div>
        {/* Computer score */}
        {scoreComputerArr.map((element: any, i: number) => {
          return (
            <img
              key={i}
              src={require(`./../assets/img/numbers/${element}.png`)}
              alt="number"
              className="number"
            />
          );
        })}
      </div>
    </div>
  );
};

/* TITLE */
const Title = ({ buttonState }: any) => {
  return (
    <>
      <div className="title">
        <h2>Rock, Paper, Scissors, Lizard, Spock</h2>
        <Score />
        {!buttonState ? (
          <p className="pulseAnimation">Pick an item to play</p>
        ) : null}
      </div>
    </>
  );
};

/* GAME */
const Game = () => {
  // Redux data reading
  const buttonState: any = useSelector(
    (state: RootState) => state.gameElement.button
  );
  const playerObj: any = useSelector(
    (state: RootState) => state.gameElement.winner
  );
  const borderColor1: any = useSelector(
    (state: RootState) => state.gameElement.borderColor
  );

  return (
    <>
      <div className="container">
        <div className={`centered ${borderColor1}`}>
          <LightNightButton />
          <Title buttonState={buttonState} />
          {/* Winners */}
          {buttonState ? <Winner playerObj={playerObj} /> : null}

          {/* Pick or Reset button */}
          {!buttonState ? (
            <>
              <ItemsPick />
              <Rules />
            </>
          ) : (
            <ReplayButton />
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
