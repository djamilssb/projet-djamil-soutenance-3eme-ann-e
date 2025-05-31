import AnswerRepository from "@/app/api/repositories/AnswerRepository";
import QuestionRepository from "@/app/api/repositories/QuestionRepository";
import QuizzRepository from "@/app/api/repositories/QuizzRepository";
import executeQuery from "./executeQuery";

// Configuration centralisée (plus facile à modifier)
const CONFIG = {
  QUIZ_URLS: [
    'https://download.openquizzdb.org/2105543472/OpenQuizzDB_105/openquizzdb_105.json',
    'https://download.openquizzdb.org/1014647227/OpenQuizzDB_014/openquizzdb_14.json',
    'https://download.openquizzdb.org/4312964876/OpenQuizzDB_312/openquizzdb_312.json'
  ],
  LIMITS: {
    title: 40,
    description: 155
  }
};

// Types pour être plus précis (aide VS Code à nous aider)
interface QuizQuestion {
  id: number;
  content: string;
  correctAnswer: string;
  propositions: string[];
  explanation: string;
}

interface ParsedQuiz {
  title: string;
  description: string;
  category: string;
  questions: QuizQuestion[];
}

// 1. Vérification optimisée (une seule requête SQL)
async function checkGenericQuizzesExist(): Promise<boolean> {
  try {
    console.log("🔍 Vérification des quiz génériques...");
    
    // ✅ OPTIMISATION : Une seule requête SQL au lieu d'utiliser le repository
    const result = await executeQuery<{ count: number }>(
      "SELECT COUNT(*) as count FROM kt_quizzes WHERE id_user IS NULL"
    );
    
    const count = Array.isArray(result) ? result[0]?.count : result?.count;
    console.log(`📊 Quiz génériques trouvés: ${count}`);
    
    return count > 0;
    
  } catch (error) {
    console.error("❌ Erreur vérification:", error);
    return true; // En cas d'erreur, on évite de recréer
  }
}

// 2. Téléchargement optimisé (parallèle au lieu de séquentiel)
async function fetchAllQuizzData(): Promise<any[]> {
  try {
    console.log("📥 Téléchargement des quiz en parallèle...");
    
    // ✅ OPTIMISATION : Téléchargement parallèle au lieu de boucle séquentielle
    const fetchPromises = CONFIG.QUIZ_URLS.map(async (url) => {
      try {
        console.log(`📥 Récupération: ${url}`);
        const response = await fetch(url);
        
        if (!response.ok) {
          console.warn(`⚠️ Erreur URL ${url}: ${response.status}`);
          return null;
        }
        
        const data = await response.json();
        console.log(`✅ Quiz récupéré: ${data['catégorie-nom-slogan']?.fr?.nom || 'Inconnu'}`);
        return data;
        
      } catch (error) {
        console.warn(`⚠️ Erreur pour ${url}:`, error);
        return null;
      }
    });
    
    // Attendre tous les téléchargements en parallèle
    const results = await Promise.all(fetchPromises);
    
    // Filtrer les résultats null
    const validData = results.filter(data => data !== null);
    
    console.log(`📦 Total quiz récupérés: ${validData.length}/${CONFIG.QUIZ_URLS.length}`);
    return validData;
    
  } catch (error) {
    console.error("❌ Erreur téléchargement:", error);
    return [];
  }
}

// 3. Parser avec validation (plus robuste)
function parseQuizData(jsonData: any): ParsedQuiz | null {
  try {
    // ✅ OPTIMISATION : Validation stricte des données
    const quizInfo = jsonData?.['catégorie-nom-slogan']?.fr;
    const beginnerQuestions = jsonData?.quizz?.fr?.débutant;
    
    if (!quizInfo?.nom || !beginnerQuestions) {
      console.warn("⚠️ Structure de données invalide");
      return null;
    }
    
    // Transformer et valider les questions
    const questionsArray: QuizQuestion[] = [];
    
    for (const [key, question] of Object.entries(beginnerQuestions)) {
      const q = question as any;
      
      // Validation de chaque question
      if (!q?.question || !q?.réponse || !q?.propositions) {
        console.warn(`⚠️ Question ${key} invalide - ignorée`);
        continue;
      }
      
      questionsArray.push({
        id: parseInt(key),
        content: q.question.trim(),
        correctAnswer: q.réponse.trim(),
        propositions: Object.values(q.propositions).map((p: any) => String(p).trim()),
        explanation: q.anecdote?.trim() || 'Pas d\'explication disponible'
      });
    }
    
    if (questionsArray.length === 0) {
      console.warn("⚠️ Aucune question valide trouvée");
      return null;
    }
    
    return {
      title: quizInfo.nom.trim(),
      description: (quizInfo.slogan || 'Quiz générique').trim(),
      category: quizInfo.catégorie?.trim() || 'Général',
      questions: questionsArray
    };
    
  } catch (error) {
    console.error("❌ Erreur parsing:", error);
    return null;
  }
}

