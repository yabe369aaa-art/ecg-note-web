import { rhythms, basics, waveform, emptyProgress, normalizeProgress, recordAnswer, stats, localDay, makeQuiz, makeExamQuiz } from "./data.js";

const main = document.querySelector("#main");
const storageKey = "ecg-note-progress-v1";
let progress = emptyProgress();
let storageAvailable = true;
try {
  progress = normalizeProgress(JSON.parse(localStorage.getItem(storageKey)));
} catch {
  storageAvailable = false;
}
let filter = "すべて";
let quiz = null;
let examQuiz = null;
let svgId = 0;
let playbackCleanup = () => {};

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
}

function storageNotice() {
  return storageAvailable ? "" : '<p class="notice" role="status">このブラウザでは進捗を保存できません。現在の画面では学習できますが、再読み込みすると記録が失われる可能性があります。</p>';
}

function strip(id, { compact = false, quizMode = false, live = false, paused = false } = {}) {
  const uid = `grid-${++svgId}`;
  const rhythm = rhythms.find(r => r.id === id);
  const graph = `<div class="ecg-strip ${compact ? "compact" : ""} ${live ? "live-strip" : ""}"><svg viewBox="0 0 900 180" role="img" aria-label="${quizMode ? "問題の" : rhythm.name + "の"}6秒幅の模式心電図。${live ? "波形が右から左に流れます。一時停止して観察できます。" : ""}${quizMode ? "視覚的な波形の読み取り問題です。" : rhythm.features.join("。")}">
    <defs><pattern id="${uid}-small" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M 6 0 H 0 V 6" fill="none" stroke="#edddda" stroke-width=".5"/></pattern><pattern id="${uid}" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="url(#${uid}-small)"/><path d="M 30 0 H 0 V 30" fill="none" stroke="#dec6c1" stroke-width=".7"/></pattern></defs>
    <rect width="900" height="180" fill="#fffcf9"/><rect width="900" height="180" fill="url(#${uid})"/>
    <polyline points="${waveform(id)}" fill="none" stroke="#23594e" stroke-width="2.1" stroke-linejoin="round"/>
    </svg>${compact ? "" : '<div class="strip-meta"><span>模式波形 · 6秒幅</span><span>25 mm/秒相当 · 10 mm/mV相当</span></div>'}</div>`;
  return live ? `<div class="live-waveform" data-live="${id}" data-paused="${paused}">${graph}<div class="playback-controls"><button class="playback-button" data-playback>一時停止</button><label>再生速度 <select data-speed aria-label="再生速度"><option value="0.5">0.5倍</option><option value="1" selected>1倍</option><option value="2">2倍</option></select></label><span class="playback-status" data-live-status>再生中</span></div><p class="playback-note">速度変更は見た目の再生速度のみです。心拍数やマスの時間換算は変わりません。</p></div>` : graph;
}

function activatePlayback() {
  playbackCleanup();
  const cleanups = [];
  main.querySelectorAll("[data-live]").forEach(root => {
    const line = root.querySelector("polyline");
    const toggle = root.querySelector("[data-playback]");
    const speedSelect = root.querySelector("[data-speed]");
    let playing = root.dataset.paused !== "true" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let elapsed = 0;
    let segment = 0;
    let speed = 1;
    let last = performance.now();
    let frame = 0;
    line.setAttribute("points", waveform(root.dataset.live, { duration: 12 }));
    function status() {
      root.dataset.playing = String(playing);
      toggle.textContent = playing ? "一時停止" : "再生";
      root.querySelector("[data-live-status]").textContent = playing ? "再生中" : "停止中";
    }
    function tick(now) {
      elapsed += Math.max(0, Math.min((now - last) / 1000, 0.1)) * speed;
      last = now;
      const nextSegment = Math.floor(elapsed / 6) * 6;
      if (segment !== nextSegment) {
        segment = nextSegment;
        line.setAttribute("points", waveform(root.dataset.live, { start: segment, duration: 12 }));
      }
      line.setAttribute("transform", `translate(${-(elapsed - segment) * 150} 0)`);
      frame = requestAnimationFrame(tick);
    }
    function schedule() {
      cancelAnimationFrame(frame);
      last = performance.now();
      if (playing && !document.hidden) frame = requestAnimationFrame(tick);
      status();
    }
    toggle.addEventListener("click", () => { playing = !playing; schedule(); });
    speedSelect.addEventListener("change", () => { speed = Number(speedSelect.value); schedule(); });
    document.addEventListener("visibilitychange", schedule);
    schedule();
    cleanups.push(() => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", schedule);
    });
  });
  playbackCleanup = () => cleanups.forEach(cleanup => cleanup());
}

