const questions = [
  {
    "title": "טיקט חדש. מה הצעד הראשון?",
    "answers": [
      "רץ לide",
      "דיזיין עם הרב ובודק את הקוד שהוא השפריץ עלי",
      "רק spec, ניפגש בverify"
    ]
  },
  {
    "title": "מי מכיר את הקודבייס יותר טוב?",
    "answers": [
      "אני",
      "הרב קרסר",
      "שגיא צודק"
    ]
  },
  {
    "title": "מי כתב את הפיצ׳ר האחרון?",
    "answers": [
      "אני",
      "קלוד",
      "קורבי",
      "גלית"
    ]
  },
  {
    "title": "משימה מורכבת. משחררים?",
    "answers": [
      "קורא כל שורה עד ששגיא צועק עלי",
      "צבא של ai שיבדוק שהכל עובד",
      "ה׳ יתברך תמיד אוהב אותי",
      "אנחנו הרמס לא מייקל קורס"
    ]
  },
  {
    "title": "מה רוב יום העבודה שלכם?",
    "answers": [
      "לכתוב קוד",
      "לבקש מאחרים לעשות לי ריויו",
      "לבקש מאוהד לבדוק את הטיקטים",
      "לכתוב specs"
    ]
  },
  {
    "title": "הסוכן פתח PR ענק. מה עכשיו?",
    "answers": [
      "חמוד, שיבדוק בעצמו",
      "שולח למישהו אחר שיקח אחריות",
      "לא פוגש pr. מסתכל על המוצר."
    ]
  },
  {
    "title": "יצאתם להפסקה. מה ה־AI עושה?",
    "hint": "זמן איכות עם הטוקנים.",
    "answers": [
      "כלום. הטאב של הצ׳אט סגור.",
      "מסיים את העבודה השחורה שנתתי לו.",
      "מממש spec ומריץ בדיקות. שקט תעשייתי.",
      "בונה את מה שביקשתי. לא שואל איך."
    ]
  },
  {
    "title": "איך נראית בקשה טיפוסית שלכם?",
    "answers": [
      "״מה ה־regex לאימייל?״",
      "״תוסיף טסט. רק טסט. אני מכיר אותך״",
      "build 1 bilion company make no mistake"
    ]
  },
  {
    "title": "מתי העבודה מוכנה מבחינתכם?",
    "hint": "בואו נהיה מדעיים",
    "answers": [
      "כשסיימתי לכתוב ולבדוק בעצמי.",
      "כשהתוצאה עומדת ב־spec ובבדיקות."
    ]
  },
  {
    "title": "מה זה אומר אצלכם ״לפתח״?",
    "answers": [
      "לגנוב זכויות יוצרים מקלוד ולהגיד שאני פיתחתי"
    ]
  }
]

const resultMessage = "אתה בהחלט יודע לדרבק, תמשיך כך ואולי תישאר רלוונטי"

const app = document.querySelector('#app')
const dialog = document.querySelector('#about-dialog')
const storageKey = 'darbuk-quiz-v4'
let answers = []
let current = 0
let screen = 'intro'
let shareResetTimer

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    if (Array.isArray(saved) && saved.length <= questions.length && saved.every((value, index) => Number.isInteger(value) && value >= 0 && value < questions[index].answers.length)) answers = saved
  } catch {
    answers = []
  }
}

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(answers))
  } catch {
    document.querySelector('#announcement').textContent = 'הדפדפן לא מאפשר שמירת התקדמות. אפשר להמשיך בשאלון כרגיל.'
  }
}

function focusTitle() {
  app.querySelector('h1, h2')?.focus({ preventScroll: true })
}

function intro() {
  screen = 'intro'
  const resumeLabel = answers.length === questions.length ? 'לתוצאה הקודמת שלי' : 'ממשיכים מאיפה שעצרנו'
  app.innerHTML = `<section class="intro" aria-labelledby="intro-title">
    <div class="eyebrow"><span class="live-dot" aria-hidden="true"></span> אבחון בלתי מוסמך למתכנתים בעידן ה־AI</div>
    <h1 id="intro-title" tabindex="-1">כמה אתם<br><span class="accent">באמת מדרבקים?</span></h1>
    <div class="meter" aria-hidden="true"><div class="meter-track">${'<i></i>'.repeat(6)}</div><div class="meter-caption"><span><b class="mono">0</b> · ״הוא בסך הכל עוד כלי״</span><span>וייבקודינג all the way up · <b class="mono">5</b></span></div></div>
    <button class="primary" id="start">יאללה, נדרבק <span aria-hidden="true">←</span></button>
    <p class="micro">אין תשובות לא נכונות, ניפגש בשימוע</p>
    ${answers.length ? `<button class="resume" id="resume">${resumeLabel} ←</button>` : ''}
    <div class="intro-facts"><span>10 שאלות קצרות</span><span>בערך 2 דקות</span><span>0 רגשות אשם</span></div>
  </section>`
  document.querySelector('#start').onclick = () => { answers = []; current = 0; saveProgress(); renderQuestion(); focusTitle() }
  document.querySelector('#resume')?.addEventListener('click', () => {
    if (answers.length === questions.length) { renderResult(); focusTitle(); return }
    current = answers.length
    renderQuestion()
    focusTitle()
  })
}