// 4. Sauvegarde optimisée avec transaction
async function saveGenericQuiz(quizData: ParsedQuiz): Promise<boolean> {
  try {
    console.log(`📝 Création du quiz: ${quizData.title}`);
    
    // ✅ OPTIMISATION : Transaction pour éviter les données corrompues
    await executeQuery("START TRANSACTION");
    
    try {
      // 1. Créer le quiz principal
      const quizPayload = {
        id_user: null,
        id_departement: null,
        title: quizData.title.substring(0, CONFIG.LIMITS.title),
        description: quizData.description.substring(0, CONFIG.LIMITS.description),
        nbr_question: quizData.questions.length,
        is_active: 1,
        image_url: '/default-quiz.png'
      };
      
      const quizResult = await executeQuery("INSERT INTO kt_quizzes SET ?", [quizPayload]);
      const quizId = quizResult.insertId;
      
      if (!quizId) {
        throw new Error("ID quiz non récupéré");
      }
      
      console.log(`✅ Quiz créé (ID: ${quizId})`);
      
      // 2. ✅ OPTIMISATION : Préparer toutes les questions en une fois
      const questionInserts = quizData.questions.map((questionData, index) => [
        quizId,
        index + 1, // order_index
        false, // is_dialog
        questionData.content,
        '/default-question.png'
      ]);
      
      // Insérer toutes les questions d'un coup
      const questionResult = await executeQuery(
        "INSERT INTO kt_questions (id_quizz, order_index, is_dialog, content, image_url) VALUES ?",
        [questionInserts]
      );
      
      // Récupérer les IDs des questions créées
      const firstQuestionId = questionResult.insertId;
      
      // 3. ✅ OPTIMISATION : Préparer toutes les réponses en une fois
      const answerInserts: any[] = [];
      
      quizData.questions.forEach((questionData, questionIndex) => {
        const questionId = firstQuestionId + questionIndex;
        
        questionData.propositions.forEach((proposition) => {
          answerInserts.push([
            quizId,
            questionId,
            proposition,
            questionData.explanation,
            proposition === questionData.correctAnswer ? 1 : 0
          ]);
        });
      });
      
      // Insérer toutes les réponses d'un coup
      await executeQuery(
        "INSERT INTO kt_answers (id_quizz, id_question, content, explication, is_correct) VALUES ?",
        [answerInserts]
      );
      
      // ✅ OPTIMISATION : Valider la transaction
      await executeQuery("COMMIT");
      
      console.log(`✅ Quiz "${quizData.title}" sauvegardé avec ${quizData.questions.length} questions`);
      return true;
      
    } catch (error) {
      // ✅ OPTIMISATION : Annuler en cas d'erreur
      await executeQuery("ROLLBACK");
      throw error;
    }
    
  } catch (error) {
    console.error(`❌ Erreur sauvegarde "${quizData.title}":`, error);
    return false;
  }
}

// 5. Fonction principale avec statistiques
export async function initGenericQuizzes(): Promise<void> {
  const startTime = Date.now();
  
  try {
    console.log("🚀 Initialisation des quiz génériques...");
    
    // 1. Vérification rapide
    if (await checkGenericQuizzesExist()) {
      console.log("ℹ️ Quiz génériques déjà présents - Arrêt du script");
      return;
    }
    
    // 2. ✅ OPTIMISATION : Téléchargement parallèle des données
    const allQuizzData = await fetchAllQuizzData();
    
    if (allQuizzData.length === 0) {
      console.log("❌ Aucun quiz téléchargé - Arrêt du script");
      return;
    }
    
    // 3. Traitement avec statistiques
    let successCount = 0;
    let totalQuestions = 0;
    
    for (const [index, jsonData] of allQuizzData.entries()) {
      console.log(`📊 Traitement quiz ${index + 1}/${allQuizzData.length}`);
      
      const parsedQuiz = parseQuizData(jsonData);
      
      if (!parsedQuiz) {
        console.warn(`⚠️ Quiz ${index + 1} ignoré (parsing échoué)`);
        continue;
      }
      
      if (await saveGenericQuiz(parsedQuiz)) {
        successCount++;
        totalQuestions += parsedQuiz.questions.length;
      }
    }
    
    // 4. ✅ OPTIMISATION : Statistiques détaillées
    const duration = Date.now() - startTime;
    console.log(`🎉 Initialisation terminée en ${duration}ms:`);
    console.log(`  ✅ ${successCount}/${allQuizzData.length} quiz sauvegardés`);
    console.log(`  ✅ ${totalQuestions} questions créées au total`);
    
  } catch (error) {
    console.error("❌ Erreur initialisation:", error);
  }
}