const heading = (eyebrow, title, description) => `<div class="page-heading"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div>`;
const button = (text, href, secondary = false) => `<a class="button ${secondary ? "secondary" : ""}" href="${href}">${text}<span aria-hidden="true">↗</span></a>`;

function home() {
  const s = stats(progress);
  const next = rhythms.find(r => !progress.read.includes(r.id)) || rhythms[0];
  main.innerHTML = `${heading("ECG EXAM · GRADE 4 PREPARATION", "流れる波形で、心電図検定の予習を。", "4級を目指す方へ。心電図の基本とモニター判読を、自分のペースで。")}
    ${storageNotice()}
    <section class="hero"><div class="hero-copy"><span class="pill">心電図検定4級の基礎予習 · 非公式</span><h2>流れる波形を、<br>根拠をもって読む。</h2><p>波形の意味、マスの数え方、リズムの見分け方。<br>基本を知って、10問のオリジナル問題で確かめよう。</p>${button("4級の予習を始める", "#exam")}${button("波形を学び始める", "#learn", true)}<small>公式問題・模擬試験ではありません · 学習記録はそのまま使えます</small></div><div class="hero-visual"><div class="visual-title"><span><i></i> NORMAL SINUS RHYTHM</span><span>75 <small>bpm</small></span></div>${strip("sinus", { compact: true, live: true })}<div class="visual-caption"><span>P</span><span>QRS</span><span>T</span></div><p>まずは正常なリズムを知ることから。</p></div></section>
    <section class="stats-grid" aria-label="学習状況">
      <div class="stat-card"><span class="stat-icon mint" aria-hidden="true">▤</span><div><p>学んだ波形</p><strong>${s.read}<small> / ${rhythms.length} 種類</small></strong></div></div>
      <div class="stat-card"><span class="stat-icon peach" aria-hidden="true">◇</span><div><p>クイズの正答率</p><strong>${s.count ? s.accuracy : "—"}<small>${s.count ? " %" : " まだ記録がありません"}</small></strong></div></div>
      <div class="stat-card"><span class="stat-icon lavender" aria-hidden="true">▥</span><div><p>学習した日数</p><strong>${s.days}<small> 日</small></strong></div></div>
    </section>
    <div class="home-columns"><section><div class="section-heading"><h2>今日の学習</h2><span class="muted">小さな積み重ねから</span></div><a class="lesson-feature" href="#learn/${next.id}"><div><span class="eyebrow">NEXT LESSON</span><h3>${next.name}</h3><p>${next.summary}</p><span class="text-link">波形とポイントを見る <span aria-hidden="true">→</span></span></div><div class="lesson-preview">${strip(next.id, { compact: true })}<span class="badge">${next.level}</span></div></a><div class="quiz-promo"><span class="promo-icon" aria-hidden="true">◇</span><div><h3>見て、考えて、理解を深めよう。</h3><p>5問の読み取りクイズ。回答後にポイントを確認できます。</p></div>${button("クイズに挑戦", "#quiz", true)}</div></section><section class="read-order"><div class="section-heading"><h2>読むときの、5つの視点</h2><span class="badge">基本</span></div><ol>${["心拍数：速い？ 遅い？", "リズム：R–R間隔は規則的？", "P波：見える？ QRSとの関係は？", "間隔：PRとQRSの幅は？", "全体：形やST–Tの変化は？"].map((text, i) => `<li><span>0${i + 1}</span>${text}</li>`).join("")}</ol><p>波形だけで決めず、<strong>患者の状態と合わせて</strong>考えることが大切です。</p></section></div>
    <section class="section-heading catalog-heading"><h2>波形ライブラリ</h2><a class="text-link" href="#learn">すべての波形を見る →</a></section><div class="mini-library">${rhythms.slice(0, 4).map(r => `<a href="#learn/${r.id}"><span class="badge">${r.category}</span><h3>${r.name}</h3><p>${r.english}</p>${strip(r.id, { compact: true })}</a>`).join("")}</div>`;
  activatePlayback();
}

