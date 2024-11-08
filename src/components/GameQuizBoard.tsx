'use client';

import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Question {
  id: number;
  author: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
}

interface TeamScores {
  [key: string]: number;
}

interface TeamMoves {
  [key: string]: number;
}

const GameQuizBoard = () => {
  const TEAMS = ['Nhóm 1', 'Nhóm 2', 'Nhóm 3', 'Nhóm 5', 'Nhóm 6'];
  
  const TEAM_COLORS = {
    'Nhóm 1': 'bg-pink-500',
    'Nhóm 2': 'bg-purple-500',
    'Nhóm 3': 'bg-yellow-500',
    'Nhóm 5': 'bg-red-500',
    'Nhóm 6': 'bg-indigo-500'
  };

  const CELL_TYPES = {
    QUESTION: 'Q',
    LUCKY: 'L',
    UNLUCKY: 'U',
    SABOTAGE: 'S'
  };

  const [gameBoard, setGameBoard] = useState<(string | null)[]>([]);
  const [scores, setScores] = useState<TeamScores>({});
  const [currentTeam, setCurrentTeam] = useState(0);
  const [movesLeft, setMovesLeft] = useState<TeamMoves>({});
  const [message, setMessage] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  useEffect(() => {
    initializeGame();
    // Tải dữ liệu câu hỏi
    fetch('/questions.json')
      .then(response => response.json())
      .then(data => setQuestions(data.questions));
  }, []);

  const initializeGame = () => {
    const initialScores = TEAMS.reduce((acc, team) => ({ ...acc, [team]: 0 }), {});
    const initialMoves = TEAMS.reduce((acc, team) => ({ ...acc, [team]: 5 }), {});
    setScores(initialScores);
    setMovesLeft(initialMoves);
    setGameEnded(false);
    setMessage('Trò chơi bắt đầu! ' + TEAMS[0] + ' đi trước');

    const cells = [
      ...Array(10).fill(CELL_TYPES.QUESTION),
      ...Array(4).fill(CELL_TYPES.LUCKY),
      ...Array(3).fill(CELL_TYPES.UNLUCKY),
      ...Array(3).fill(CELL_TYPES.SABOTAGE)
    ];
    setGameBoard(_.shuffle(cells));
  };

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const handleAnswerSelect = (selectedAnswer: string) => {
    if (!currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    let msg = '';
    let points = 0;

    if (isCorrect) {
      points = 5;
      msg = `${TEAMS[currentTeam]} trả lời đúng! +5 điểm 🎯`;
    } else {
      msg = `${TEAMS[currentTeam]} trả lời sai 😢 Đáp án đúng là ${currentQuestion.correctAnswer}`;
    }

    handleMoveComplete(points, msg);
    setIsQuestionDialogOpen(false);
    setCurrentQuestion(null);
  };

  const handleMoveComplete = (points: number, msg: string) => {
    if (points !== 0) {
      setScores(prev => ({
        ...prev,
        [TEAMS[currentTeam]]: Math.max(0, prev[TEAMS[currentTeam]] + points)
      }));
    }

    // Đánh dấu ô đã sử dụng
    if (selectedCell !== null) {
      const newBoard = [...gameBoard];
      newBoard[selectedCell] = null;
      setGameBoard(newBoard);
    }

    // Cập nhật lượt chơi
    const newMoves = {
      ...movesLeft,
      [TEAMS[currentTeam]]: movesLeft[TEAMS[currentTeam]] - 1
    };
    setMovesLeft(newMoves);
    
    const nextTeam = (currentTeam + 1) % TEAMS.length;
    setCurrentTeam(nextTeam);
    setMessage(msg + ` | Đến lượt ${TEAMS[nextTeam]}`);

    checkGameEnd(newMoves);
  };

  const handleCellClick = (index: number) => {
    if (gameBoard[index] === null || movesLeft[TEAMS[currentTeam]] === 0 || gameEnded) return;

    setSelectedCell(index);
    const cellType = gameBoard[index];

    switch (cellType) {
      case CELL_TYPES.QUESTION:
        const question = getRandomQuestion();
        setCurrentQuestion(question);
        setIsQuestionDialogOpen(true);
        break;

      case CELL_TYPES.LUCKY:
        handleMoveComplete(5, `May mắn! ${TEAMS[currentTeam]} được +5 điểm 🍀`);
        break;

      case CELL_TYPES.UNLUCKY:
        handleMoveComplete(-5, `Không may! ${TEAMS[currentTeam]} bị -5 điểm 💔`);
        break;

      case CELL_TYPES.SABOTAGE:
        const targetIndex = parseInt(prompt(`Chọn nhóm để trừ điểm (1, 2, 3, 5, 6), trừ ${TEAMS[currentTeam]}:`) || '0');
        const targetTeam = `Nhóm ${targetIndex}`;
        if (TEAMS.includes(targetTeam) && targetTeam !== TEAMS[currentTeam]) {
          setScores(prev => ({
            ...prev,
            [targetTeam]: Math.max(0, prev[targetTeam] - 5)
          }));
          handleMoveComplete(0, `${TEAMS[currentTeam]} đã trừ 5 điểm của ${targetTeam} 😈`);
        } else {
          setMessage('Lựa chọn không hợp lệ!');
        }
        break;
    }
  };

  const checkGameEnd = (moves: TeamMoves) => {
    if (Object.values(moves).every(m => m === 0)) {
      const winner = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      setMessage(`🎉 Trò chơi kết thúc! ${winner} chiến thắng với ${scores[winner]} điểm! 🎉`);
      setGameEnded(true);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Trò Chơi Ô Chữ</h1>
      
      {/* Bảng điểm */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {TEAMS.map((team, i) => (
          <div 
            key={team}
            className={`p-4 rounded-lg shadow-lg ${
              i === currentTeam && !gameEnded ? 'ring-2 ring-green-500 transform scale-105' : ''
            } ${TEAM_COLORS[team as keyof typeof TEAM_COLORS]} text-white`}
          >
            <div className="text-center">
              <div className="font-semibold">{team}</div>
              <div className="text-3xl font-bold">{scores[team]}</div>
              <div className="text-sm">Còn {movesLeft[team]} lượt</div>
            </div>
          </div>
        ))}
      </div>

      {/* Thông báo */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg text-center text-lg font-semibold ${
          gameEnded ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {message}
        </div>
      )}

      {/* Bảng trò chơi */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {gameBoard.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={!cell || gameEnded}
            className={`h-24 rounded-lg font-bold text-2xl text-white transition-all transform hover:scale-105 ${
              cell ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {cell ? '?' : '✓'}
          </button>
        ))}
      </div>

      {/* Dialog câu hỏi */}
      <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Câu hỏi cho {TEAMS[currentTeam]}</DialogTitle>
          </DialogHeader>
          {currentQuestion && (
            <div className="p-4">
              <p className="text-lg mb-4">{currentQuestion.question}</p>
              <div className="space-y-2">
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelect(key)}
                    className="w-full p-2 text-left hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {key}. {value}
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Nút reset */}
      <button
        onClick={initializeGame}
        className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold"
      >
        Chơi Lại 🎮
      </button>
    </div>
  );
};

export default GameQuizBoard;
