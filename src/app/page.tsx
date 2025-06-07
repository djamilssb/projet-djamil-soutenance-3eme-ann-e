import { redirect } from "next/navigation";
import { initGenericQuizzes } from "../utils/initGenericQuizzes";

export default async function app() {
  // Initialiser les quiz génériques au démarrage
  await initGenericQuizzes();
  
  redirect("/accueil");
}