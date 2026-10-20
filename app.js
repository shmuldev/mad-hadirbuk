const questions = [
  {
    title: 'נחת טיקט חדש. מה הצעד הראשון?',
    hint: 'אחרי הקפה, כמובן.',
    answers: ["פותחים קובץ. האצבעות כבר יודעות.", "נותנים לו פונקציה קטנה. שלא יתלהב.", "מדרבקים טיקט. חוזרים לריוויו.", "מבקשים תוצאה. הקוד זה עניין שלו."],
    scores: [0, 1, 3, 5],
  },
  {
    title: 'מה ה־AI שלכם יודע על הקודבייס?',
    hint: 'מערכת יחסים מתחילה בקונטקסט.',
    answers: ["כלום. נפגשים רק בשביל regex.", "מכיר את האזור. אני מנווט.", "יש לו specs וכללים. שייצא לעבוד.", "לא יודע מה הוא יודע. המוצר עובד."],
    scores: [0, 2, 4, 5],
  },
  {
    title: 'מי כתב את הפיצ׳ר האחרון?',
    hint: 'ה־git blame לא כאן. אפשר להודות.',
    answers: ["אני. יש כאב בשורש כף היד כהוכחה.", "אני. הוא הוסיף טסט ונח על זרי הדפנה.", "הוא כתב. אני צדתי שיטנס בריוויו.", "אני ביקשתי פיצ׳ר. פתאום היה פיצ׳ר."],
    scores: [0, 1, 3, 5],
  },
  {
    title: 'משימה מורכבת. משחררים?',
    hint: 'כאן מתברר מי מחזיק את ההגה.',
    answers: ["משחררים את ה־AI. אני על זה.", "את השחור כן. את המורכב אני כותב.", "כן, אבל קורא כל שורה שהוא כותב.", "מגדירים תוצאה. המימוש זה עניין שלו."],
    scores: [0, 2, 3, 5],
  },
  {
    title: 'מה רוב יום העבודה שלכם?',
    hint: 'לא כולל ״רק חמש דקות״ בלינקדאין.',
    answers: ["לכתוב קוד. פיזית. עם האצבעות.", "לעבוד בזוג עם ג׳וניור שלא ישן.", "לעשות ריוויו ולזהות שיטנס.", "לבקש דברים ולבדוק מה יצא."],
    scores: [0, 2, 3, 5],
  },
  {
    title: 'הסוכן פתח PR ענק. מה עכשיו?',
    hint: '״שינוי קטן״. 47 קבצים.',
    answers: ["איזה סוכן? אני פתחתי את ה־PR.", "לוקח בחזרה את החלקים המסובכים.", "קפה חזק. עוברים על כל ה־diff.", "לא פוגש PRs. מסתכל על המוצר."],
    scores: [0, 2, 3, 5],
  },
  {
    title: 'יצאתם להפסקה. מה ה־AI עושה?',
    hint: 'זמן איכות עם הטוקנים.',
    answers: ["כלום. הטאב של הצ׳אט סגור.", "מסיים את העבודה השחורה שנתתי לו.", "מממש spec ומריץ בדיקות. שקט תעשייתי.", "בונה את מה שביקשתי. לא שואל איך."],
    scores: [0, 2, 4, 5],
  },
  {
    title: 'איך נראית בקשה טיפוסית שלכם?',
    hint: 'הרב Cursor מקשיב.',
    answers: ["״מה ה־regex לאימייל?״", "״תוסיף טסט. רק טסט. אני מכיר אותך״", "״הנה spec ובדיקות קבלה. תדרבק״", "״תבנה לי אפליקציה שעושה ככה״"],
    scores: [0, 1, 4, 5],
  },
  {
    title: 'מתי העבודה מוכנה מבחינתכם?',
    hint: 'בואו נהיה מדעיים. בערך.',
    answers: ["כשסיימתי לכתוב ולבדוק בעצמי.", "כשחיברתי את שלו ללוגיקה שלי.", "כשהתוצאה עומדת ב־spec ובבדיקות.", "כשהמוצר עושה את מה שביקשתי."],
    scores: [0, 2, 4, 5],
  },
  {
    title: 'מה זה אומר אצלכם ״לפתח״?',
    hint: 'שאלה אחרונה. מותר משבר זהות קטן.',
    answers: ["לכתוב את הקוד. כמו שזה נשמע.", "להיות הסיניור של ג׳וניור דיגיטלי.", "להגדיר בדיוק מה לבנות ואיך לבדוק.", "להגיד מה אני רוצה. משהו כבר בונה."],
    scores: [0, 2, 4, 5],
  },
]