function learn() {
  const categories = ["すべて", "基本", "不整脈", "伝導障害", "緊急波形"];
  main.innerHTML = `${heading("WAVEFORM LIBRARY", "波形を学ぶ", "正常との違いを見つけながら、読み取りの引き出しを増やしましょう。")}
    <div class="filters" aria-label="波形のカテゴリー">${categories.map(c => `<button class="filter ${filter === c ? "selected" : ""}" data-filter="${c}" aria-pressed="${filter === c}">${c}</button>`).join("")}</div>
    <div class="library-grid">${rhythms.filter(r => filter === "すべて" || r.category === filter).map(r => `<a class="library-card" href="#learn/${r.id}"><div class="card-top"><span class="badge ${r.category === "緊急波形" ? "warm" : ""}">${r.category}</span>${progress.read.includes(r.id) ? '<span class="completed">✓ 学習済み</span>' : '<span class="muted">約3分</span>'}</div>${strip(r.id, { compact: true })}<h2>${r.name}</h2><p class="english">${r.english}</p><p>${r.summary}</p><span class="text-link">ポイントを学ぶ →</span></a>`).join("")}</div>`;
  main.querySelectorAll("[data-filter]").forEach(el => el.addEventListener("click", () => {
    filter = el.dataset.filter;
    learn();
    main.querySelector(`[data-filter="${filter}"]`).focus();
  }));
}

function lesson(id) {
  const r = rhythms.find(item => item.id === id);
  if (!r) return notFound();
  main.innerHTML = `<a class="back-link" href="#learn">← 波形ライブラリ</a>${heading(r.english, r.name, r.summary)}
    ${storageNotice()}<section class="panel waveform-panel"><div class="section-heading"><h2>流れる波形を観察しよう</h2><span class="badge">${r.rateLabel || (r.rate ? "模式図の心拍数 " + r.rate + " 回/分" : "心拍数の算出はできません")}</span></div>${strip(r.id, { live: true })}<p class="muted">学習用に特徴を強調した模式図です。実際の波形は誘導・患者の状態によって異なります。</p></section>
    <div class="lesson-columns"><section class="panel"><span class="eyebrow">LOOK FOR</span><h2>読み取りのポイント</h2><ul class="feature-list">${r.features.map(f => `<li><span aria-hidden="true">✓</span>${f}</li>`).join("")}</ul><p>${r.explanation}</p></section><section class="panel observation"><span class="eyebrow">NURSING VIEW</span><h2>観察につなげる</h2><p>${r.observation}</p><div class="tip"><strong>覚えておきたいこと</strong><p>${r.tip}</p></div></section></div>
    <div class="lesson-actions"><button class="button" id="mark-read">${progress.read.includes(id) ? "✓ 学習済み" : "この波形を学習済みにする"}</button>${button("クイズで確かめる", "#quiz", true)}</div><p class="muted">解説の参考：<a href="#sources">MSDマニュアルなど</a>。教育用コンテンツで、医療専門家による監修は未実施です。</p>`;
  main.querySelector("#mark-read").addEventListener("click", () => {
    progress.read = [...new Set([...progress.read, id])];
    progress.days = [...new Set([...progress.days, localDay()])];
    save();
    lesson(id);
    main.querySelector("#mark-read").focus();
  });
  activatePlayback();
}

