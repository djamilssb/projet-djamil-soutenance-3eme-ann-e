import Link from "next/link";

interface QuizListItemProps {
    id: number;
    title: string;
    date: string;
    userName: string;
    mode?: 'play' | 'edit'; // Ajout du mode
}

export default function QuizListItem(props: QuizListItemProps): React.JSX.Element {
    // Déterminer l'URL et le texte du bouton en fonction du mode
    const buttonConfig = props.mode === 'play' 
        ? { url: `/game/quiz/choix-du-personnage?quizId=${props.id}`, text: 'JOUER' }
        : { url: `/account/quizzes/edit/${props.id}`, text: 'Modifier' };
    
    return (
        <div className="quiz-item">
            <div className="item-body">
                <div>{props.title}</div>
                <div>{props.date}</div>
                <div>{props.userName}</div>
            </div>
            <Link href={buttonConfig.url} className={`link-btn ${props.mode === 'play' ? 'play-btn' : 'edit-btn'}`}>
                {buttonConfig.text}
            </Link>
        </div>
    );
}