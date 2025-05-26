// Types pour les données mock
export type MockQuiz = {
  id: number;
  title: string;
  description: string;
  avatarImage: string;
  backgroundImage: string;
  questionCount: number; // Nombre de questions dans le quiz
};

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

// Un seul quiz avec 15 questions
export const mockQuizzes: MockQuiz[] = [
  {
    id: 1,
    title: "Quiz sur la France",
    description: "Testez vos connaissances sur la France",
    avatarImage: "/alien1.png",
    backgroundImage: "/paris.png",
    questionCount: 15 // Quiz avec 15 questions
  }
];

// 15 Questions pour le quiz
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
  { id: 10, idQuizz: 1, orderIndex: 10, content: "Quel fleuve traverse Paris?" },
  { id: 11, idQuizz: 1, orderIndex: 11, content: "Quelle est la spécialité culinaire de la Bretagne?" },
  { id: 12, idQuizz: 1, orderIndex: 12, content: "Combien de pays partagent une frontière avec la France?" },
  { id: 13, idQuizz: 1, orderIndex: 13, content: "Quel roi de France était connu sous le nom de 'Roi Soleil'?" },
  { id: 14, idQuizz: 1, orderIndex: 14, content: "Dans quelle ville française se trouve le plus ancien festival de cinéma?" },
  { id: 15, idQuizz: 1, orderIndex: 15, content: "Quel est le plat traditionnel de la ville de Marseille?" }
];

