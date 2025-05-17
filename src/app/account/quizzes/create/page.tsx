import { Metadata } from "next";
import React from "react";
import QuizForm from '../../../components/quizzes/QuizForm';

// SPECIFICS METADATA FOR THE PAGE
export const metadata: Metadata = {
    title: "Créer un quiz",
    description: "Création d'un quiz",
}

export default function QuizCreate(): React.JSX.Element {
  return (
    <>
        {/* <div className="page-bg"></div> */}
        <div className="page-wrap">
            <section className="black-wrap flex levitate">
                <QuizForm data={null} />
            </section>
        </div>
    </>
  );
}