function quizStart() {
  playbackCleanup();
  main.innerHTML = `${heading("PRACTICE MAKES PROGRESS", "読み取りクイズ", "波形を見て、特徴を考える。間違えたところが、次の学びになります。")}${storageNotice()}
    <section class="panel quiz-intro"><span class="large-symbol" aria-hidden="true">◇</span><h2>今日の5問、やってみよう。</h2><p>${rhythms.length}種類の波形からランダムに5問出題します。<br>各問題は4択。回答すると解説が表示されます。</p><div class="quiz-facts"><span>5問</span><span>時間制限なし</span><span>何度でも挑戦OK</span></div><button class="button" id="start-quiz">クイズを始める <span aria-hidden="true">→</span></button><p class="muted">波形の見た目を使う問題です。模式図の特徴を学ぶ練習であり、診断能力を評価するものではありません。</p></section>`;
  main.querySelector("#start-quiz").addEventListener("click", () => {
    quiz = { questions: makeQuiz(), index: 0, choices: [] };
    quizQuestion();
    main.focus();
  });
}

function examStart() {
  playbackCleanup();
  main.innerHTML = `${heading("GRADE 4 · FOUNDATION PRACTICE", "心電図検定4級の基礎予習", "流れる模式波形と基礎知識で、判読の土台をつくりましょう。")}${storageNotice()}
    <section class="panel exam-overview"><span class="badge">非公式・オリジナル問題</span><h2>まずは10問、理解を確かめよう。</h2><p>基礎知識5問＋モニター判読5問。各問5択で、回答後に解説を確認できます。時間制限はなく、波形を止めて考えても大丈夫です。</p><div class="quiz-facts"><span>波形の意味</span><span>マス・心拍数・間隔</span><span>流れる波形の判読</span></div><button class="button" id="start-exam">10問の予習を始める →</button>
    <div class="tip"><strong>本試験とは形式・範囲が異なります</strong><p>学会の公式案内では4級は50問・70分程度です。モニター心電図に加え、ホルター・12誘導心電図の基本所見も含まれます。このアプリはその一部を学ぶ補助教材で、合格を保証するものではありません。</p><a class="text-link" href="https://new.jhrs.or.jp/recognition/kentei-05/" target="_blank" rel="noopener noreferrer">日本不整脈心電学会：各級の説明 ↗</a></div></section>
    <section class="panel exam-foundations"><h2>先に押さえたい基礎</h2><div class="foundation-grid">${basics.map(q => `<details><summary><span class="badge">${q.topic}</span>${q.title}</summary><p>${q.explanation}</p></details>`).join("")}</div></section>`;
  main.querySelector("#start-exam").addEventListener("click", () => {
    examQuiz = { mode: "exam", questions: makeExamQuiz(), index: 0, choices: [] };
    quizQuestion(examQuiz);
    main.focus();
  });
}

