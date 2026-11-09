export const rhythms = [
  {
    id: "sinus", name: "正常洞調律", english: "Normal sinus rhythm", category: "基本", level: "はじめの一歩", rate: 75,
    summary: "まずは「正常」を知る。すべての読み取りの出発点。",
    features: ["R–R間隔が規則的", "各QRSの前に同じ形のP波がある", "心拍数60〜100回/分、PR間隔0.12〜0.20秒"],
    explanation: "洞結節からの刺激が、心房から心室へ順に伝わる基本のリズムです。P波 → QRS波 → T波の順序と、規則的なR–R間隔を確認しましょう。",
    observation: "波形だけでなく、脈拍・自覚症状・バイタルサインも合わせて観察します。",
    tip: "規則的な波形なら、心拍数の概算は「300 ÷ R–R間の大きなマス数」。記録速度25 mm/秒の場合に使えます。"
  },
  {
    id: "brady", name: "洞性徐脈", english: "Sinus bradycardia", category: "基本", level: "はじめの一歩", rate: 45,
    summary: "P波とQRSの関係は正常。違いは、ゆっくりしたリズム。",
    features: ["心拍数60回/分未満", "R–R間隔は規則的", "各QRSの前にP波がある"],
    explanation: "洞調律の特徴を保ちながら心拍数が少ないリズムです。睡眠中などにも見られ、心拍数だけでは異常の重症度を判断できません。",
    observation: "めまい・失神・血圧低下などの有無と、普段の心拍数や薬剤の影響を確認します。症状がある場合は速やかに報告します。",
    tip: "「遅い」だけでなく、P波がQRSに先行しているかも確認しましょう。"
  },
  {
    id: "tachy", name: "洞性頻脈", english: "Sinus tachycardia", category: "基本", level: "はじめの一歩", rate: 120,
    summary: "規則的だけれど速い。リズムと背景を一緒に見る。",
    features: ["心拍数100回/分超", "R–R間隔は規則的", "各QRSの前にP波がある"],
    explanation: "洞結節からの刺激が通常より速く発生するリズムです。運動・発熱・痛みなど、さまざまな背景で生じます。",
    observation: "体温、痛み、呼吸状態、血圧、活動状況などを確認し、原因を考えるための情報を集めます。",
    tip: "速い波形ではP波が前のT波に近づきます。P波を丁寧に探しましょう。"
  },
  {
    id: "af", name: "心房細動", english: "Atrial fibrillation · AF", category: "不整脈", level: "ステップアップ", rate: 96,
    summary: "不規則なR–R間隔と、はっきりしないP波が手がかり。",
    features: ["R–R間隔が不規則（絶対性不整）", "明瞭で一定のP波を認めない", "心室応答の速さはさまざま"],
    explanation: "心房の電気活動が無秩序となるリズムです。基線に細かい揺れが見られることもあります。P波の有無とR–R間隔を組み合わせて見ます。",
    observation: "動悸、息切れ、血圧、脈拍などを観察します。脈拍数と心電図上の心拍数が一致しないこともあります。",
    tip: "不規則なリズムでは「300 ÷ マス数」は適しません。6秒間のQRS数 × 10で心拍数を概算できます。"
  },
  {
    id: "flutter", name: "心房粗動", english: "Atrial flutter · AFL", category: "不整脈", level: "ステップアップ", rate: 75,
    summary: "基線に並ぶ鋸歯状のF波に注目。",
    features: ["鋸歯状の粗動波（F波）", "心房の活動は速く規則的", "房室伝導比が一定ならR–R間隔も規則的"],
    explanation: "心房が速く規則的に興奮するリズムです。この模式図は心房約300回/分、4：1伝導、心室約75回/分を表します。伝導比によって心室の速さや規則性が変わります。",
    observation: "心室の速さ、症状、血圧などを観察し、心房細動と同様に臨床情報と合わせて確認します。",
    tip: "QRS間の基線をよく見ると、繰り返すF波を見つけやすくなります。"
  },
  {
    id: "pac", name: "心房性期外収縮", english: "Premature atrial contraction · PAC", category: "不整脈", level: "ステップアップ", rate: 75,
    rateLabel: "基本調律75回/分（期外収縮あり）",
    summary: "予定より早く現れる、形の違うP波に注目。",
    features: ["通常より早いタイミングのP波", "早期のP波は洞性P波と形が異なる", "伝導された場合、通常は幅の狭いQRSが続く"],
    explanation: "洞結節以外の心房から刺激が早く発生するリズムです。この模式図では1拍だけ、形の違うP波と狭いQRSが早く現れ、その後に間が空きます。休止は通常、完全な代償性休止ではありません。早すぎる刺激ではQRSが続かない場合もあります。",
    observation: "動悸や脈の不規則さ、出現頻度、症状、バイタルサインを確認します。波形の変化や症状がある場合は報告します。",
    tip: "早い拍を見つけたら、その直前のP波を探しましょう。P波が前のT波に重なることもあります。"
  },
  {
    id: "pvc", name: "心室性期外収縮", english: "Premature ventricular contraction · PVC", category: "不整脈", level: "ステップアップ", rate: 75,
    rateLabel: "基本調律75回/分（期外収縮あり）",
    summary: "早く出る幅広いQRSと、その後の休止が手がかり。",
    features: ["予定より早く現れる幅広いQRS", "期外収縮の直前に関連するP波を認めない", "通常、完全な代償性休止を伴う"],
    explanation: "心室から刺激が早く発生するリズムです。この模式図は、正常な拍の間に1拍の幅広いQRSが入り、その後に完全な代償性休止を伴う例です。実際には休止を伴わない場合もあり、QRSの形や前後のリズムを合わせて確認します。",
    observation: "単発か連発か、出現頻度、形の変化、動悸・胸部症状・血圧などを観察します。連発や症状を伴う変化は速やかに報告します。",
    tip: "完全な代償性休止では、期外収縮の直前と直後の正常QRS間が、通常のR–R間隔の約2倍になります。"
  },
  {
    id: "svt", name: "上室頻拍", english: "Supraventricular tachycardia · SVT", category: "不整脈", level: "ステップアップ", rate: 180,
    summary: "幅の狭いQRSが速く規則的に並ぶ頻拍。",
    features: ["速く規則的なリズム", "この模式図ではQRS幅が狭い", "P波がQRSに隠れるなど、見えにくいことがある"],
    explanation: "上室に由来する頻拍のうち、規則的な狭いQRSの例です。上室頻拍には複数の機序があり、P波の見え方も異なります。この単一の模式波形だけでは、房室結節リエントリー性頻拍などの機序や洞性頻脈との鑑別を確定できません。",
    observation: "動悸、胸部症状、息切れ、血圧、意識状態、発症の経過を確認します。状態の悪化があれば応援を要請し、施設の手順に従います。",
    tip: "「速く、規則的で、QRSが狭い」を言葉にしてみましょう。実際の鑑別には12誘導心電図や臨床情報が必要です。"
  },
  {
    id: "avblock", name: "1度房室ブロック", english: "First-degree AV block", category: "伝導障害", level: "ステップアップ", rate: 75,
    summary: "すべて伝わっているけれど、P波からQRSまでが長い。",
    features: ["PR間隔が0.20秒を超える", "各P波にQRSが続く（1：1伝導）", "PR間隔は一定"],
    explanation: "心房から心室への伝導に時間がかかる状態です。この模式図ではPR間隔を約0.28秒にしています。QRSの脱落はありません。",
    observation: "症状の有無、薬剤、過去の心電図などを確認します。所見だけで緊急性を決めず、変化も合わせて見ます。",
    tip: "PR間隔は「P波の始まりからQRSの始まり」まで。P波の頂点からではありません。"
  },
  {
    id: "mobitz1", name: "2度房室ブロック（Wenckebach型）", english: "Second-degree AV block · Mobitz I", category: "伝導障害", level: "ステップアップ", rate: 56,
    rateLabel: "心房75回/分・心室平均約56回/分",
    summary: "PR間隔が少しずつ延び、ついにQRSが1拍抜ける。",
    features: ["P–P間隔は規則的", "PR間隔が徐々に延長し、QRSが脱落する", "脱落後は短いPR間隔から繰り返す"],
    explanation: "心房から心室への伝導が徐々に遅くなり、ついにP波にQRSが続かなくなるパターンです。この模式図は4つのP波のうち3つが伝導する例です。QRSが抜けてもP波は規則的に続く点に注目しましょう。",
    observation: "脈拍、血圧、めまい・失神などの症状、伝導の変化を観察します。症状や血圧低下を伴う場合は速やかに報告します。",
    tip: "「延びる、延びる、抜ける」。R–R間隔だけでなく、各P波からQRSまでを順に追いましょう。"
  },
  {
    id: "mobitz2", name: "2度房室ブロック（Mobitz II型）", english: "Second-degree AV block · Mobitz II", category: "伝導障害", level: "重要な波形", rate: 56,
    rateLabel: "心房75回/分・心室平均約56回/分",
    summary: "伝導している拍のPR間隔は一定。突然QRSが抜ける。",
    features: ["P–P間隔は規則的", "伝導している拍のPR間隔は一定", "PR間隔の段階的延長なしにQRSが脱落する"],
    explanation: "伝導している拍のPR間隔は変わらないまま、一部のP波が心室へ伝わらなくなるパターンです。この模式図は4：3伝導の例で、QRSを狭く表現していますが、実際には幅広いQRSを伴うことが多くあります。2：1伝導だけではI型とII型を区別できないことにも注意します。",
    observation: "より高度な伝導障害に進行するおそれがあります。患者の状態を確認して速やかに報告し、症状や状態の悪化があれば施設の緊急対応手順に従います。",
    tip: "Wenckebach型との違いは、脱落前のPR間隔が「徐々に延びるか、一定か」です。"
  },
  {
    id: "completeblock", name: "3度房室ブロック（完全房室ブロック）", english: "Third-degree / complete AV block", category: "伝導障害", level: "重要な波形", rate: 40,
    rateLabel: "心房75回/分・心室40回/分",
    summary: "P波とQRSが、それぞれ独立したリズムで進む。",
    features: ["P波とQRSの間に一定の伝導関係がない", "P–P間隔とR–R間隔はそれぞれ規則的", "心室は心房より遅い補充調律で動く"],
    explanation: "心房から心室への刺激が伝わらず、心房と心室が独立して活動する状態です。この模式図は心房75回/分、心室40回/分の狭いQRSの補充調律です。補充調律の発生部位によって、QRS幅や心室の速さは変わります。",
    observation: "脈拍、血圧、意識状態、めまい・失神などを直ちに確認して速やかに報告します。状態の悪化があれば応援を要請し、施設の緊急対応手順に従います。",
    tip: "P波だけ、QRSだけを別々に追ってみましょう。たまたまP波の直後にQRSがあっても、一定の関係が続くとは限りません。"
  },
  {
    id: "vt", name: "心室頻拍", english: "Ventricular tachycardia · VT", category: "緊急波形", level: "重要な波形", rate: 180,
    summary: "幅広いQRSが速く連続する、見逃したくない波形。",
    features: ["幅広いQRSが連続する", "通常、速く比較的規則的", "P波とQRSの関係が明瞭でないことがある"],
    explanation: "心室に由来する速いリズムです。幅広いQRSの頻拍には他の原因もあり、実際の鑑別には12誘導心電図などが必要です。この模式図は単形性心室頻拍を表します。",
    observation: "実際の現場では患者の反応・呼吸・脈拍などを直ちに確認し、応援を要請して施設の緊急対応手順に従います。波形だけで脈の有無は判断できません。",
    tip: "「幅広く、速い」に気づくことが第一歩。モニターだけでなく患者を見ましょう。"
  },
  {
    id: "vf", name: "心室細動", english: "Ventricular fibrillation · VF", category: "緊急波形", level: "重要な波形", rate: null,
    summary: "整ったQRSがなく、無秩序に揺れる波形。",
    features: ["識別できるQRSがない", "振幅と周期が無秩序", "有効な心室収縮が失われる致死的不整脈"],
    explanation: "心室が無秩序に電気活動を起こし、有効な血液の拍出ができない状態です。体動や電極の異常によるアーチファクトと似る場合もあります。",
    observation: "実際の現場では患者の反応・呼吸などを直ちに確認し、応援を要請して施設の蘇生手順に従います。アーチファクトの確認だけで緊急対応を遅らせないことが大切です。",
    tip: "模式図を覚えるだけでなく、「患者の状態を直ちに確認する」ことと結びつけて学びましょう。"
  }
];

