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

// Paths
const imgPath = process.env.REACT_APP_IMG_PATH;
const imgNumPath = process.env.REACT_APP_IMG_NUM_PATH;

// Objs
const imgObj = require("../../src/objects/imgObj.json");
const numbersObj = require("../../src/objects/numbersObj.json");

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
            {hoverItem === imgObj.scissors.name ? (
              <span>{hoverItem}</span>
            ) : null}
            <img
              onMouseEnter={() => displayPopover(imgObj.scissors.name)}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(imgObj.scissors.name)}
              src={`${imgPath}${imgObj.scissors.value}`}
              alt={imgObj.scissors.name}
            />
          </div>
        </div>

        {/* Second row */}
        <div className="second">
          <div className="pulse">
            {hoverItem === imgObj.paper.name ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(imgObj.paper.name)}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(imgObj.paper.name)}
              src={`${imgPath}${imgObj.paper.value}`}
              alt={imgObj.paper.name}
            />
          </div>
          <div className="pulse">
            {hoverItem === imgObj.rock.name ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(imgObj.rock.name)}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(imgObj.rock.name)}
              src={`${imgPath}${imgObj.rock.value}`}
              alt={imgObj.rock.name}
            />
          </div>
        </div>

        {/* Third row */}
        <div className="third">
          <div className="pulse">
            {hoverItem === imgObj.lizard.name ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(imgObj.lizard.name)}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(imgObj.lizard.name)}
              src={`${imgPath}${imgObj.lizard.value}`}
              alt={imgObj.lizard.name}
            />
          </div>
          <div className="pulse">
            {hoverItem === imgObj.spock.name ? <span>{hoverItem}</span> : null}
            <img
              onMouseEnter={() => displayPopover(imgObj.spock.name)}
              onMouseLeave={() => displayPopover("")}
              onClick={() => pick(imgObj.spock.name)}
              src={`${imgPath}${imgObj.spock.value}`}
              alt={imgObj.spock.name}
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
        src={`${imgPath}${imgObj.replay.value}`}
        alt={imgObj.replay.name}
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

  // Player picked item
  let str1: any = playerObj.player;
  let keyStr1: any = imgObj[str1 as keyof typeof imgObj].value;

  // Computer picked item
  let str2: any = playerObj.computer;
  let keyStr2: any = imgObj[str2 as keyof typeof imgObj].value;

  return (
    <>
      <div className="winner">
        <div>
          <span>Player</span>
          <img src={`${imgPath}${keyStr1}`} alt="player" className="tada" />
        </div>
        <div>
          <img
            src={`${imgPath}${imgObj.vs.value}`}
            alt={imgObj.vs.name}
            className="bounceIn"
          />
        </div>
        <div>
          <span>Computer</span>
          <img src={`${imgPath}${keyStr2}`} alt="computer" className="tada" />
        </div>
      </div>
      <div className="win">
        {/* Winner */}
        {playerObj.fullObj.player1 && !playerObj.fullObj.player2 ? (
          <>
            <Fireworks />
            <img
              src={`${imgPath}${imgObj.win.value}`}
              alt={imgObj.win.name}
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
              src={`${imgPath}${imgObj.lose.value}`}
              alt={imgObj.lose.name}
              className="zoomInDown"
            />
          </>
        ) : null}
        {/* Equality */}
        {!playerObj.fullObj.player1 && !playerObj.fullObj.player2 ? (
          <img
            src={`${imgPath}${imgObj.equality.value}`}
            alt={imgObj.equality.name}
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
        {scorePlayerArr.map((element: number, i: number) => {
          let keyStr: string =
            numbersObj[element as keyof typeof numbersObj].value;

          return (
            <img
              key={i}
              src={`${imgNumPath}${keyStr}`}
              alt="number"
              className="number"
            />
          );
        })}
      </div>
      <div>
        <img
          src={`${imgPath}${imgObj.versus.value}`}
          alt={imgObj.versus.name}
          className="versus"
        />
      </div>
      <div>
        <span>Com</span>
      </div>
      <div>
        {/* Computer score */}
        {scoreComputerArr.map((element: number, i: number) => {
          let keyStr: string =
            numbersObj[element as keyof typeof numbersObj].value;

          return (
            <img
              key={i}
              src={`${imgNumPath}${keyStr}`}
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