function quizQuestion(session = quiz) {
  if (!session || session.index >= session.questions.length) return quizResult(session);
  const question = session.questions[session.index];
  const { rhythm: r, options } = question;
  const correctId = question.correctId || r.id;
  const choice = session.choices[session.index];
  const answered = choice !== undefined;
  main.innerHTML = `${heading(session.mode === "exam" ? "GRADE 4 · ORIGINAL PRACTICE" : "READ THE RHYTHM", question.title || "この波形は、どのリズム？", r ? "心拍数、規則性、P波、QRSの幅の順に見てみましょう。" : "基礎知識を確認するオリジナル問題です。")}${storageNotice()}
    <section class="panel quiz-panel"><div class="section-heading"><h2>QUESTION ${String(session.index + 1).padStart(2, "0")}</h2><span class="muted">${question.topic || "波形判読"} · ${session.index + 1} / ${session.questions.length} 問</span></div><div class="progress-track"><div style="width:${(session.index + 1) / session.questions.length * 100}%"></div></div>${r ? strip(r.id, { quizMode: true, live: true, paused: answered }) : '<div class="knowledge-prompt"><span aria-hidden="true">▤</span>波形の意味や測定の基本を、言葉で確かめましょう。</div>'}
    <div class="answers" role="group" aria-label="回答の選択肢">${options.map((o, i) => `<button class="answer ${answered && o.id === correctId ? "correct" : ""} ${answered && choice === o.id && choice !== correctId ? "incorrect" : ""}" data-answer="${o.id}" ${answered ? "disabled" : ""}><span class="answer-letter">${"ABCDE"[i]}</span>${o.name}${answered && o.id === correctId ? '<span class="answer-marker">✓ 正解</span>' : answered && choice === o.id ? '<span class="answer-marker">あなたの回答</span>' : ""}</button>`).join("")}</div>
    ${answered ? `<div class="feedback" role="status"><h3>${choice === correctId ? "正解です！" : "ここが学びのポイント。"} 正解は「${options.find(o => o.id === correctId).name}」</h3><p>${r ? r.explanation : question.explanation}</p>${r ? `<ul>${r.features.map(f => `<li>${f}</li>`).join("")}</ul><p class="feedback-tip">${r.tip}</p><a class="text-link" href="#learn/${r.id}">詳しい解説を見る →</a>` : ""}</div><button class="button next-question" id="next-question">${session.index + 1 === session.questions.length ? "結果を見る" : "次の問題へ"} →</button>` : '<p class="muted">選択肢を選ぶと回答が確定します。</p>'}</section>`;
  main.querySelectorAll("[data-answer]").forEach(el => el.addEventListener("click", () => {
    if (session.choices[session.index] !== undefined) return;
    session.choices[session.index] = el.dataset.answer;
    progress = recordAnswer(progress, question.id || r.id, el.dataset.answer === correctId);
    save();
    quizQuestion(session);
    main.querySelector("#next-question").focus();
  }));
  main.querySelector("#next-question")?.addEventListener("click", () => {
    session.index++;
    quizQuestion(session);
    main.focus();
  });
  activatePlayback();
}

function quizResult(session = quiz) {
  playbackCleanup();
  if (!session) return quizStart();
  const isCorrect = (q, i) => (q.correctId || q.rhythm.id) === session.choices[i];
  const correct = session.questions.filter(isCorrect).length;
  main.innerHTML = `${heading("A LITTLE BETTER, EVERY DAY", "おつかれさまでした！", "正解も、間違いも、次に読むときの力になります。")}${storageNotice()}
    <section class="panel result-panel"><span class="eyebrow">${session.mode === "exam" ? "4級基礎予習 · 合否判定ではありません" : "今回の結果"}</span><div class="result-score">${correct}<small> / ${session.questions.length}</small></div><h2>${correct === session.questions.length ? "すべて正解。いい調子です！" : "解説を振り返って、理解を確かめよう。"}</h2><div class="result-list">${session.questions.map((q, i) => q.rhythm ? `<a href="#learn/${q.rhythm.id}"><span class="${isCorrect(q, i) ? "completed" : "wrong"}">${isCorrect(q, i) ? "✓ 正解" : "↻ 復習"}</span><span>${q.rhythm.name}</span><span aria-hidden="true">→</span></a>` : `<details class="result-knowledge"><summary><span class="${isCorrect(q, i) ? "completed" : "wrong"}">${isCorrect(q, i) ? "✓ 正解" : "↻ 復習"}</span>${q.title}</summary><p>${q.explanation}</p></details>`).join("")}</div><div class="lesson-actions"><button class="button" id="retry">もう一度挑戦する</button>${button("学習の記録を見る", "#progress", true)}</div></section>`;
  main.querySelector("#retry").addEventListener("click", () => {
    if (session.mode === "exam") { examQuiz = null; examStart(); }
    else { quiz = null; quizStart(); }
    main.focus();
  });
}

