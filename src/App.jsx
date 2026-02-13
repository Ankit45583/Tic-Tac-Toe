import { useState } from 'react'
import './App.css'

function App() {
  const [board , setBoard] = useState(Array(9).fill(null));

  const [isXNext , setIsXNext] = useState(true);

  const winner = calculationWinner(board);

  const handleClick =(i)=>
  {
    if(board[i] || winner)
    {
      return ;
    }

    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);

    setTimeout(() => {
      if (calculationWinner(newBoard)) return;

      const aiMove = getAIMove(newBoard);
      if (aiMove !== undefined) {
        newBoard[aiMove] = "O";
        setBoard([...newBoard]);
      }
    }, 500);
  }
   
  const resetGame = ()=>
  {
     setBoard(Array(9).fill(null));
     setIsXNext(true);
  }
  
 
  return (
      <div className='container'>
        <h2>Tic-Tac-Toe</h2>
        
        <div className="status">
          {winner ? `Winner: ${winner}`
          :"You(X) vs AI(O)"}
        </div>

        <div className='board'>
          {board.map((value , index)=>
            <button key={index} className='cell'
             onClick={()=> handleClick(index)}>
              {value}
            </button>
          )}
        </div>
        <button className='reset'  onClick={resetGame}> Reset Game</button>
      </div>
  )
}

function calculationWinner(board){
  const lines = [[0 , 1 ,2] , [3 , 4 ,5] , [ 6, 7 ,8] , [0 , 3 , 6], [1  , 4 , 7] , [2, 5, 8] ,  [0 , 4 , 8] , [2 , 4, 6]]

    for(let line of lines)
    {
      const [a , b , c] = line;
      if(board[a] && board[a] ===  board[b] && board[a] === board[c]) 
      {
        return board[a];
      }
    }
    return null;
    
}

function getAIMove(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (let [a,b,c] of lines)
 {
    const values = [board[a], board[b], board[c]];
    if (values.filter(v => v === "O").length === 2 && values.includes(null)) {
      return [a,b,c][values.indexOf(null)];
    }
  }

  for (let [a,b,c] of lines)
  {
    const values = [board[a], board[b], board[c]];
    if (values.filter(v => v === "X").length === 2 && values.includes(null)) {
      return [a,b,c][values.indexOf(null)];
    }
  }

  const empty = board
    .map((v,i) => v === null ? i : null)
    .filter(v => v !== null);

  return empty[Math.floor(Math.random() * empty.length)];
}



export default App
