// app/quizz/page.tsx
import './style.css';

export default function QuizzPage() {
  return (
    <>
    <div className="quizz-container">
      <table className="quizz-table">
        <thead>
          <tr>
            <th>Nom du quizz</th>
            <th>Date de création</th>
            <th>Nom du créateur</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>London2012</td>
            <td>22/09/20</td>
            <td>Jerome82</td>
            <td>
              <button className="start-button">Démarrer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
}