const gaussian = (x, center, width, height) => height * Math.exp(-0.5 * ((x - center) / width) ** 2);
const afBeats = [0.38, 1.04, 1.49, 2.31, 2.83, 3.54, 4.02, 4.91, 5.47, 6.16];

function beatTimes(first, interval, start, end) {
  const from = Math.max(0, Math.floor((start - 1 - first) / interval));
  const to = Math.ceil((end + 1 - first) / interval);
  return Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => first + (from + i) * interval);
}

function repeatTimes(times, period, start, end) {
  return beatTimes(0, period, start, end).flatMap(offset => times.map(time => time + offset)).filter(time => time >= start - 1 && time <= end + 1);
}

function specialPattern(id, start, end) {
  if (id === "pac" || id === "pvc") {
    const cycle = id === "pac" ? 7.1 : 6.4;
    const times = repeatTimes(id === "pac" ? [0.4, 1.2, 2, 2.5, 3.5, 4.3, 5.1, 5.9, 6.7] : [0.4, 1.2, 2, 2.5, 3.6, 4.4, 5.2, 6], cycle, start, end);
    const premature = time => Math.abs(((time % cycle) + cycle) % cycle - 2.5) < 0.001;
    return {
      atrial: times.flatMap(time => id === "pvc" && premature(time) ? [] : [{ time: time - 0.14, height: id === "pac" && premature(time) ? -0.18 : 0.14 }]),
      ventricular: times.map(time => ({ time, wide: id === "pvc" && premature(time) }))
    };
  }
  if (id === "mobitz1" || id === "mobitz2" || id === "completeblock") {
    const atrial = beatTimes(0.2, 0.8, start, end).map(time => ({ time, height: 0.14 }));
    const ventricular = id === "completeblock"
      ? beatTimes(0.65, 1.5, start, end).map(time => ({ time, wide: false }))
      : atrial.flatMap(p => {
        const phase = Math.round((p.time - 0.2) / 0.8) % 4;
        return phase === 3 ? [] : [{ time: p.time + 0.14 + (id === "mobitz1" ? phase * 0.06 : 0), wide: false }];
      });
    return { atrial, ventricular };
  }
  if (id === "svt") {
    return { atrial: [], ventricular: beatTimes(0.25, 1 / 3, start, end).map(time => ({ time, wide: false })) };
  }
  return null;
}

