// app/quizz/page.tsx
import './style.css';

export default function QuizzPage() {
  return (
    <div className="quizz-page">
      <div className="background"></div>
      <div className="quizz-content">
        <div className="question-container">
          <p className="question-text">
            <strong>Jayson :</strong> Dans quelle ville se trouve ce monument ?
          </p>
          <div className="answer-options">
            <p>a. Paris &nbsp;&nbsp; b. Londres &nbsp;&nbsp; c. Berlin &nbsp;&nbsp; d. Tokyo</p>
          </div>
        </div>
        <img src="/alien1.png" alt="Personnage Alien" className="character" />
      </div>
    </div>
  );
}
