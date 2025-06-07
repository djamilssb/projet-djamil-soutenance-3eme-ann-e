import { Metadata } from "next";
import React from "react";
import QuizEdit from "./quizEdit";
import ReturnNavbar from "@/app/components/ReturnNavbar";
import QueryClientProvider from "@/app/components/QueryClientProvider";

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
                <ReturnNavbar />
                <section className="black-wrap flex levitate">
                    <QueryClientProvider>
                        <QuizEdit />
                    </QueryClientProvider>
                </section>
            </div>
        </>
    );
}