import { GraduationCap, Lock, Sparkles } from 'lucide-react'

export interface NavbarProps {
  currentLesson?: string
}

export function Navbar({ currentLesson = 'Reina Elizabeth' }: NavbarProps) {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800 shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-inner flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-lg leading-tight tracking-tight text-white">AMI</h1>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-400/30">
                <Sparkles className="w-2.5 h-2.5" /> Tutor IA
              </span>
            </div>
            <p className="text-xs text-slate-400">Tutor Personal de Inglés</p>
          </div>
        </div>

        {/* Lesson Selector Component */}
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 rounded-xl p-1.5 px-3">
          <label htmlFor="lesson-select" className="text-xs font-medium text-slate-300 whitespace-nowrap flex items-center gap-1">
            <span className="text-slate-400">Lección:</span>
          </label>
          <div className="relative flex-1 flex items-center">
            <select
              id="lesson-select"
              value={currentLesson}
              disabled
              aria-label="Seleccionar lección"
              className="bg-slate-900 text-slate-200 text-xs font-semibold py-1.5 pl-2.5 pr-8 rounded-lg appearance-none cursor-not-allowed border border-slate-700/80 focus:outline-none w-full opacity-90"
            >
              <option value="Reina Elizabeth">Reina Elizabeth</option>
              <option value="Winston Churchill" disabled>Winston Churchill (Bloqueado)</option>
              <option value="Shakespeare" disabled>Shakespeare (Bloqueado)</option>
            </select>
            <Lock className="w-3.5 h-3.5 text-amber-400 absolute right-2.5 pointer-events-none" />
          </div>
        </div>
      </div>
    </header>
  )
}