function progressPage() {
  const s = stats(progress);
  main.innerHTML = `${heading("YOUR LEARNING JOURNEY", "学習の記録", "積み重ねた学びを振り返って、次の一歩を見つけましょう。")}${storageNotice()}
    <section class="stats-grid"><div class="stat-card"><div><p>解いた問題</p><strong>${s.count}<small> 問</small></strong></div></div><div class="stat-card"><div><p>クイズ正答率</p><strong>${s.count ? s.accuracy + "<small> %</small>" : "—"}</strong></div></div><div class="stat-card"><div><p>学習日数</p><strong>${s.days}<small> 日</small></strong></div></div></section>
    <section class="panel"><div class="section-heading"><h2>波形ごとの理解を確認</h2><span class="badge">${s.read} / ${rhythms.length} 学習済み</span></div><div class="progress-track"><div style="width:${s.read / rhythms.length * 100}%"></div></div><div class="rhythm-progress">${rhythms.map(r => {
      const answers = progress.answers.filter(a => a.id === r.id);
      const correct = answers.filter(a => a.correct).length;
      return `<a href="#learn/${r.id}"><div><strong>${r.name}</strong><small>${r.category}</small></div><span class="${progress.read.includes(r.id) ? "completed" : "muted"}">${progress.read.includes(r.id) ? "✓ 学習済み" : "未学習"}</span><span class="muted">${answers.length ? `${correct} / ${answers.length} 問正解` : "クイズ未回答"}</span><span aria-hidden="true">→</span></a>`;
    }).join("")}</div></section>
    <section class="panel exam-foundations"><div class="section-heading"><h2>検定予習の基礎知識</h2><a class="text-link" href="#exam">基礎を復習する →</a></div><div class="basic-progress">${basics.map(q => {
      const answers = progress.answers.filter(a => a.id === q.id);
      return `<div><strong>${q.title}</strong><span class="muted">${answers.length ? `${answers.filter(a => a.correct).length} / ${answers.length} 問正解` : "未回答"}</span></div>`;
    }).join("")}</div></section>
    <div class="record-note"><p>記録はこの端末・ブラウザにのみ保存されます。アカウント登録や他端末との同期はありません。ブラウザのデータを消去すると記録も消えます。</p><button class="text-button" id="reset-progress">学習記録をリセット</button></div><dialog id="reset-dialog"><h2>学習記録をリセットしますか？</h2><p>学習済みの波形・クイズの回答・学習日数がすべて消去されます。この操作は取り消せません。</p><div class="lesson-actions"><button class="button secondary" id="cancel-reset">キャンセル</button><button class="button danger" id="confirm-reset">リセットする</button></div></dialog>`;
  const dialog = main.querySelector("#reset-dialog");
  main.querySelector("#reset-progress").addEventListener("click", () => dialog.showModal());
  main.querySelector("#cancel-reset").addEventListener("click", () => dialog.close());
  main.querySelector("#confirm-reset").addEventListener("click", () => {
    progress = emptyProgress();
    quiz = null;
    examQuiz = null;
    save();
    dialog.close();
    progressPage();
    main.focus();
  });
}

