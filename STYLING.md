# Guía de Estilos Visuales - AMI Tutor de Inglés

Este documento define las especificaciones del sistema de diseño y los estilos visuales de la aplicación mobile-first **AMI - Tutor de Inglés IA**. Se ha diseñado para que futuros agentes de IA o desarrolladores puedan ajustar y modificar el tema y diseño visual de forma consistente.

---

## 1. Filosofía de Diseño Mobile-First

- **Enfoque Centrado en Móvil**: La interfaz está optimizada primeramente para pantallas móviles de 320px a 480px, expandiéndose de forma fluida a tabletas y escritorio.
- **Micro-interacciones y Feedback Háptico Visual**: Cada botón y tarjeta reactiva proporciona retroalimentación táctil (`active:scale-95`, transiciones suaves de `150ms`).
- **Claridad e Idioma**: Toda la interfaz y guía del usuario se presenta en español, priorizando la legibilidad de frases en inglés durante las lecciones.

---

## 2. Paleta de Colores y Tokens

| Categoría | Nombre Variable | Código HEX / Clase Tailwind | Uso |
| :--- | :--- | :--- | :--- |
| **Marca Principal** | `royal-600` | `#2563eb` (`bg-royal-600`) | Encabezados, botones primarios, estado activo de navegación. |
| **Marca Oscuro** | `royal-900` | `#1e3a8a` (`bg-royal-900`) | Fondo del reproductor de video, acentos del header. |
| **Éxito / Dominio** | `emerald-600` | `#16a34a` (`bg-emerald-600`) | Feedback correcto en quizzes, tarjetas aprendidas, nivel de pronunciación alto. |
| **Alerta / Progreso**| `amber-500` | `#f59e0b` (`bg-amber-500`) | Puntuaciones intermedias, indicadores de nivel. |
| **Error / Reintentar**| `rose-500` | `#f43f5e` (`bg-rose-500`) | Respuestas incorrectas, alertas de audio. |
| **Fondo General** | `slate-50` | `#f8fafc` (`bg-slate-50`) | Fondo global de la aplicación. |
| **Superficie Tarjetas**| `white` | `#ffffff` (`bg-white`) | Tarjetas de lección, modals, cajas de vocabulario. |
| **Texto Principal** | `slate-800` | `#1e293b` (`text-slate-800`) | Títulos, preguntas, texto destacado. |
| **Texto Secundario** | `slate-500` | `#64748b` (`text-slate-500`) | Subtítulos, pronunciación fonética IPA, marcas de tiempo. |

---

## 3. Tipografía y Escala

- **Tipografía Base**: `font-sans` (System UI / Inter / Roboto).
- **Escala Tipográfica**:
  - `text-xs` (`0.75rem` / `12px`): Etiquetas secundarias, fonética en minúscula.
  - `text-sm` (`0.875rem` / `14px`): Textos de traducción, explicaciones en español.
  - `text-base` (`1rem` / `16px`): Opciones de preguntas, transcripciones en inglés.
  - `text-lg` (`1.125rem` / `18px`): Títulos de tarjetas, palabra clave de vocabulario.
  - `text-xl` (`1.25rem` / `20px`): Encabezado de la lección actual.
  - `text-2xl` (`1.5rem` / `24px`): Título de la aplicación / Banner principal.

---

## 4. Componentes y Estilos Específicos

### 4.1 Encabezado y Navegación Navbar (`Navbar.tsx`)
- **Fondo**: `bg-slate-900` con texto en `text-white`.
- **Insignia del Tutor**: Icono `Sparkles` en amarillo brillante (`text-amber-400`).
- **Selector de Lección (`<select>`)**:
  - Estado: **Inhabilitado / Desactivado** (`disabled`).
  - Valor seleccionado: `"Reina Elizabeth"`.
  - Estilo visual: `bg-slate-800 text-slate-300 opacity-90 border border-slate-700 rounded-lg px-3 py-1.5 cursor-not-allowed`.

### 4.2 Naves/Pestañas de Opciones de Lección (`LessonTabs.tsx`)
1. **Ver video** (Icono: `PlayCircle`)
2. **Responder preguntas** (Icono: `HelpCircle`)
3. **Practicar vocabulario** (Icono: `BookOpen`)
4. **Aprender pronunciación** (Icono: `Mic`)

- **Estilo Pestaña Activa**: `bg-indigo-600 text-white shadow-md font-semibold`.
- **Estilo Pestaña Inactiva**: `bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200`.

### 4.3 Vista 1: Ver Video (`VideoLesson.tsx`)
- **Contenedor del Video**: Simulación aspect ratio `16:9` (`aspect-video bg-slate-900 rounded-2xl`).
- **Transcripción**: Bloques de texto interactivos en inglés con botón toggle para ver la traducción al español.

### 4.4 Vista 2: Responder Preguntas (`QuizLesson.tsx`)
- **Opciones de Respuesta**: Botones con `border-2 border-slate-200 hover:border-indigo-500 rounded-xl p-4 transition-all`.
- **Feedback de Respuesta**:
  - Correcta: `bg-emerald-50 border-emerald-500 text-emerald-900`.
  - Incorrecta: `bg-rose-50 border-rose-500 text-rose-900`.

### 4.5 Vista 3: Practicar Vocabulario (`VocabularyLesson.tsx`)
- **Tarjeta Flashcard**: Animación de volteo 3D / cambio de vista inglés/español.
- **Fonética IPA**: Destacada en tono azul `text-royal-600 font-mono bg-royal-50 px-2 py-0.5 rounded`.
- **Botón Marcar Aprendida**: Toggle verde con icono `CheckCircle2`.

### 4.6 Vista 4: Aprender Pronunciación (`PronunciationLesson.tsx`)
- **Botón de Grabación**: Círculo prominente de `64px` x `64px` (`w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center animate-pulse`).
- **Barra de Puntuación de Pronunciación**: Medidor visual porcentual (0-100%) con barra de color dinámico (verde para >85%, amarillo para 60-84%, rojo para <60%).

---

## 5. Instrucciones para Agentes Futuros

Para modificar los estilos visuales en el código:
1. Todos los estilos CSS utilitarios utilizan clases estándar de **Tailwind CSS**.
2. Las paletas personalizadas están configuradas en `tailwind.config.js`.
3. Si requiere modificar sombras o bordes globales, ajuste `src/index.css`.
4. Mantenga siempre el atributo `disabled` en el selector de lección `"Reina Elizabeth"` según los requerimientos del producto.
