export const mockQuestions = [
  { id: 1, idQuizz: 1, orderIndex: 1, content: "Quelle est la capitale de la France?" },
  { id: 2, idQuizz: 1, orderIndex: 2, content: "Combien de départements compte la France?" },
  { id: 3, idQuizz: 1, orderIndex: 3, content: "Quel est le plus long fleuve de France?" },
  { id: 4, idQuizz: 1, orderIndex: 4, content: "Quelle est la plus haute montagne de France?" },
  { id: 5, idQuizz: 1, orderIndex: 5, content: "Quelle mer borde la Côte d'Azur?" },
  { id: 6, idQuizz: 1, orderIndex: 6, content: "Quel département a pour numéro 75?" },
  { id: 7, idQuizz: 1, orderIndex: 7, content: "En quelle année la Tour Eiffel a-t-elle été construite?" },
  { id: 8, idQuizz: 1, orderIndex: 8, content: "Quel était le nom de Paris dans l'antiquité?" },
  { id: 9, idQuizz: 1, orderIndex: 9, content: "Quelle région est connue pour ses vignobles?" },
  { id: 10, idQuizz: 1, orderIndex: 10, content: "Quel fleuve traverse Paris?" }
];

export const mockAnswers = [
  [
    { id: 1, idQuestion: 1, content: "Lyon", isCorrect: false, explication: "Lyon est la 3ème plus grande ville de France" },
    { id: 2, idQuestion: 1, content: "Paris", isCorrect: true, explication: "Paris est bien la capitale de la France" },
    { id: 3, idQuestion: 1, content: "Marseille", isCorrect: false, explication: "Marseille est la 2ème plus grande ville de France" },
    { id: 4, idQuestion: 1, content: "Lille", isCorrect: false, explication: "Lille est une grande ville du nord de la France" }
  ],
  [
    { id: 5, idQuestion: 2, content: "95", isCorrect: false, explication: "Il y a plus de départements que cela" },
    { id: 6, idQuestion: 2, content: "101", isCorrect: true, explication: "La France compte 101 départements" },
    { id: 7, idQuestion: 2, content: "96", isCorrect: false, explication: "Pas tout à fait" },
    { id: 8, idQuestion: 2, content: "87", isCorrect: false, explication: "C'est plus que ça" }
  ],
  // Ajoutez des données fictives pour les autres questions si nécessaire
];

// Types pour faciliter l'utilisation des données de test
export type MockQuestion = {
  id: number;
  idQuizz: number;
  orderIndex: number;
  content: string;
};

export type MockAnswer = {
  id: number;
  idQuestion: number;
  content: string;
  isCorrect: boolean;
  explication: string;
};