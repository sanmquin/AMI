import { useState } from 'react'
import { Play, Pause, Languages, Sparkles, Clock, FileText, CheckCircle2 } from 'lucide-react'

export function VideoLesson() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSpanishTranslation, setShowSpanishTranslation] = useState(true)
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0)

  const transcript = [
    {
      time: '00:05',
      english: 'I declare before you all that my whole life whether it be long or short shall be devoted to your service.',
      spanish: 'Declaro ante todos ustedes que toda mi vida, ya sea larga o corta, estará dedicada a su servicio.',
    },
    {
      time: '00:15',
      english: 'We should take comfort that while we may have more still to endure, better days will return.',
      spanish: 'Debemos reconfortarnos sabiendo que, aunque aún nos quede más por soportar, volverán días mejores.',
    },
    {
      time: '00:28',
      english: 'When peace comes, remember it will be for us, the children of today, to make the world of tomorrow a better place.',
      spanish: 'Cuando llegue la paz, recuerden que nos corresponderá a nosotros, los niños de hoy, hacer del mundo del mañana un lugar mejor.',
    },
  ]

  const keyPoints = [
    'Uso del futuro imperativo: "shall be devoted" (estará dedicada).',
    'Expresiones de consuelo y esperanza: "take comfort", "better days will return".',
    'Pronunciación distinguida del inglés británico real (Received Pronunciation).',
  ]

  return (
    <div className="space-y-6">
      {/* Video Banner / Simulated Player */}
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
        <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
          {/* Simulated Video Frame */}
          <div className="text-center space-y-3 max-w-md">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Discurso Histórico de la Reina Elizabeth II
            </div>
            <h3 className="text-white font-serif italic text-lg sm:text-xl font-semibold px-4">
              "{transcript[activeSentenceIndex].english}"
            </h3>
            {showSpanishTranslation && (
              <p className="text-slate-300 text-xs sm:text-sm font-light italic">
                "{transcript[activeSentenceIndex].spanish}"
              </p>
            )}
          </div>

          {/* Overlay Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-indigo-600 group-hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </div>
          </button>
        </div>

        {/* Player Bar Controls */}
        <div className="bg-slate-950 px-4 py-3 flex items-center justify-between text-xs text-slate-300 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
            </button>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" /> {transcript[activeSentenceIndex].time} / 01:30
            </span>
          </div>

          <button
            onClick={() => setShowSpanishTranslation(!showSpanishTranslation)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              showSpanishTranslation
                ? 'bg-indigo-900/60 border-indigo-500/50 text-indigo-200'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Subtítulos en Español {showSpanishTranslation ? '(Activados)' : '(Desactivados)'}</span>
          </button>
        </div>
      </div>

      {/* Transcript List */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" /> Transcripción Interactiva
          </h3>
          <span className="text-xs text-slate-500">Haz clic en una frase para saltar</span>
        </div>

        <div className="space-y-2.5">
          {transcript.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSentenceIndex(idx)
                setIsPlaying(true)
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                activeSentenceIndex === idx
                  ? 'bg-indigo-50/80 border-indigo-300 ring-1 ring-indigo-200'
                  : 'bg-slate-50/50 border-slate-200/70 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded">
                  {item.time}
                </span>
                {activeSentenceIndex === idx && (
                  <span className="text-[11px] font-medium text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded-full">
                    Reproduciendo ahora
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-800 leading-snug">{item.english}</p>
              <p className="text-xs text-slate-500 mt-1 italic">{item.spanish}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Key Takeaways Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md space-y-3">
        <h4 className="font-bold text-sm sm:text-base text-indigo-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Aspectos Clave de la Lección
        </h4>
        <ul className="space-y-2">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