function narrowComplex(t, beat) {
  return gaussian(t, beat - 0.018, 0.006, -0.15) + gaussian(t, beat, 0.008, 1) + gaussian(t, beat + 0.023, 0.008, -0.24) + gaussian(t, beat + 0.23, 0.046, 0.26);
}

function wideComplex(t, beat) {
  return gaussian(t, beat - 0.04, 0.028, -0.35) + gaussian(t, beat + 0.02, 0.044, 1.1) + gaussian(t, beat + 0.10, 0.034, -0.7);
}

// Generate a continuous timeline rather than looping a six-second strip.
export function waveform(id, { start = 0, duration = 6 } = {}) {
  const rhythm = rhythms.find(item => item.id === id);
  if (!rhythm) throw new Error("Unknown rhythm");
  if (!Number.isFinite(start) || start < 0 || !Number.isFinite(duration) || duration <= 0 || duration > 30) throw new Error("Invalid waveform window");
  const end = start + duration;
  const beats = id === "af" ? repeatTimes(afBeats, 6.4, start, end) : beatTimes(0.4, 60 / (rhythm.rate || 75), start, end);
  const pattern = specialPattern(id, start, end);
  const points = [];
  for (let x = 0; x <= Math.round(duration * 150); x += 1) {
    const t = start + x / 150;
    let v = 0;
    if (pattern) {
      for (const p of pattern.atrial) v += gaussian(t, p.time, 0.025, p.height);
      for (const beat of pattern.ventricular) {
        v += beat.wide ? wideComplex(t, beat.time) + gaussian(t, beat.time + 0.25, 0.05, -0.25) : narrowComplex(t, beat.time);
      }
    } else if (id === "vf") {
      v = (0.45 + 0.2 * Math.sin(t * 2.7)) * Math.sin(t * 24 + 1.5 * Math.sin(t * 7)) + 0.15 * Math.sin(t * 53);
    } else {
      if (id === "af") v = 0.035 * Math.sin(t * 77) + 0.022 * Math.sin(t * 113);
      if (id === "flutter") v = 0.22 * (2 * ((t * 5) % 1) - 1);
      for (const beat of beats) {
        if (id === "vt") {
          v += wideComplex(t, beat);
        } else {
          if (!["af", "flutter"].includes(id)) v += gaussian(t, beat - (id === "avblock" ? 0.26 : 0.14), 0.025, 0.14);
          v += narrowComplex(t, beat);
        }
      }
    }
    points.push(`${x},${(100 - v * 60).toFixed(2)}`);
  }
  return points.join(" ");
}

