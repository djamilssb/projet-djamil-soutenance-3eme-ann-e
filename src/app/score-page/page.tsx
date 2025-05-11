// app/score-page/page.tsx
import './style.css';
import Link from 'next/link';

export default function ScorePage() {
  return (
    <div className="score-page">
      <div className="score-content">
        <div className="avatar-placeholder"></div>
        <h2 className="score-title">Bravo, voici votre score :</h2>
        <p className="score-value">5/10</p>
        <Link href="/" className="home-button">
          Retourner à l'accueil
        </Link>
      </div>
    </div>
  );
}
