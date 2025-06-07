import AnswerRepository from "@/app/api/repositories/AnswerRepository";
import QuestionRepository from "@/app/api/repositories/QuestionRepository";
import QuizzRepository from "@/app/api/repositories/QuizzRepository";
import executeQuery from "./executeQuery";

// URLs des quiz à importer
const QUIZ_URLS = [
  'https://download.openquizzdb.org/2105543472/OpenQuizzDB_105/openquizzdb_105.json',
  'https://download.openquizzdb.org/1014647227/OpenQuizzDB_014/openquizzdb_14.json',
  'https://download.openquizzdb.org/4312964876/OpenQuizzDB_312/openquizzdb_312.json'
];

//  Vérif si quiz génériques existent déjà
async function checkGenericQuizzesExist(): Promise<boolean> {
  try {
    console.log("🔍 Vérification des quiz génériques...");
    
    const quizzRepo = new QuizzRepository();
    const genericQuizzes = await quizzRepo.getQuizzesWhereIdUserIsNull();
    
    console.log(`📊 Quiz génériques trouvés: ${genericQuizzes.length}`);
    return genericQuizzes.length > 0;
    
  } catch (error) {
    console.error("❌ Erreur vérification:", error);
    return false;
  }
}

//  Récupérer les données de tous les quiz
async function fetchAllQuizzData(): Promise<any[]> {
  try {
    console.log("📥 Téléchargement des quiz...");
    
    const allData = [];
    
    for (const url of QUIZ_URLS) {
      console.log(`📥 Récupération: ${url}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        console.warn(`⚠️ Erreur URL ${url}: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      allData.push(data);
      console.log(`✅ Quiz récupéré: ${data['catégorie-nom-slogan']?.fr?.nom || 'Inconnu'}`);
    }
    
    console.log(`📦 Total quiz récupérés: ${allData.length}`);
    return allData;
    
  } catch (error) {
    console.error("❌ Erreur téléchargement:", error);
    return [];
  }
}

//  Parser un quiz (débutant fr uniquement)
function parseQuizData(jsonData: any) {
  try {
    const quizInfo = jsonData['catégorie-nom-slogan']?.fr;
    if (!quizInfo) return null;
    
    const beginnerQuestions = jsonData.quizz?.fr?.débutant;
    if (!beginnerQuestions) return null;
    
    // Transformer les questions en array
    const questionsArray = Object.entries(beginnerQuestions).map(([key, question]: [string, any]) => ({
      id: parseInt(key),
      content: question.question,
      correctAnswer: question.réponse,
      propositions: Object.values(question.propositions),
      explanation: question.anecdote
    }));
    
    return {
      title: quizInfo.nom,
      description: quizInfo.slogan || 'Quiz générique',
      category: quizInfo.catégorie,
      questions: questionsArray
    };
    
  } catch (error) {
    console.error("❌ Erreur parsing:", error);
    return null;
  }
}

// 4. Sauvegarder un quiz complet en BDD
async function saveGenericQuiz(quizData: any): Promise<boolean> {
  try {
    const quizzRepo = new QuizzRepository();
    const questionRepo = new QuestionRepository();
    const answerRepo = new AnswerRepository();
    
    // Créer le quiz principal (id_user = NULL)
    console.log(`📝 Création du quiz: ${quizData.title}`);
    
    const quizPayload = {
      id_user: null, 
      id_departement: null,
      title: quizData.title.substring(0, 40), // Limite BDD
      description: quizData.description.substring(0, 155), // Limite BDD
      nbr_question: quizData.questions.length,
      is_active: 1,
      image_url: '/default-quiz.png'
    };
    
    const quizResult = await executeQuery("INSERT INTO kt_quizzes SET ?", [quizPayload]);
    const quizId = quizResult.insertId;
    
    if (!quizId) {
      throw new Error("Impossible de récupérer l'ID du quiz créé");
    }
    
    console.log(`✅ Quiz créé avec l'ID: ${quizId}`);
    
    // Créer les questions et réponses
    for (let i = 0; i < quizData.questions.length; i++) {
      const questionData = quizData.questions[i];
      
      // Créer la question
      const questionPayload = {
        id_quizz: quizId,
        order_index: i + 1,
        is_dialog: false,
        content: questionData.content,
        image_url: '/default-question.png'
      };
      
      const questionResult = await executeQuery("INSERT INTO kt_questions SET ?", [questionPayload]);
      const questionId = questionResult.insertId;
      
      console.log(`✅ Question ${i + 1} créée avec l'ID: ${questionId}`);
      
      // Créer les réponses pour cette question
      for (const proposition of questionData.propositions) {
        const answerPayload = {
          id_quizz: quizId,
          id_question: questionId,
          content: proposition,
          explication: questionData.explanation,
          is_correct: proposition === questionData.correctAnswer ? 1 : 0  // boolean → int
        };
        
        await executeQuery("INSERT INTO kt_answers SET ?", [answerPayload]);
      }
      
      console.log(`✅ ${questionData.propositions.length} réponses créées pour la question ${i + 1}`);
    }
    
    return true;
    
  } catch (error) {
    console.error(`❌ Erreur sauvegarde quiz ${quizData.title}:`, error);
    return false;
  }
}

// Fonction principale
export async function initGenericQuizzes(): Promise<void> {
  try {
    console.log("🚀 Initialisation des quiz génériques...");
    
    //  Vérifier si déjà fait
    const alreadyExists = await checkGenericQuizzesExist();
    if (alreadyExists) {
      console.log("ℹ️ Quiz génériques déjà présents - Arrêt du script");
      return;
    }
    
    //  Télécharger les données
    const allQuizzData = await fetchAllQuizzData();
    if (allQuizzData.length === 0) {
      console.log("❌ Aucun quiz téléchargé - Arrêt du script");
      return;
    }
    
    // Parser et sauvegarder chaque quiz
    let successCount = 0;
    
    for (const jsonData of allQuizzData) {
      const parsedQuiz = parseQuizData(jsonData);
      
      if (!parsedQuiz) {
        console.warn("⚠️ Quiz ignoré (parsing échoué)");
        continue;
      }
      
      const saved = await saveGenericQuiz(parsedQuiz);
      if (saved) {
        successCount++;
      }
    }
    
    console.log(`🎉 Initialisation terminée: ${successCount}/${allQuizzData.length} quiz sauvegardés`);
    
  } catch (error) {
    console.error("❌ Erreur initialisation:", error);
  }
}