export function emptyProgress() {
  return { read: [], answers: [], days: [] };
}

export function normalizeProgress(value) {
  if (!value || typeof value !== "object") return emptyProgress();
  const validId = id => rhythms.some(r => r.id === id);
  return {
    read: [...new Set(Array.isArray(value.read) ? value.read.filter(validId) : [])],
    answers: Array.isArray(value.answers) ? value.answers.filter(a => a && validQuestion(a.id) && typeof a.correct === "boolean" && typeof a.date === "string").map(a => ({ id: a.id, correct: a.correct, date: a.date })) : [],
    days: [...new Set(Array.isArray(value.days) ? value.days.filter(d => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) : [])]
  };
}

export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function recordAnswer(progress, id, correct, date = new Date()) {
  if (!validQuestion(id) || typeof correct !== "boolean") throw new Error("Invalid answer");
  const day = localDay(date);
  return { ...progress, answers: [...progress.answers, { id, correct, date: date.toISOString() }], days: [...new Set([...progress.days, day])] };
}

export function stats(progress) {
  const count = progress.answers.length;
  return { count, correct: progress.answers.filter(a => a.correct).length, accuracy: count ? Math.round(progress.answers.filter(a => a.correct).length / count * 100) : 0, read: progress.read.length, days: progress.days.length };
}

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function makeQuiz(pool = rhythms, count = 5) {
  return shuffle(pool).slice(0, count).map(rhythm => ({
    rhythm,
    options: shuffle([rhythm, ...shuffle(rhythms.filter(r => r.id !== rhythm.id)).slice(0, 3)])
  }));
}

