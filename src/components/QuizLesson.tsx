import { useState } from 'react'
import { CheckCircle2, XCircle, HelpCircle, Trophy, RotateCcw, ArrowRight, Award } from 'lucide-react'

interface Question {
  id: number
  question: string
  context: string
  options: string[]
  correctIndex: number
  explanation: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: '¿Qué significa la frase "I declare before you all that my whole life shall be devoted to your service"?',
    context: 'Frase del discurso de la Reina Elizabeth en 1947.',
    options: [
      'Declaro ante todos que mi vida entera estará dedicada a su servicio.',
      'Prometo que gobernaré el reino por un período limitado de tiempo.',
      'Anuncio que mi familia se retirará del servicio público.',
      'Sugeriré cambios en las leyes del país inmediatamente.'
    ],
    correctIndex: 0,
    explanation: 'La palabra "devoted" significa dedicada o devota, y "shall be" expresa un compromiso o promesa solemne a futuro en inglés formal.',
  },
  {
    id: 2,
    question: 'En la frase "better days will return", ¿cuál es la intención gramatical de "will"?',
    context: 'Mensaje transmitido durante un período de incertidumbre nacional.',
    options: [
      'Expresar una duda sobre el futuro.',
      'Expresar una certeza o promesa optimista sobre el futuro.',
      'Indicar una acción pasada obligatoria.',
      'Hacer una pregunta formal al público.'
    ],
    correctIndex: 1,
    explanation: '"Will" se utiliza para proyectar certeza y esperanza en el futuro ("días mejores volverán").',
  },
  {
    id: 3,
    question: '¿Qué palabra se utiliza como sinónimo formal de "soportar o resistir" en el discurso de la Reina?',
    context: 'Texto: "while we may have more still to endure..."',
    options: ['Endure', 'Devote', 'Remain', 'Comfort'],
    correctIndex: 0,
    explanation: '"Endure" significa soportar, aguantar o resistir situaciones difíciles con firmeza.',
  },
]

export function QuizLesson() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return
    setSelectedOption(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return
    setIsSubmitted(true)
    if (selectedOption === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsSubmitted(false)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsSubmitted(false)
    setScore(0)
    setIsCompleted(false)
  }

  if (isCompleted) {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md text-center space-y-5">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800">¡Cuestionario Completado!</h3>
          <p className="text-sm text-slate-500 mt-1">Has demostrado tus conocimientos sobre la lección.</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex justify-around items-center">
          <div>
            <p className="text-xs text-slate-500 font-medium">Respuestas Correctas</p>
            <p className="text-2xl font-bold text-indigo-600">{score} / {quizQuestions.length}</p>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <p className="text-xs text-slate-500 font-medium">Puntuación</p>
            <p className="text-2xl font-bold text-emerald-600">{percentage}%</p>
          </div>
        </div>

        <button
          onClick={handleRestartQuiz}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" /> Intentar de Nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Quiz Progress & Header */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5 text-indigo-700">
            <HelpCircle className="w-4 h-4 text-indigo-600" /> Pregunta {currentQuestionIndex + 1} de {quizQuestions.length}
          </span>
          <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-mono">
            Puntos: {score}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Contexto</span>
          <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100 mt-1">
            "{currentQuestion.context}"
          </p>
        </div>

        <h3 className="font-bold text-slate-800 text-base sm:text-lg leading-snug">
          {currentQuestion.question}
        </h3>

        {/* Options List */}
        <div className="space-y-2.5 pt-2">
          {currentQuestion.options.map((option, idx) => {
            let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80'

            if (selectedOption === idx) {
              optionStyle = 'bg-indigo-50 border-indigo-500 text-indigo-950 font-medium ring-2 ring-indigo-200'
            }

            if (isSubmitted) {
              if (idx === currentQuestion.correctIndex) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-200'
              } else if (selectedOption === idx && idx !== currentQuestion.correctIndex) {
                optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200'
              }
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${optionStyle}`}
              >
                <span className="w-6 h-6 rounded-full bg-white border border-current flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-snug">{option}</span>
                {isSubmitted && idx === currentQuestion.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isSubmitted && selectedOption === idx && idx !== currentQuestion.correctIndex && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback Section when Submitted */}
        {isSubmitted && (
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 animate-fadeIn ${
              selectedOption === currentQuestion.correctIndex
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {selectedOption === currentQuestion.correctIndex ? (
                <>
                  <Award className="w-4 h-4 text-emerald-600" /> ¡Respuesta Correcta!
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" /> Respuesta Incorrecta
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed opacity-90">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {!isSubmitted ? (
            <button
              disabled={selectedOption === null}
              onClick={handleSubmitAnswer}
              className={`w-full font-semibold py-3 rounded-xl transition-all shadow-sm ${
                selectedOption !== null
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Comprobar Respuesta
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <span>{currentQuestionIndex + 1 < quizQuestions.length ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
