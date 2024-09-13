import React, { useEffect, useState } from "react";

//  Hər biri xana dəyər və onclick funksiyası ilə təyin olunur, return dəyəri olaraq düymə qaytarılır, bunu etmə səbəbimiz onClick istifadəsi daha rahat olsun deyədir. Düymə içinə əlavə ediləcək dəyər Square funksiyasına ötürülən value dir.

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

export default function TicTacToe() {
//  Oyun xanaları üçün state
  const [squares, setSquares] = useState(Array(9).fill(""));
// Oynama növbəsinin təyini üçün state
  const [isXTurn, setIsXTurn] = useState(true);
// Qalibiyyət, bərabərlik vəya davam təyini üçün state
  const [status, setStatus] = useState("");

// Qalibin təyini üçün funksiya, eyni zamanda bərabərlik vəya oyunun davam etmə halını da bu funksiya vasitəsiylə check edirik.
  function getWinner(squares) {
// Qalibiyyət halı üçün 8 pattern var, bunların hamısını arrayə təyin edirik ki check edəndə bu arraydən istifadə edək.
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];


// For dövrü vasitəsiylə hər bir winningPatterns yoxlanılır, yoxlanma prosesini qısaca izah etsək, for dövründəki i dəyişəni hər dövr əvvəlində x, y və z ə təyin edilir və if şərti vasitəsiynən hər dövr üçün yoxlanılır.

    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  }

  // İstifadəçi restart düyməsinə basdığda növbə X a təyin edilir və bütün xanalar setSqaures funksiyası vasitəsiylə boş xanaya yəni "" çevrilir.
  function handleRestart() {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
  }

//  Hər dəfə squares vəya isXTurn stateləri dəyişəndə bu effect işə düşür və 3 hala baxır. 
//  1. Əgər getWinner null qaytarırsa və bütün xanalar doludursa(yəni boşdan fərqlidirsə: squares.every((item) => item !== "")) bərabərlik halı aktiv olur
//  2. Əgər getWinner null qaytarmırsa (yəni qalibi təyin edirsə) o zaman status getWinner funksiyasından qayıdan oyunçu (yəni X vəya O) qalib təyin edilir
//  3. Yuxarıdaki şərtlərin heçbiri ödənməyəndə deməkki hər hansı bərabərlik vəya qalibiyyət halı yoxdur, oyun davam edir və oynama növbəsinin kimdə olduğu statusa təyin edilir.
  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setStatus("Draw");
    } else if (getWinner(squares)) {
      setStatus(`Winner is ${getWinner(squares)}`);
    } else {
      setStatus(`Next player is ${isXTurn ? "X" : "O"}`);
    }
  }, [squares, isXTurn]);

// Hər bir Square elementinin handleClick funksiyası olaraq fəaliyyət göstərir, argument olaraq çağrıldığı xananın indexini alır. 
// cpySqaures adında bütün xanaların kopyası olan array yaradılır.
// Əgər kopyaladığımız array getWinner funksiyasına argument kimi ötürüləndə null cavabı qaytarılmırsa vəya kopyalanan arrayin argument ötürülən indexi doludursa funksiya return edir.
// Basılan xanaya növbə sırasının kimdə olduğuna əsasən X vəya O yazılır
// setİsXTurn vasitəsiylə növbə dəyişir
// Yeni xanalar setSquares vasitəsiylə squares stateimizə təyin edilir  
  function handleClick(getCurrentSquare) {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
    cpySquares[getCurrentSquare] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(cpySquares);
  }

  return (
    <div className="tic-tac-toe-container">
      <div className="row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
      <h1 className="status">{status}</h1>
      <button className="restart" onClick={handleRestart}>Restart</button>
    </div>
  );
}
