// StudentQuiz.tsx
"use client";

import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface MCQ {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  description?: string; // <-- Add this line
}

interface QuizProps {
  allMcqs: MCQ[];
  duration?: number; // in seconds
}

const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const StudentQuiz: React.FC<QuizProps> = ({ allMcqs, duration = 300 }) => {
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentMcq, setCurrentMcq] = useState<MCQ | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const selected = shuffleArray(allMcqs).slice(0, 10);
    setQuestions(selected);
    setAnswers(Array(10).fill(-1));
  }, [allMcqs]);

  useEffect(() => {
    if (!submitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const handleOptionChange = (index: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let sc = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswerIndex) sc++;
    });
    setScore(sc);
    setSubmitted(true);
  };

  const handleReview = (mcq: MCQ, userAnswer: number) => {
    setCurrentMcq(mcq);
    setIsCorrect(userAnswer === mcq.correctAnswerIndex);
    setShowAnswer(true);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">🧠 Take the Quiz</h2>
      {!submitted && <p className="text-danger">⏱ Time Left: {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}</p>}
      {questions.map((q, idx) => (
        <div key={idx} className="mb-4">
          <strong>
            {idx + 1}. {q.question}
          </strong>
          <div className="mt-2">
            {q.options.map((opt, optIdx) => (
              <Form.Check
                key={optIdx}
                type="radio"
                id={`q-${idx}-opt-${optIdx}`}
                name={`question-${idx}`}
                label={opt}
                checked={answers[idx] === optIdx}
                onChange={() => handleOptionChange(idx, optIdx)}
                disabled={submitted}
              />
            ))}
          </div>
        </div>
      ))}

      {!submitted && (
        <Button onClick={handleSubmit} variant="primary">
          ✅ Submit Quiz
        </Button>
      )}

      {submitted && (
        <div className="mt-4">
          <h4>🎯 You scored {score} / 10</h4>
          <Button onClick={() => window.location.reload()} className="mt-2" variant="success">
            🔄 Retake Quiz
          </Button>
        </div>
      )}

      {showAnswer && currentMcq && (
        <div className={isCorrect ? "text-success" : "text-danger"}>
          {isCorrect ? "Correct!" : "Incorrect."}
          <div className="mt-2">
            <b>Explanation:</b> {currentMcq.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentQuiz;
