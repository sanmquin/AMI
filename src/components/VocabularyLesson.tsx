import { useState } from 'react'
import { Volume2, RotateCw, CheckCircle2, ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react'

interface VocabWord {
  id: number
  english: string
  phonetic: string
  spanish: string
  partOfSpeech: string
  exampleEnglish: string
  exampleSpanish: string
}

const vocabList: VocabWord[] = [
  {
    id: 1,
    english: 'Devoted',
    phonetic: '/dɪˈvoʊ.tɪd/',
    spanish: 'Dedicado / Devoto',
    partOfSpeech: 'adjetivo',
    exampleEnglish: 'My whole life shall be devoted to your service.',
    exampleSpanish: 'Toda mi vida estará dedicada a su servicio.',
  },
  {
    id: 2,
    english: 'Endure',
    phonetic: '/ɪnˈdʊr/',
    spanish: 'Soportar / Perdurar',
    partOfSpeech: 'verbo',
    exampleEnglish: 'We may have more still to endure.',
    exampleSpanish: 'Es posible que aún tengamos más por soportar.',
  },
  {
    id: 3,
    english: 'Comfort',
    phonetic: '/ˈkʌm.fɚt/',
    spanish: 'Consuelo / Reconfortar',
    partOfSpeech: 'sustantivo / verbo',
    exampleEnglish: 'We should take comfort in better days ahead.',
    exampleSpanish: 'Debemos reconfortarnos en los mejores días por venir.',
  },
  {
    id: 4,
    english: 'Sovereign',
    phonetic: '/ˈsɑː.vɚ.ɪn/',
    spanish: 'Soberano / Monarca',
    partOfSpeech: 'sustantivo',
    exampleEnglish: 'The sovereign spoke to the nation with dignity.',
    exampleSpanish: 'La soberana habló a la nación con dignidad.',
  },
]

export function VocabularyLesson() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [learnedIds, setLearnedIds] = useState<number[]>([])
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const currentWord = vocabList[currentIndex]
  const isLearned = learnedIds.includes(currentWord.id)

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % vocabList.length)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + vocabList.length) % vocabList.length)
  }

  const toggleLearned = () => {
    setLearnedIds((prev) =>
      prev.includes(currentWord.id)
        ? prev.filter((id) => id !== currentWord.id)
        : [...prev, currentWord.id]
    )
  }

  const playAudioSimulation = () => {
    setIsPlayingAudio(true)
    setTimeout(() => {
      setIsPlayingAudio(false)
    }, 1200)
  }

  return (
    <div className="space-y-5">
      {/* Top Header & Mastery Counter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Vocabulario Clave</h3>
            <p className="text-xs text-slate-500">
              Tarjeta {currentIndex + 1} de {vocabList.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Dominadas: {learnedIds.length} / {vocabList.length}</span>
        </div>
      </div>

      {/* Main Flashcard */}
      <div className="relative perspective-1000">
        <div
          className={`bg-white rounded-3xl p-6 border-2 transition-all duration-300 min-h-[280px] flex flex-col justify-between shadow-md ${
            isLearned ? 'border-emerald-300 bg-emerald-50/20' : 'border-indigo-100 hover:border-indigo-200'
          }`}
        >
          {/* Card Top Row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
              {currentWord.partOfSpeech}
            </span>

            <button
              onClick={playAudioSimulation}
              aria-label={`Escuchar pronunciación de ${currentWord.english}`}
              className={`p-2 rounded-full border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isPlayingAudio
                  ? 'bg-indigo-600 text-white border-indigo-600 scale-105'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              <span>{isPlayingAudio ? 'Reproduciendo...' : 'Escuchar'}</span>
            </button>
          </div>

          {/* Card Main Word Content */}
          <div className="my-6 text-center space-y-2">
            {!isFlipped ? (
              <div className="space-y-1">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{currentWord.english}</h2>
                <p className="font-mono text-sm text-indigo-600 font-medium">{currentWord.phonetic}</p>
                <p className="text-xs text-slate-400 pt-2">(Haz clic en la tarjeta para revelar la traducción)</p>
              </div>
            ) : (
              <div className="space-y-3 bg-indigo-50/80 p-4 rounded-2xl border border-indigo-100">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Traducción</span>
                  <h3 className="text-2xl font-bold text-indigo-950">{currentWord.spanish}</h3>
                </div>
                <div className="pt-1 text-left bg-white p-3 rounded-xl border border-indigo-100 text-xs">
                  <p className="font-semibold text-slate-800">Ejemplo:</p>
                  <p className="text-slate-700 italic">"{currentWord.exampleEnglish}"</p>
                  <p className="text-slate-500 italic mt-0.5">"{currentWord.exampleSpanish}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Card Bottom Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Ver en Inglés' : 'Girar Tarjeta'}</span>
            </button>

            <button
              onClick={toggleLearned}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                isLearned
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLearned ? 'Aprendida' : 'Marcar Aprendida'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all text-xs sm:text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        <button
          onClick={handleNext}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all text-xs sm:text-sm"
        >
          Siguiente <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tip Box */}
      <div className="bg-amber-50 border border-amber-200/70 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Consejo de Estudio IA:</span>
          <p className="text-amber-800 mt-0.5">
            Escucha la pronunciación fonética y repite en voz alta antes de pasar a la sección de pronunciación.
          </p>
        </div>
      </div>
    </div>
  )
}
