import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import QuizList from '../../components/quizzes/QuizList';

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
            <section className="black-wrap flex levitate">
                <QuizList />
            </section>
        </div>
    </>
  );
}