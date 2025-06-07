import { Metadata } from "next";
import React from "react";
import QuizList from '../../components/quizzes/QuizList';
import ReturnNavbar from "@/app/components/ReturnNavbar";

// SPECIFICS METADATA FOR THE PAGE
export const metadata: Metadata = {
    title: "My quizzes",
    description: "Welcome to the my quizzes page!",
}

export default function Quizzes(): React.JSX.Element {
  return (
    <>
        {/* <div className="page-bg"></div> */}
        <div className="page-wrap">
            <ReturnNavbar />
            <section className="black-wrap flex levitate">
                <QuizList />
            </section>
        </div>
    </>
  );
}