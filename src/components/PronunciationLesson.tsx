import { useState } from 'react'
import { Mic, MicOff, Volume2, Sparkles, CheckCircle, RefreshCw, Activity, Award } from 'lucide-react'

interface PracticePhrase {
  id: number
  phrase: string
  phonetic: string
  spanishMeaning: string
  tips: string
}

const practicePhrases: PracticePhrase[] = [
  {
    id: 1,
    phrase: 'Better days will return.',
    phonetic: '/ˈbɛt.ər deɪz wɪl rɪˈtɜːn/',
    spanishMeaning: 'Días mejores volverán.',
    tips: 'Asegúrate de pronunciar suavemente la "t" intervocálica y marcar la "r" en "return".',
  },
  {
    id: 2,
    phrase: 'Devoted to your service.',
    phonetic: '/dɪˈvoʊ.tɪd tuː jʊər ˈsɜːr.vɪs/',
    spanishMeaning: 'Dedicado a su servicio.',
    tips: 'Enfatiza la sílaba "VO" en "devoted" y mantén la "s" final clara en "service".',
  },
  {
    id: 3,
    phrase: 'Make the world a better place.',
    phonetic: '/meɪk ðə wɜːrld ə ˈbɛt.ər pleɪs/',
    spanishMeaning: 'Hacer del mundo un lugar mejor.',
    tips: 'Presta atención al sonido de "world" (/wɜːrld/) en lugar de pronunciarlo como "word".',
  },
]

export function PronunciationLesson() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recordingScore, setRecordingScore] = useState<number | null>(null)
  const [isPlayingNative, setIsPlayingNative] = useState(false)

  const currentPhrase = practicePhrases[activePhraseIndex]

  const playNativeAudio = () => {
    setIsPlayingNative(true)
    setTimeout(() => {
      setIsPlayingNative(false)
    }, 1200)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingScore(null)

    // Simulate 2.5 seconds recording then analyze
    setTimeout(() => {
      setIsRecording(false)
      setIsAnalyzing(true)

      setTimeout(() => {
        setIsAnalyzing(false)
        // Generate high score simulation (85-98%)
        const generatedScore = Math.floor(Math.random() * 14) + 85
        setRecordingScore(generatedScore)
      }, 1000)
    }, 2500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    if (score >= 75) return 'text-amber-600 bg-amber-50 border-amber-200'
    return 'text-rose-600 bg-rose-50 border-rose-200'
  }

  return (
    <div className="space-y-5">
      {/* Selector of Practice Phrases */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-2">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-600" /> Selecciona la Frase a Practicar:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {practicePhrases.map((phrase, idx) => (
            <button
              key={phrase.id}
              onClick={() => {
                setActivePhraseIndex(idx)
                setRecordingScore(null)
              }}
              className={`p-2.5 rounded-xl border text-xs text-left transition-all font-medium ${
                activePhraseIndex === idx
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Frase {idx + 1}: "{phrase.phrase}"
            </button>
          ))}
        </div>
      </div>

      {/* Main Pronunciation Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-6 text-center">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Sintaxis y Fonética
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            "{currentPhrase.phrase}"
          </h2>
          <p className="font-mono text-sm text-indigo-600 font-semibold mt-1">
            {currentPhrase.phonetic}
          </p>
          <p className="text-xs text-slate-500 italic mt-1">
            "{currentPhrase.spanishMeaning}"
          </p>
        </div>

        {/* Listen to Native Audio Button */}
        <div className="flex justify-center">
          <button
            onClick={playNativeAudio}
            className={`px-4 py-2 rounded-xl border font-semibold text-xs flex items-center gap-2 transition-all ${
              isPlayingNative
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-inner'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingNative ? 'animate-bounce' : ''}`} />
            <span>{isPlayingNative ? 'Reproduciendo Modelo...' : 'Escuchar Audio Nativo'}</span>
          </button>
        </div>

        {/* Interactive Recording Area */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
          <p className="text-xs font-semibold text-slate-600">
            {isRecording
              ? 'Escuchando tu pronunciación en tiempo real...'
              : isAnalyzing
              ? 'Analizando ondas de voz con IA...'
              : 'Presiona el micrófono para iniciar la evaluación:'}
          </p>

          <div className="flex justify-center">
            {isRecording ? (
              <button
                onClick={() => setIsRecording(false)}
                className="w-20 h-20 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg animate-pulse ring-4 ring-rose-200"
                aria-label="Detener grabación"
              >
                <MicOff className="w-8 h-8" />
              </button>
            ) : isAnalyzing ? (
              <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <button
                onClick={handleStartRecording}
                className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all hover:shadow-indigo-200"
                aria-label="Grabar voz"
              >
                <Mic className="w-9 h-9" />
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-400">
            {isRecording ? 'Habla ahora de forma clara en el micrófono' : 'Simulación de micrófono para práctica fluida'}
          </p>
        </div>

        {/* AI Score Feedback Display */}
        {recordingScore !== null && (
          <div className={`p-4 rounded-2xl border text-left space-y-3 animate-fadeIn ${getScoreColor(recordingScore)}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5">
                <Award className="w-5 h-5" /> Evaluación del Tutor IA
              </span>
              <span className="text-2xl font-extrabold font-mono">{recordingScore}%</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold">
              <div className="bg-white/80 p-2 rounded-lg border border-current">
                <span className="block text-slate-500 font-normal">Claridad</span>
                <span>{recordingScore + 1 > 100 ? 100 : recordingScore + 1}%</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-current">
                <span className="block text-slate-500 font-normal">Fluidez</span>
                <span>{recordingScore - 2}%</span>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-current">
                <span className="block text-slate-500 font-normal">Acento</span>
                <span>{recordingScore}%</span>
              </div>
            </div>

            <div className="text-xs pt-1 flex items-start gap-1.5">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                <strong className="font-semibold">¡Excelente pronunciación!</strong> Tu entonación imita adecuadamente el ritmo del inglés británico formal.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Phonetic Tip */}
      <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl p-4 text-xs text-indigo-900 flex items-start gap-2.5">
        <Activity className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Consejo de Articulación:</span>
          <p className="text-indigo-800 mt-0.5">{currentPhrase.tips}</p>
        </div>
      </div>
    </div>
  )
}
