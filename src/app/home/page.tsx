import { Metadata } from "next";
import React from "react";

// SPECIFICS METADATA FOR THE PAGE
export const metadata: Metadata = {
    title: "Home",
    description: "Welcome to the home page!",
}

export default function Home(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <p className="mt-4 text-lg">This is a simple Next.js application.</p>
    </main>
  );
}