function sources() {
  main.innerHTML = `${heading("ABOUT ECG NOTE", "参考資料・このアプリについて", "安心して学ぶために、できることと限界を知っておきましょう。")}
    <section class="panel exam-overview"><h2>心電図検定4級の基礎予習について</h2><p>本アプリは日本不整脈心電学会の公式教材ではなく、公式問題を転載していません。基礎知識とモニター判読のオリジナル練習で、試験範囲全体を網羅しません。流れる波形は観察の練習用で、本試験の表示形式を再現するものではありません。</p><p>4級の公式案内は50問・70分程度で、ホルター・12誘導心電図の基本所見も含まれます。最新情報は<a class="text-link" href="https://new.jhrs.or.jp/recognition/kentei-05/" target="_blank" rel="noopener noreferrer">日本不整脈心電学会「各級の説明」 ↗</a>で確認してください。</p></section>
    <section class="panel prose"><h2>看護の学びのための、最初の一歩</h2><p>このアプリは看護学生・看護師向けに、基本的なリズムの特徴を学ぶ教育用プロトタイプです。${rhythms.length}種類の模式波形を収録しています。12誘導心電図の系統的判読、虚血や心筋梗塞の評価などを網羅するものではありません。</p><h2>学習用であり、医療機器ではありません</h2><p>波形はプログラムで生成した模式図で、実患者の記録ではありません。形や間隔は特徴を学ぶための近似表現です。表示倍率によって画面上のマスの物理サイズは変わります。実患者の診断・治療・緊急度判断には使用できません。クイズの正答率は臨床能力の評価ではありません。</p><p>医療専門家による監修は未実施です。実習・臨床では指導者や施設の手順、最新のガイドラインで確認してください。</p><h2>解説の参考資料</h2><ul><li><a href="https://www.msdmanuals.com/professional/cardiovascular-disorders/cardiovascular-tests-and-procedures/electrocardiography" target="_blank" rel="noopener noreferrer">MSD Manual Professional — Electrocardiography ↗</a></li><li><a href="https://www.msdmanuals.com/professional/multimedia/table/interpretation-of-abnormal-ecgs" target="_blank" rel="noopener noreferrer">MSD Manual Professional — Interpretation of Abnormal ECGs ↗</a></li><li><a href="https://www.merckmanuals.com/professional/cardiovascular-disorders/specific-cardiac-arrhythmias/atrioventricular-block" target="_blank" rel="noopener noreferrer">Merck Manual Professional — Atrioventricular Block ↗</a></li><li><a href="https://ecgwaves.com/articles/premature-atrial-contraction-beat-complex" target="_blank" rel="noopener noreferrer">ECG & ECHO — Premature atrial contraction ↗</a></li><li><a href="https://professional.heart.org/en/guidelines-and-statements" target="_blank" rel="noopener noreferrer">American Heart Association — Guidelines and Statements ↗</a></li></ul><p>上記は理解を深めるための参考資料です。外部資料の図版や文章の転載ではありません。</p><h2>保存するデータ</h2><p>学習済みの波形、クイズの正誤と回答日時、学習日をブラウザ内に保存します。患者情報の入力・画像アップロード機能はありません。学習データのサーバー送信も行いません。</p></section>`;
}

function notFound() {
  main.innerHTML = `${heading("PAGE NOT FOUND", "ページが見つかりません", "波形ライブラリから学習したい波形を選んでください。")}${button("波形ライブラリへ", "#learn")}`;
}

function route() {
  playbackCleanup();
  const [page = "home", id] = (location.hash.slice(1) || "home").split("/");
  document.querySelectorAll("[data-nav]").forEach(el => {
    const active = el.dataset.nav === page;
    el.classList.toggle("active", active);
    if (active) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  if (page === "home") home();
  else if (page === "learn") id ? lesson(id) : learn();
  else if (page === "quiz") quiz ? quizQuestion() : quizStart();
  else if (page === "exam") examQuiz ? quizQuestion(examQuiz) : examStart();
  else if (page === "progress") progressPage();
  else if (page === "sources") sources();
  else notFound();
  document.title = `${main.querySelector("h1")?.textContent || "学習"} | ECG NOTE`;
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

window.addEventListener("hashchange", route);
route();