const levels = [
  { title: 'עבודת יד. עם נשמה.', short: 'המתכנת הקלאסי', description: 'כל שורה עוברת דרך האצבעות שלכם. ה־AI מוזמן לעזור עם regex, אבל לקודבייס הוא עוד לא קיבל מפתח.', quote: '״AI זה נחמד. עכשיו תן לי להקליד.״' },
  { title: 'קצת AI בצד.', short: 'עזרה נקודתית', description: 'טסט פה, ריוויו שם, פונקציה קטנה לקינוח. ה־AI הוא כלי בארגז שלכם, ואתם עדיין מנהלים את העניינים שורה־שורה.', quote: '״תעשה רק את זה. אל תיגע בשאר.״' },
  { title: 'יש לכם ג׳וניור צמוד.', short: 'ג׳וניור בכיס', description: 'העבודה השחורה כבר לא שלכם. ה־AI מתקתק, אתם מכוונים, ובמשימות המורכבות עדיין מפשילים שרוולים בעצמכם.', quote: '״את ה־CRUD תדרבק. את הלוגיקה תשאיר לי.״' },
  { title: 'כל היום רק מדרבקים.', short: 'מנהלי הסוכנים', description: 'טיקט נכנס, PR יוצא. ה־AI כותב ואתם מנהלים, עושים ריוויו ודואגים שלא ייכנס שיטנס. המקלדת הפכה לכלי ניהול.', quote: '״אשרייך צדיק. עכשיו תביא את הטיקט הבא.״' },
  { title: 'ה־spec הוא הקוד החדש.', short: 'אדריכלי ה־spec', description: 'אתם מגדירים בדיוק מה לבנות ואיך לבדוק שזה עובד. הסוכנים מממשים, הבדיקות מאמתות, ואתם בוחנים עמידה בדרישות.', quote: '״לא כתבתי קוד. כתבתי מה נחשב גמור.״' },
  { title: 'קופסה שחורה. וייבים טובים.', short: 'מבקשים ומקבלים', description: 'אתם רוצים מוצר, מבקשים מוצר ומקבלים מוצר. קוד, PRs וארכיטקטורה נשארים מאחורי הקלעים. אתם בודקים את מה שנבנה.', quote: '״באיזו שפה זה כתוב? בעברית ביקשתי.״' },
]

const app = document.querySelector('#app')
const dialog = document.querySelector('#about-dialog')
const storageKey = 'darbuk-quiz-v3'
let answers = []
let current = 0
let screen = 'intro'
let resultLevel = 0
let shareResetTimer

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    if (Array.isArray(saved) && saved.length <= questions.length && saved.every(value => Number.isInteger(value) && value >= 0 && value < 4)) answers = saved
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

function calculateLevel(values) {
  return Math.round(values.reduce((total, value, index) => total + questions[index].scores[value], 0) / values.length)
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
    <p class="intro-copy">עדיין כותבים כל שורה, או שרק אומרים ״תבנה לי״?<br><strong>בואו נגלה מי עובד אצל מי.</strong></p>
    <div class="meter" aria-hidden="true"><div class="meter-track">${levels.map(() => '<i></i>').join('')}</div><div class="meter-caption"><span><b class="mono">0</b> · אני והמקשים</span><span>כל היום רק מדרבק · <b class="mono">5</b></span></div></div>
    <button class="primary" id="start">יאללה, נדרבק <span aria-hidden="true">←</span></button>
    <p class="micro">אין תשובות נכונות. יש תשובות שתכחישו בסטנדאפ.</p>
    ${answers.length ? `<button class="resume" id="resume">${resumeLabel} ←</button>` : ''}
    <div class="intro-facts"><span>10 שאלות קצרות</span><span>בערך 2 דקות</span><span>0 רגשות אשם</span></div>
  </section>`
  document.querySelector('#start').onclick = () => { answers = []; current = 0; saveProgress(); renderQuestion(); focusTitle() }
  document.querySelector('#resume')?.addEventListener('click', () => {
    if (answers.length === questions.length) { renderResult(calculateLevel(answers)); focusTitle(); return }
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
    <p class="question-hint">${question.hint}</p>
    <div class="options" role="group" aria-labelledby="question-title">${question.answers.map((answer, index) => `<button class="option ${selected === index ? 'selected' : ''}" data-answer="${index}" aria-pressed="${selected === index}"><span class="option-key mono" aria-hidden="true">${index + 1}</span><span>${answer}</span><span class="answer-check" aria-hidden="true">✓</span></button>`).join('')}</div>
    <div class="quiz-nav"><button class="back" id="back">→ ${current === 0 ? 'לפתיחה' : 'הקודמת'}</button><button class="primary" id="next" ${selected === undefined ? 'disabled' : ''}>${current === questions.length - 1 ? 'נו, כמה אני מדרבק?' : 'השאלה הבאה'} <span aria-hidden="true">←</span></button></div>
    <p class="keyboard-hint">גם המקלדת בעניין: 1–4 לבחירה · Enter להמשך</p>
  </section>`
  app.querySelectorAll('[data-answer]').forEach(button => button.onclick = () => selectAnswer(Number(button.dataset.answer)))
  document.querySelector('#back').onclick = () => { if (current === 0) intro(); else { current -= 1; renderQuestion() }; focusTitle() }
  document.querySelector('#next').onclick = nextQuestion
}