// Réponses pour les 15 questions
export const mockAnswers = [
  // Question 1
  [
    { id: 1, idQuestion: 1, content: "Lyon", isCorrect: false, explication: "Lyon est la 3ème plus grande ville de France" },
    { id: 2, idQuestion: 1, content: "Paris", isCorrect: true, explication: "Paris est bien la capitale de la France" },
    { id: 3, idQuestion: 1, content: "Marseille", isCorrect: false, explication: "Marseille est la 2ème plus grande ville de France" },
    { id: 4, idQuestion: 1, content: "Lille", isCorrect: false, explication: "Lille est une grande ville du nord de la France" }
  ],
  // Question 2
  [
    { id: 5, idQuestion: 2, content: "95", isCorrect: false, explication: "Il y a plus de départements que cela" },
    { id: 6, idQuestion: 2, content: "101", isCorrect: true, explication: "La France compte 101 départements (96 métropolitains et 5 d'outre-mer)" },
    { id: 7, idQuestion: 2, content: "96", isCorrect: false, explication: "96 est seulement le nombre de départements métropolitains" },
    { id: 8, idQuestion: 2, content: "87", isCorrect: false, explication: "C'est moins que le nombre réel de départements" }
  ],
  // Question 3
  [
    { id: 9, idQuestion: 3, content: "La Seine", isCorrect: false, explication: "La Seine n'est pas le plus long fleuve de France" },
    { id: 10, idQuestion: 3, content: "La Loire", isCorrect: true, explication: "La Loire est bien le plus long fleuve de France avec 1006 km" },
    { id: 11, idQuestion: 3, content: "Le Rhône", isCorrect: false, explication: "Le Rhône est le deuxième plus long fleuve de France" },
    { id: 12, idQuestion: 3, content: "La Garonne", isCorrect: false, explication: "La Garonne est plus courte que la Loire" }
  ],
  // Question 4
  [
    { id: 13, idQuestion: 4, content: "Le Mont Ventoux", isCorrect: false, explication: "Le Mont Ventoux culmine à 1910 mètres" },
    { id: 14, idQuestion: 4, content: "Le Mont Blanc", isCorrect: true, explication: "Le Mont Blanc est bien la plus haute montagne de France avec 4809 mètres" },
    { id: 15, idQuestion: 4, content: "Le Puy de Sancy", isCorrect: false, explication: "Le Puy de Sancy est le point culminant du Massif Central" },
    { id: 16, idQuestion: 4, content: "Le Pic du Midi", isCorrect: false, explication: "Le Pic du Midi de Bigorre culmine à 2876 mètres" }
  ],
  // Question 5
  [
    { id: 17, idQuestion: 5, content: "La Mer du Nord", isCorrect: false, explication: "La Mer du Nord borde le nord de la France" },
    { id: 18, idQuestion: 5, content: "La Mer Méditerranée", isCorrect: true, explication: "La Côte d'Azur est bien bordée par la Mer Méditerranée" },
    { id: 19, idQuestion: 5, content: "L'Océan Atlantique", isCorrect: false, explication: "L'Océan Atlantique borde l'ouest de la France" },
    { id: 20, idQuestion: 5, content: "La Manche", isCorrect: false, explication: "La Manche sépare la France de l'Angleterre" }
  ],
  // Question 6
  [
    { id: 21, idQuestion: 6, content: "Lyon", isCorrect: false, explication: "Lyon est le département 69 (Rhône)" },
    { id: 22, idQuestion: 6, content: "Paris", isCorrect: true, explication: "Paris est bien le département numéro 75" },
    { id: 23, idQuestion: 6, content: "Marseille", isCorrect: false, explication: "Marseille est le département 13 (Bouches-du-Rhône)" },
    { id: 24, idQuestion: 6, content: "Lille", isCorrect: false, explication: "Lille est le département 59 (Nord)" }
  ],
  // Question 7
  [
    { id: 25, idQuestion: 7, content: "1789", isCorrect: false, explication: "1789 est l'année de la Révolution française" },
    { id: 26, idQuestion: 7, content: "1889", isCorrect: true, explication: "La Tour Eiffel a été construite pour l'Exposition universelle de 1889" },
    { id: 27, idQuestion: 7, content: "1900", isCorrect: false, explication: "En 1900, la Tour Eiffel existait déjà depuis 11 ans" },
    { id: 28, idQuestion: 7, content: "1830", isCorrect: false, explication: "En 1830, Gustave Eiffel n'avait que 8 ans" }
  ],
  // Question 8
  [
    { id: 29, idQuestion: 8, content: "Lutetia", isCorrect: true, explication: "Paris s'appelait bien Lutèce (Lutetia) dans l'antiquité" },
    { id: 30, idQuestion: 8, content: "Massilia", isCorrect: false, explication: "Massilia était le nom antique de Marseille" },
    { id: 31, idQuestion: 8, content: "Lugdunum", isCorrect: false, explication: "Lugdunum était le nom antique de Lyon" },
    { id: 32, idQuestion: 8, content: "Burdigala", isCorrect: false, explication: "Burdigala était le nom antique de Bordeaux" }
  ],
  // Question 9
  [
    { id: 33, idQuestion: 9, content: "La Bretagne", isCorrect: false, explication: "La Bretagne est plus connue pour ses crêpes que pour ses vins" },
    { id: 34, idQuestion: 9, content: "La Bourgogne", isCorrect: true, explication: "La Bourgogne est célèbre pour ses vignobles prestigieux" },
    { id: 35, idQuestion: 9, content: "La Normandie", isCorrect: false, explication: "La Normandie est plus connue pour son cidre que pour ses vins" },
    { id: 36, idQuestion: 9, content: "La Picardie", isCorrect: false, explication: "La Picardie n'est pas une région viticole majeure" }
  ],
  // Question 10
  [
    { id: 37, idQuestion: 10, content: "Le Rhône", isCorrect: false, explication: "Le Rhône traverse Lyon, pas Paris" },
    { id: 38, idQuestion: 10, content: "La Seine", isCorrect: true, explication: "La Seine traverse bien Paris" },
    { id: 39, idQuestion: 10, content: "La Loire", isCorrect: false, explication: "La Loire passe plus au sud de Paris" },
    { id: 40, idQuestion: 10, content: "La Garonne", isCorrect: false, explication: "La Garonne traverse Toulouse et Bordeaux" }
  ],
  // Question 11
  [
    { id: 41, idQuestion: 11, content: "La quiche lorraine", isCorrect: false, explication: "La quiche lorraine est une spécialité de l'est de la France" },
    { id: 42, idQuestion: 11, content: "La crêpe", isCorrect: true, explication: "La crêpe est bien la spécialité culinaire emblématique de la Bretagne" },
    { id: 43, idQuestion: 11, content: "Le cassoulet", isCorrect: false, explication: "Le cassoulet est une spécialité du sud-ouest de la France" },
    { id: 44, idQuestion: 11, content: "La bouillabaisse", isCorrect: false, explication: "La bouillabaisse est une spécialité de Marseille" }
  ],
  // Question 12
  [
    { id: 45, idQuestion: 12, content: "5", isCorrect: false, explication: "La France partage ses frontières avec plus de pays" },
    { id: 46, idQuestion: 12, content: "8", isCorrect: true, explication: "La France partage ses frontières avec 8 pays: Allemagne, Belgique, Luxembourg, Suisse, Italie, Monaco, Espagne et Andorre" },
    { id: 47, idQuestion: 12, content: "6", isCorrect: false, explication: "La France partage ses frontières avec plus de 6 pays" },
    { id: 48, idQuestion: 12, content: "10", isCorrect: false, explication: "La France ne partage pas ses frontières avec autant de pays" }
  ],
  // Question 13
  [
    { id: 49, idQuestion: 13, content: "Louis XV", isCorrect: false, explication: "Louis XV était le successeur de Louis XIV" },
    { id: 50, idQuestion: 13, content: "Louis XIV", isCorrect: true, explication: "Louis XIV était bien surnommé le 'Roi Soleil'" },
    { id: 51, idQuestion: 13, content: "Napoléon", isCorrect: false, explication: "Napoléon était empereur, pas roi, et n'était pas surnommé le 'Roi Soleil'" },
    { id: 52, idQuestion: 13, content: "Louis XVI", isCorrect: false, explication: "Louis XVI était le petit-fils de Louis XV" }
  ],
  // Question 14
  [
    { id: 53, idQuestion: 14, content: "Lyon", isCorrect: false, explication: "Lyon accueille le Festival Lumière, mais ce n'est pas le plus ancien" },
    { id: 54, idQuestion: 14, content: "Cannes", isCorrect: true, explication: "Le Festival de Cannes, créé en 1946, est le plus ancien festival de cinéma français" },
    { id: 55, idQuestion: 14, content: "Paris", isCorrect: false, explication: "Paris accueille de nombreux festivals mais pas le plus ancien" },
    { id: 56, idQuestion: 14, content: "Deauville", isCorrect: false, explication: "Le Festival du cinéma américain de Deauville a été créé en 1975" }
  ],
  // Question 15
  [
    { id: 57, idQuestion: 15, content: "La ratatouille", isCorrect: false, explication: "La ratatouille est un plat provençal, mais pas spécifique à Marseille" },
    { id: 58, idQuestion: 15, content: "La bouillabaisse", isCorrect: true, explication: "La bouillabaisse est la spécialité culinaire traditionnelle de Marseille" },
    { id: 59, idQuestion: 15, content: "La tapenade", isCorrect: false, explication: "La tapenade est une spécialité provençale, mais pas spécifique à Marseille" },
    { id: 60, idQuestion: 15, content: "Le cassoulet", isCorrect: false, explication: "Le cassoulet est une spécialité de Toulouse et du sud-ouest" }
  ]
];