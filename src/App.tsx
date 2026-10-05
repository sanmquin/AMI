import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { LessonTabs, LessonTab } from './components/LessonTabs'
import { VideoLesson } from './components/VideoLesson'
import { QuizLesson } from './components/QuizLesson'
import { VocabularyLesson } from './components/VocabularyLesson'
import { PronunciationLesson } from './components/PronunciationLesson'
import { Crown, Sparkles, BookOpenCheck } from 'lucide-react'

export default function App() {
  const [activeTab, setActiveTab] = useState<LessonTab>('video')

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header / Navbar with disabled lesson selector */}
      <Navbar currentLesson="Reina Elizabeth" />

      {/* Main Container - Mobile First Layout */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5 space-y-5">
        {/* Lesson Active Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 uppercase tracking-wider">
                <Crown className="w-3 h-3 fill-current" /> Personaje Real
              </span>
              <span className="text-slate-400 text-xs">Nivel B2 (Intermedio Alto)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Reina Elizabeth II
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Aprende inglés británico formal con el histórico discurso de dedicación.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 shrink-0 text-xs text-amber-200">
            <BookOpenCheck className="w-4 h-4 text-amber-400" />
            <span>4 Actividades Disponibles</span>
          </div>
        </div>

        {/* 4 Lesson Option Tabs */}
        <LessonTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic View Content based on Selected Option */}
        <section aria-label="Contenido de la lección">
          {activeTab === 'video' && <VideoLesson />}
          {activeTab === 'quiz' && <QuizLesson />}
          {activeTab === 'vocab' && <VocabularyLesson />}
          {activeTab === 'speech' && <PronunciationLesson />}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-4 px-4 text-center text-xs text-slate-500 mt-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AMI - Tutor de Inglés con Inteligencia Artificial</span>
          </p>
          <p className="text-slate-400">© {new Date().getFullYear()} AMI Education Inc.</p>
        </div>
      </footer>
    </div>
  )
}
