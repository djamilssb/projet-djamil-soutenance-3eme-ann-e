import Link from "next/link";

interface QuizListItemProps {
    title: string;
    date: string;
    userName: string;
}

export default function QuizListItem(props: QuizListItemProps): React.JSX.Element {
    return (
        <div className="quiz-item">
            <div className="item-body">
                <div>{props.title}</div>
                <div>{props.date}</div>
                <div>{props.userName}</div>
            </div>
            <Link href="/" className="link-btn">Modifier</Link>
        </div>
    );
}