"use client";

import React, { useState, useEffect } from "react";
import _ from "lodash";
import confetti from "canvas-confetti";
import data from "@/app/data/questions";

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
  const TEAMS = ["Nhóm 1", "Nhóm 2", "Nhóm 3", "Nhóm 5", "Nhóm 6"];

  const TEAM_COLORS = {
    "Nhóm 1": "bg-pink-500",
    "Nhóm 2": "bg-purple-500",
    "Nhóm 3": "bg-yellow-500",
    "Nhóm 5": "bg-red-500",
    "Nhóm 6": "bg-indigo-500",
  };

  const CELL_TYPES = {
    QUESTION: "Q",
    LUCKY: "L",
    UNLUCKY: "U",
    SABOTAGE: "S",
    DOUBLE: "D",
    LEADER: "LD",
  };

  const [gameBoard, setGameBoard] = useState<(string | null)[]>([]);
  const [scores, setScores] = useState<TeamScores>({});
  const [currentTeam, setCurrentTeam] = useState(0);
  const [movesLeft, setMovesLeft] = useState<TeamMoves>({});
  const [message, setMessage] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    initializeGame();
    // Khởi tạo câu hỏi mẫu
    setQuestions(data.questions);
  }, []);

  const initializeGame = () => {
    const initialScores = TEAMS.reduce(
      (acc, team) => ({ ...acc, [team]: 0 }),
      {}
    );
    const initialMoves = TEAMS.reduce(
      (acc, team) => ({ ...acc, [team]: 5 }),
      {}
    );
    setScores(initialScores);
    setMovesLeft(initialMoves);
    setGameEnded(false);
    setMessage("Trò chơi bắt đầu! " + TEAMS[0] + " đi trước");
    setIsProcessing(false);

    const cells = [
      ...Array(10).fill(CELL_TYPES.QUESTION),
      ...Array(4).fill(CELL_TYPES.LUCKY),
      ...Array(2).fill(CELL_TYPES.UNLUCKY),
      ...Array(1).fill(CELL_TYPES.SABOTAGE),
      ...Array(2).fill(CELL_TYPES.DOUBLE),
      ...Array(1).fill(CELL_TYPES.LEADER),
    ];
    setGameBoard(_.shuffle(cells));
  };

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  // Cập nhật handleCloseModal để thêm hiệu ứng khi trả lời đúng
  const handleCloseModal = () => {
    if (!showResult) return;

    if (currentQuestion) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      handleMoveComplete(
        isCorrect ? 5 : 0,
        isCorrect
          ? `${TEAMS[currentTeam]} trả lời đúng! +5 điểm 🎯`
          : `${TEAMS[currentTeam]} trả lời sai 😢`
      );
    }

    setIsQuestionDialogOpen(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(null);
    setIsProcessing(false);
  };

  // Thêm hàm bắn pháo hoa
  const fireConfetti = () => {
    // Bắn từ góc trái
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.6 },
    });

    // Bắn từ góc phải
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.6 },
      });
    }, 250);
  };

  // Thêm hiệu ứng pháo hoa đặc biệt khi thắng
  const fireWinnerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 30,
        particleCount: 50,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 250);
  };

  const handleMoveComplete = (points: number, msg: string) => {
    // Cập nhật điểm số
    if (points > 0) {
      setScores((prev) => ({
        ...prev,
        [TEAMS[currentTeam]]: Math.max(0, prev[TEAMS[currentTeam]] + points),
      }));
      // Bắn pháo hoa khi được cộng điểm
      fireConfetti();
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
      [TEAMS[currentTeam]]: movesLeft[TEAMS[currentTeam]] - 1,
    };
    setMovesLeft(newMoves);

    // Chuyển lượt
    const nextTeam = (currentTeam + 1) % TEAMS.length;
    setCurrentTeam(nextTeam);
    setMessage(msg + ` | Đến lượt ${TEAMS[nextTeam]}`);

    // Kiểm tra kết thúc game
    if (Object.values(newMoves).every((m) => m === 0)) {
      const winner = Object.entries(scores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      setMessage(
        `🎉 Trò chơi kết thúc! ${winner} chiến thắng với ${scores[winner]} điểm! 🎉`
      );
      setGameEnded(true);
      // Bắn pháo hoa đặc biệt khi kết thúc game
      fireWinnerConfetti();
    }
  };

  const handleCellClick = (index: number) => {
    if (
      gameBoard[index] === null ||
      movesLeft[TEAMS[currentTeam]] === 0 ||
      gameEnded ||
      isProcessing
    )
      return;

    setIsProcessing(true);
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
        setIsProcessing(false);
        break;

      case CELL_TYPES.UNLUCKY:
        handleMoveComplete(
          -5,
          `Không may! ${TEAMS[currentTeam]} bị -5 điểm 💔`
        );
        setIsProcessing(false);
        break;

      case CELL_TYPES.SABOTAGE:
        const targetIndex = parseInt(
          prompt(
            `Chọn nhóm để trừ điểm (1, 2, 3, 5, 6), trừ ${TEAMS[currentTeam]}:`
          ) || "0"
        );
        const targetTeam = `Nhóm ${targetIndex}`;
        if (TEAMS.includes(targetTeam) && targetTeam !== TEAMS[currentTeam]) {
          setScores((prev) => ({
            ...prev,
            [targetTeam]: Math.max(0, prev[targetTeam] - 5),
          }));
          handleMoveComplete(
            0,
            `${TEAMS[currentTeam]} đã trừ 5 điểm của ${targetTeam} 😈`
          );
        } else {
          setMessage("Lựa chọn không hợp lệ!");
        }
        setIsProcessing(false);
        break;

      case CELL_TYPES.DOUBLE:
        // Nhân đôi điểm hiện tại của team
        const currentScore = scores[TEAMS[currentTeam]];
        const doubledPoints = currentScore;
        setScores((prev) => ({
          ...prev,
          [TEAMS[currentTeam]]: currentScore + doubledPoints,
        }));
        handleMoveComplete(
          0,
          `${TEAMS[currentTeam]} đã nhân đôi điểm! +${doubledPoints} điểm 🌟`
        );
        setIsProcessing(false);
        break;

      case CELL_TYPES.LEADER:
        // Tìm điểm cao nhất hiện tại
        const highestScore = Math.max(...Object.values(scores));
        const pointsToAdd = highestScore + 5 - scores[TEAMS[currentTeam]];
        setScores((prev) => ({
          ...prev,
          [TEAMS[currentTeam]]: highestScore + 5,
        }));
        handleMoveComplete(
          0,
          `${TEAMS[currentTeam]} vượt lên dẫn đầu! +${pointsToAdd} điểm 🚀`
        );
        setIsProcessing(false);
        break;
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
              i === currentTeam && !gameEnded
                ? "ring-2 ring-green-500 transform scale-105"
                : ""
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
        <div
          className={`mb-4 p-4 rounded-lg text-center text-lg font-semibold ${
            gameEnded
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Bảng trò chơi */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {gameBoard.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={!cell || gameEnded || isProcessing}
            className={`relative h-24 rounded-lg font-bold text-2xl text-white transition-all transform hover:scale-105 ${
              cell
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            } ${isProcessing ? "opacity-50" : ""}`}
          >
            {/* Dấu ? hoặc ✓ ở giữa */}
            <span className="absolute inset-0 flex items-center justify-center">
              {cell ? "#" + (index + 1) : "✓"}
            </span>
          </button>
        ))}
      </div>

      {/* Modal câu hỏi */}
      {isQuestionDialogOpen && currentQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">
                Câu hỏi cho {TEAMS[currentTeam]}
              </h3>
              <p className="text-lg mb-4">{currentQuestion.question}</p>
            </div>

            <div className="space-y-3">
              {Object.entries(currentQuestion.options).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleAnswerSelect(key)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg transition-colors border ${
                    showResult
                      ? key === currentQuestion.correctAnswer
                        ? "bg-green-100 border-green-500"
                        : key === selectedAnswer &&
                          key !== currentQuestion.correctAnswer
                        ? "bg-red-100 border-red-500"
                        : "bg-gray-50 border-gray-200"
                      : "hover:bg-gray-100 border-gray-200"
                  }`}
                >
                  {key}. {value}
                  {showResult && key === currentQuestion.correctAnswer && (
                    <span className="float-right text-green-500">✓</span>
                  )}
                  {showResult &&
                    key === selectedAnswer &&
                    key !== currentQuestion.correctAnswer && (
                      <span className="float-right text-red-500">✗</span>
                    )}
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Đóng
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nút reset */}
      <button
        onClick={initializeGame}
        disabled={isProcessing}
        className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold disabled:opacity-50"
      >
        Chơi Lại 🎮
      </button>
    </div>
  );
};

export default GameQuizBoard;
