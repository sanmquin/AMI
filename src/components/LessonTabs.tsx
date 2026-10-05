import { PlayCircle, HelpCircle, BookOpen, Mic } from 'lucide-react'

export type LessonTab = 'video' | 'quiz' | 'vocab' | 'speech'

interface LessonTabsProps {
  activeTab: LessonTab
  setActiveTab: (tab: LessonTab) => void
}

export function LessonTabs({ activeTab, setActiveTab }: LessonTabsProps) {
  const tabs = [
    { id: 'video' as LessonTab, label: 'Ver video', icon: PlayCircle },
    { id: 'quiz' as LessonTab, label: 'Responder preguntas', icon: HelpCircle },
    { id: 'vocab' as LessonTab, label: 'Practicar vocabulario', icon: BookOpen },
    { id: 'speech' as LessonTab, label: 'Aprender pronunciación', icon: Mic },
  ]

  return (
    <nav className="bg-white rounded-2xl p-1.5 border border-slate-200/80 shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 p-2.5 sm:px-3 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all text-center leading-tight ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-indigo-600'}`} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