export const basics = [
  { id: "basic-p", topic: "波形の意味", title: "P波が表す電気活動はどれ？", choices: ["心房の脱分極", "心室の脱分極", "心室の再分極", "房室伝導の時間", "心室収縮の機械的な強さ"], explanation: "P波は心房の脱分極を表します。QRSは心室の脱分極、T波は心室の再分極です。心電図は電気活動の記録で、収縮の強さを直接示すものではありません。" },
  { id: "basic-qrs", topic: "波形の意味", title: "QRS波が主に表す電気活動はどれ？", choices: ["心室の脱分極", "心房の脱分極", "心室の再分極", "洞結節の活動を直接記録したもの", "血圧の変化"], explanation: "QRS波は心室の脱分極を表します。心室が興奮するタイミングを見る基本の波形です。" },
  { id: "basic-t", topic: "波形の意味", title: "T波が表す電気活動はどれ？", choices: ["心室の再分極", "心房の脱分極", "心室の脱分極", "房室伝導の遅延そのもの", "脈拍数の変化"], explanation: "T波は心室の再分極を表します。P → QRS → Tの順と、それぞれの意味を合わせて覚えましょう。" },
  { id: "basic-small", topic: "マスと時間", title: "記録速度25 mm/秒で、小さな1マス（1 mm）は何秒？", choices: ["0.04秒", "0.01秒", "0.10秒", "0.20秒", "1.00秒"], explanation: "1秒に25 mm進むため、1 mmは1 ÷ 25 = 0.04秒です。大きな1マス（5 mm）は0.20秒になります。" },
  { id: "basic-large", topic: "マスと時間", title: "記録速度25 mm/秒で、大きな1マス（5 mm）は何秒？", choices: ["0.20秒", "0.02秒", "0.04秒", "0.50秒", "1.00秒"], explanation: "大きな1マスは小さなマス5個分です。0.04秒 × 5 = 0.20秒。記録速度が違う場合は換算も変わります。" },
  { id: "basic-rate", topic: "心拍数", title: "規則的なリズムでR–R間隔が大きな4マス。25 mm/秒で心拍数は約いくつ？", choices: ["75回/分", "40回/分", "60回/分", "100回/分", "150回/分"], explanation: "規則的なリズムでは心拍数 ≒ 300 ÷ 大きなマス数。300 ÷ 4 = 75回/分です。不規則なリズムにはこの方法を使いません。" },
  { id: "basic-pr", topic: "間隔", title: "成人のPR間隔の基本的な正常範囲はどれ？", choices: ["0.12〜0.20秒", "0.02〜0.04秒", "0.04〜0.08秒", "0.30〜0.40秒", "0.50〜0.60秒"], explanation: "PR間隔はP波の始まりからQRSの始まりまでで、基本的な正常範囲は0.12〜0.20秒です。年齢や心拍数なども合わせて評価します。" },
  { id: "basic-width", topic: "間隔", title: "成人で「幅の狭いQRS」を判断する基本的な目安はどれ？", choices: ["0.12秒未満", "0.20秒以上", "0.30秒以上", "0.50秒以上", "QRS幅は測れない"], explanation: "QRS幅0.12秒未満を狭いQRSの目安とします。25 mm/秒なら小さな3マスが0.12秒です。QRSの始まりから終わりまでを測ります。" },
  { id: "basic-irregular", topic: "心拍数", title: "不規則なリズムで6秒間にQRSが9個ある。心拍数の概算は？", choices: ["90回/分", "9回/分", "45回/分", "60回/分", "150回/分"], explanation: "6秒間のQRS数 × 10で1分間の心拍数を概算します。9 × 10 = 90回/分です。短い区間の概算なので、変動が大きい場合はより長い記録も確認します。" },
  { id: "basic-leads", topic: "12誘導の基礎", title: "標準12誘導心電図の「12誘導」の意味として正しいものは？", choices: ["心臓の電気活動を12の方向から記録する", "12種類の心拍数を測る", "12秒間だけ記録する", "12個の心房を記録する", "12種類の不整脈を自動診断する"], explanation: "誘導は電気活動を見る方向です。標準12誘導は肢誘導6つと胸部誘導6つからなります。単一のモニター誘導とは得られる情報が異なります。" }
];

const validQuestion = id => rhythms.some(r => r.id === id) || basics.some(q => q.id === id);

export function makeExamQuiz() {
  const knowledge = shuffle(basics).slice(0, 5).map(q => ({
    id: q.id, title: q.title, topic: q.topic, explanation: q.explanation, correctId: `${q.id}-0`,
    options: shuffle(q.choices.map((name, i) => ({ id: `${q.id}-${i}`, name })))
  }));
  const reading = shuffle(rhythms).slice(0, 5).map(rhythm => ({
    id: rhythm.id, rhythm, topic: "モニター判読", title: "この模式波形に最も合うリズムはどれ？", correctId: rhythm.id,
    options: shuffle([rhythm, ...shuffle(rhythms.filter(r => r.id !== rhythm.id)).slice(0, 4)])
  }));
  return shuffle([...knowledge, ...reading]);
}