function selectAnswer(value) {
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
    const level = calculateLevel(answers)
    history.replaceState(null, '', `#result=${level}`)
    renderResult(level)
  } else {
    current += 1
    renderQuestion()
  }
  focusTitle()
}

function renderResult(level) {
  screen = 'result'
  resultLevel = level
  const result = levels[level]
  app.innerHTML = `<section class="result" aria-labelledby="result-title">
    <div class="result-label"><span class="live-dot" aria-hidden="true"></span> האבחון הבלתי מוסמך שלכם מוכן</div>
    <div class="result-number" aria-label="רמה ${level} מתוך 5">${level}<span>/ 5</span></div>
    <h1 id="result-title" tabindex="-1">${result.title}</h1>
    <p class="result-copy">${result.description}</p>
    <p class="result-quote">${result.quote}</p>
    <div class="result-scale" aria-label="מיקומכם בסולם הדרבוק">${levels.map((item, index) => `<div class="scale-item ${index === level ? 'active' : ''}"><span class="mono">${index}</span>${index === level ? '<span class="sr-only"> — הרמה שלכם</span>' : ''}</div>`).join('')}</div>
    <div class="result-actions"><button class="primary" id="share">משתפים את האבחון <span aria-hidden="true">↗</span></button><button class="secondary" id="restart">עוד סיבוב, הפעם בכנות</button></div>
    <p class="result-note">רמת שחרור ל־AI, לא ציון בתכנות. כל רמה והדרבוק שלה.</p>
    <details class="levels"><summary>רגע, מה כל הרמות אומרות?</summary><div class="level-list">${levels.map((item, index) => `<div class="level-row ${index === level ? 'active' : ''}"><span class="mono">${index}</span><div><h3>${item.short}</h3><p>${item.description}</p></div></div>`).join('')}</div></details>
  </section>`
  document.querySelector('#share').onclick = shareResult
  document.querySelector('#restart').onclick = () => { answers = []; current = 0; saveProgress(); history.replaceState(null, '', location.pathname + location.search); renderQuestion(); focusTitle() }
}

async function shareResult() {
  const url = new URL(location.href)
  url.hash = `result=${resultLevel}`
  const text = `יצאתי רמה ${resultLevel} במד הדרבוק: ${levels[resultLevel].short}. כמה אתם באמת מדרבקים?`
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
  const match = /^#result=([0-5])$/.exec(location.hash)
  if (match) { renderResult(Number(match[1])); return }
  intro()
}

document.querySelector('#about').onclick = () => dialog.showModal()
dialog.querySelector('.close').onclick = () => dialog.close()
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close() } })
document.querySelector('.brand').onclick = event => { event.preventDefault(); history.replaceState(null, '', location.pathname + location.search); intro(); focusTitle() }
document.addEventListener('keydown', event => {
  if (screen !== 'quiz' || dialog.open || event.ctrlKey || event.metaKey || event.altKey) return
  if (/^[1-4]$/.test(event.key)) { event.preventDefault(); selectAnswer(Number(event.key) - 1) }
  if (event.key === 'Enter' && (event.target === document.body || event.target?.matches('h2, [data-answer]'))) { event.preventDefault(); nextQuestion() }
})
window.addEventListener('hashchange', handleHash)
loadProgress()
handleHash()
