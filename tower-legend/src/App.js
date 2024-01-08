import "./App.css";
import { useState, useMemo } from "react";

function App() {
  let multiplier = [
    13.185112, 9.88883401, 7.41662551, 5.56246913, 4.17185185, 3.21, 2.34, 1.76,
    1.32,
  ];
  let arr = new Array(9);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(4).fill({ isChecked: false });
  }
  const [blast, setBlast] = useState(false);
  const [number, setNumber] = useState(8);
  const [row, setRow] = useState(arr);
  const [betAmount, setBetamount] = useState(100);
  const [bet, setBet] = useState(false);
  const [play, setPlay] = useState(false);
  const [won, setWon] = useState(false);
  const [takenValue, setTakenValue] = useState(0);
  const [restart, setRestart] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const reward = multiplier.map((item) => item * betAmount);

  const randomNumber = () => row.map((itme) => Math.floor(Math.random() * 4));
  var bombs = useMemo(() => randomNumber(), [restart]);
  console.log(bombs);

  const handleClick = (e, i, index) => {
    if (i === bombs[number]) {
      setPlay(false);
      setBlast(true);
      e.target.classList.add("bomb");
    } else {
      const board = [...row];
      board[index] = [...row[index]];
      board[index][i] = { isChecked: true };
      setRow(board);
      setNumber((prevCount) => prevCount - 1);
      number === 0 ? setWon(true) : setWon(false);
      setTakenValue(reward[index]);
    }
  };
  console.log(row);
  const handleClickBtn = (param) => {
    if (param === "Take") {
      setShowAll(true);
      setPlay(false);
    }
    if (param === "End") {
      setPlay(false);
      setShowAll(true);
    }
    if (param === "Play") {
      setNumber(8);
      setBet(true);
      setPlay(true);
      setBlast(false);
      setWon(false);
      setShowAll(false);
      setRestart(!restart);
      setRow(arr);
    }
  };

  // console.log(takenValue);
  return (
    <div>
      <div className="App">
        {row.map((items, index) => {
          let num = index;

          return (
            <div className="main" key={index}>
              <div className="beforeRow"></div>
              {items.map((col, i) => {
                return (
                  <div key={i}>
                    <div
                      className={`${bet ? "common" : "commonWithOutBet"}
                      
                       ${
                         blast || won || showAll
                           ? bombs[index] === i
                             ? num === number
                               ? "bombFinishRow"
                               : "bombFinish"
                             : num > number
                             ? col.isChecked
                               ? "yellow"
                               : "yellowFinish"
                             : "yellowFinish"
                           : num > number
                           ? col.isChecked
                             ? "yellow"
                             : "disable"
                           : num === number && bet
                           ? "opacity"
                           : "noOpacity"
                       } 
                      
                      
                      `}
                      onClick={(e) => handleClick(e, i, index)}
                    ></div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <input type="number" onChange={(e) => setBetamount(e.target.value)} />
        <button
          onClick={() =>
            handleClickBtn(
              play ? (number < 8 && !blast ? "Take" : "End") : "Play"
            )
          }
        >
          {play
            ? number < 8 && !blast
              ? `Take ${takenValue}`
              : "End"
            : "Play"}
        </button>
      </div>
    </div>
  );
}

export default App;
