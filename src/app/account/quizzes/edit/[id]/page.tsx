import { Metadata } from "next";
import React from "react";
import QuizEdit from "./quizEdit";

// SPECIFICS METADATA FOR THE PAGE
export const metadata: Metadata = {
    title: "Modify quiz",
    description: "Welcome to the modify quiz page!",
}

export default function QuizEditPage(): React.JSX.Element {
    return (
        <>
            {/* <div className="page-bg"></div> */}
            <div className="page-wrap">
                <section className="black-wrap flex levitate">
                    <QuizEdit />
                </section>
            </div>
        </>
    );
}