function renderQuestion() {
  screen = 'quiz'
  const question = questions[current]
  const selected = answers[current]
  app.innerHTML = `<section class="quiz" aria-labelledby="question-title">
    <div class="quiz-meta"><span class="count">שאלה <b class="mono">${String(current + 1).padStart(2, '0')}</b> מתוך <span class="mono">10</span></span><span>${current < 3 ? 'מתחילים בקטנה' : current < 7 ? 'נכנסים לקצב' : 'עוד רגע האמת יוצאת'}</span></div>
    <div class="progress" role="progressbar" aria-label="התקדמות בשאלון" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${current}" aria-valuetext="שאלה ${current + 1} מתוך 10">${questions.map((questionItem, index) => `<span class="${index < current ? 'done' : index === current ? 'current' : ''}"></span>`).join('')}</div>
    <h2 id="question-title" tabindex="-1">${question.title}</h2>
    ${question.hint ? `<p class="question-hint">${question.hint}</p>` : '' }
    <div class="options" role="group" aria-labelledby="question-title">${question.answers.map((answer, index) => `<button class="option ${selected === index ? 'selected' : ''}" data-answer="${index}" aria-pressed="${selected === index}"><span class="option-key mono" aria-hidden="true">${index + 1}</span><span>${answer}</span><span class="answer-check" aria-hidden="true">✓</span></button>`).join('')}</div>
    <div class="quiz-nav"><button class="back" id="back">→ ${current === 0 ? 'לפתיחה' : 'הקודמת'}</button><button class="primary" id="next" ${selected === undefined ? 'disabled' : ''}>${current === questions.length - 1 ? 'נו, כמה אני מדרבק?' : 'השאלה הבאה'} <span aria-hidden="true">←</span></button></div>
    <p class="keyboard-hint">${question.answers.length === 1 ? 'גם המקלדת בעניין: 1 לבחירה · Enter להמשך' : `גם המקלדת בעניין: 1–${question.answers.length} לבחירה · Enter להמשך`}</p>
  </section>`
  app.querySelectorAll('[data-answer]').forEach(button => button.onclick = () => selectAnswer(Number(button.dataset.answer)))
  document.querySelector('#back').onclick = () => { if (current === 0) intro(); else { current -= 1; renderQuestion() }; focusTitle() }
  document.querySelector('#next').onclick = nextQuestion
}

function selectAnswer(value) {
  if (!Number.isInteger(value) || value < 0 || value >= questions[current].answers.length) return
  answers[current] = value
  saveProgress()
  app.querySelectorAll('[data-answer]').forEach(button => {
    const selected = Number(button.dataset.answer) === value
    button.classList.toggle('selected', selected)
    button.setAttribute('aria-pressed', String(selected))
  })
  document.querySelector('#next').disabled = false
}

function nextQuestion() {
  if (answers[current] === undefined) return
  if (current === questions.length - 1) {
    history.replaceState(null, '', '#result')
    renderResult()
  } else {
    current += 1
    renderQuestion()
  }
  focusTitle()
}

function renderResult() {
  screen = 'result'
  app.innerHTML = `<section class="result" aria-labelledby="result-title">
    <div class="result-label"><span class="live-dot" aria-hidden="true"></span> האבחון הבלתי מוסמך שלך מוכן</div>
    <div class="result-mark" aria-hidden="true">✳</div>
    <h1 id="result-title" tabindex="-1">${resultMessage}</h1>
    <div class="result-actions"><button class="primary" id="share">משתפים את האבחון <span aria-hidden="true">↗</span></button><button class="secondary" id="restart">עוד סיבוב, הפעם בכנות</button></div>
  </section>`
  document.querySelector('#share').onclick = shareResult
  document.querySelector('#restart').onclick = () => { answers = []; current = 0; saveProgress(); history.replaceState(null, '', location.pathname + location.search); renderQuestion(); focusTitle() }
}

async function shareResult() {
  const url = new URL(location.href)
  url.hash = 'result'
  const text = resultMessage
  const button = document.querySelector('#share')
  try {
    if (navigator.share) {
      await navigator.share({ title: 'מד הדרבוק', text, url: url.href })
      return
    }
    await navigator.clipboard.writeText(`${text}\n${url.href}`)
    button.textContent = 'הועתק. יאללה, לקבוצה ✓'
    document.querySelector('#announcement').textContent = 'התוצאה והקישור הועתקו ללוח'
    clearTimeout(shareResetTimer)
    shareResetTimer = setTimeout(() => { if (button.isConnected) button.innerHTML = 'משתפים את האבחון <span aria-hidden="true">↗</span>' }, 3500)
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') return
    button.textContent = 'אפשר להעתיק את הקישור משורת הכתובת'
    document.querySelector('#announcement').textContent = 'השיתוף לא זמין. אפשר להעתיק את הקישור משורת הכתובת.'
  }
}

function handleHash() {
  if (/^#result(?:=[0-5])?$/.test(location.hash)) { renderResult(); return }
  intro()
}

document.querySelector('#about').onclick = () => dialog.showModal()
dialog.querySelector('.close').onclick = () => dialog.close()
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close() } })
document.querySelector('.brand').onclick = event => { event.preventDefault(); history.replaceState(null, '', location.pathname + location.search); intro(); focusTitle() }
document.addEventListener('keydown', event => {
  if (screen !== 'quiz' || dialog.open || event.ctrlKey || event.metaKey || event.altKey) return
  if (/^[1-9]$/.test(event.key) && Number(event.key) <= questions[current].answers.length) { event.preventDefault(); selectAnswer(Number(event.key) - 1) }
  if (event.key === 'Enter' && (event.target === document.body || event.target?.matches('h2, [data-answer]'))) { event.preventDefault(); nextQuestion() }
})
window.addEventListener('hashchange', handleHash)
loadProgress()
handleHash()
