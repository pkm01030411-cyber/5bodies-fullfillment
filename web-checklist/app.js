"use strict";

const STORAGE_KEY = "ochefull-checklist-state-v2";
const MAX_NOTE_LENGTH = 2000;

const checklistData = [
  {
    id: "stage-1", part: 1, stage: 1, title: "오프라인의 존재 이유와 문제 정의",
    purpose: "온라인과 동일한 경쟁축이 아닌 오프라인만의 방문 가치를 정의합니다.",
    question: "온라인이 더 싸고 편리한 시대에 고객은 왜 굳이 이마트에 와야 하는가?",
    deliverables: ["프로젝트 문제 정의", "핵심 질문", "오프라인 존재 이유", "프로젝트 한 문장 정의"],
    items: [
      ["온라인 쇼핑의 구조적 강점을 정리했다.", true],
      ["오프라인 점포의 방문 이유가 약해지는 문제를 정의했다.", true],
      ["경쟁 기준이 상품 접근성에서 방문 가치로 이동한다는 점을 설명했다.", false],
      ["온라인은 구매 시간을 줄이고 오프라인은 쇼핑 시간을 가치 있게 만든다는 핵심 인사이트를 확정했다.", true],
      ["오프라인의 비대체적 경험이 구매행동으로 연결되어야 한다는 논리를 정리했다.", false],
      ["문제 정의를 한 문장으로 설명할 수 있다.", true]
    ]
  },
  {
    id: "stage-2", part: 1, stage: 2, title: "오감 기반 경험 설계",
    purpose: "다섯 감각을 공간 연출이 아니라 고객 행동과 성과를 만드는 역할로 정의합니다.",
    question: "각 감각은 고객의 어떤 행동을 만들고, 그 행동은 어떤 성과로 이어지는가?",
    deliverables: ["감각별 역할표", "고객 여정별 감각 설계", "존별 Hero Sense 구성", "Sense-to-Sales 흐름"],
    items: [
      ["시각의 역할을 탐색과 주목으로 정의했다.", false],
      ["후각의 역할을 접근과 식욕 자극으로 정의했다.", false],
      ["청각의 역할을 현장감과 분위기 형성으로 정의했다.", false],
      ["촉각의 역할을 품질 확인과 구매 불안 감소로 정의했다.", false],
      ["미각의 역할을 구매 확신과 전환으로 정의했다.", false],
      ["고객 여정별 Hero Sense를 지정했다.", true],
      ["One Zone, One Hero Sense 원칙을 적용했다.", true],
      ["과도한 감각 자극을 방지하는 보조 감각 원칙을 정의했다.", false],
      ["모든 체험이 상품 또는 구매 장면과 연결된다.", true]
    ]
  },
  {
    id: "stage-3", part: 1, stage: 3, title: "Pilot Test 설계",
    purpose: "아이디어를 소규모 점포 또는 구역에서 검증할 수 있는 실험으로 전환합니다.",
    question: "작게 시작해 무엇을 측정하고, 어떤 수치가 나오면 확대할 것인가?",
    deliverables: ["Pilot 운영안", "KPI 정의서", "측정 방법", "Go/No-Go 판단 기준"],
    items: [
      ["Pilot 대상 점포 또는 구역을 정의했다.", true],
      ["비교 가능한 통제 구역 또는 기존 운영 기준을 정했다.", false],
      ["체류시간 측정 방법을 정의했다.", false],
      ["체험 참여율 측정 방법을 정의했다.", false],
      ["구매전환율 측정 방법을 정의했다.", true],
      ["연관구매율과 Basket Size 측정 방법을 정의했다.", true],
      ["재방문 또는 고객 반응 측정 방법을 정의했다.", false],
      ["실험 기간과 성공 기준을 수치로 정했다.", true],
      ["테스트 종료 후 개선·중단·확대 판단 기준을 정했다.", true]
    ]
  },
  {
    id: "stage-4", part: 1, stage: 4, title: "경쟁전략과 해자 설계",
    purpose: "단발성 체험이 아니라 경쟁사가 쉽게 복제하기 어려운 시스템으로 발전시킵니다.",
    question: "경쟁사가 공간을 모방해도 같은 성과를 만들기 어려운 이유는 무엇인가?",
    deliverables: ["Sense-to-Sales Flywheel", "데이터 축적 구조", "Experience System 정의", "경쟁우위 논리"],
    items: [
      ["Sense → Stay → Interaction → Sales → Data → Better Experience 구조를 설명할 수 있다.", true],
      ["경험 데이터가 다음 운영 개선으로 연결되는 방법을 정의했다.", true],
      ["점포 운영 노하우가 축적되는 구조를 설명했다.", false],
      ["공급사와 상품 데이터가 경험 설계에 연결된다.", false],
      ["Experience Space와 Experience System의 차이를 설명할 수 있다.", true],
      ["경쟁사가 공간을 모방해도 동일한 성과를 내기 어려운 이유를 정리했다.", true]
    ]
  },
  {
    id: "stage-5", part: 1, stage: 5, title: "실행 리스크와 확장성 검토",
    purpose: "비용, 운영, 위생, 혼잡, 감각 피로 등 실행 리스크를 사전에 통제합니다.",
    question: "실제 점포에서 무리 없이 운영하고 반복 확산할 수 있는가?",
    deliverables: ["리스크 목록", "리스크별 대응안", "운영 원칙", "확산 시나리오"],
    items: [
      ["초기 투자비와 반복 운영비를 구분했다.", true],
      ["기존 점포 자산을 우선 활용하는 방안을 검토했다.", true],
      ["인력 추가 없이 운영 가능한 범위를 정의했다.", true],
      ["시식·향·접촉 요소의 위생 기준을 정의했다.", true],
      ["고객 동선과 혼잡 위험을 검토했다.", false],
      ["소음과 감각 피로를 줄이는 운영 기준을 정했다.", false],
      ["장애인, 고령자, 감각 민감 고객의 접근성을 검토했다.", false],
      ["모듈 단위 설치와 철거가 가능하도록 설계했다.", false],
      ["Pilot 이후 단계적 확산 방안을 정리했다.", true]
    ]
  },
  {
    id: "stage-6", part: 1, stage: 6, title: "핵심 타깃과 Customer Journey",
    purpose: "핵심 타깃의 실제 쇼핑 장면을 기준으로 체험과 구매의 연결을 설계합니다.",
    question: "핵심 고객은 어떤 순간에 머물고, 체험하고, 더 많이 구매하는가?",
    deliverables: ["Persona", "Customer Journey Map", "Basket Expansion 시나리오", "핵심 고객 편익"],
    items: [
      ["핵심 타깃을 30~40대 Family Shopper로 정의했다.", true],
      ["타깃의 방문 목적과 불편을 정리했다.", false],
      ["방문 전, 입장, 탐색, 체험, 구매, 퇴점 이후 여정을 정의했다.", true],
      ["각 접점의 행동 목표를 정했다.", false],
      ["단일 상품이 아닌 식사·생활 장면 중심의 연관구매를 설계했다.", true],
      ["Basket Expansion 시나리오를 작성했다.", true],
      ["타깃이 얻는 실질적 편익을 한 문장으로 설명할 수 있다.", false]
    ]
  },
  {
    id: "stage-7", part: 1, stage: 7, title: "경쟁사 포지셔닝",
    purpose: "온라인 플랫폼, 대형마트, 창고형 매장, 복합쇼핑몰과 다른 경쟁 위치를 명확히 합니다.",
    question: "오체FULL만족은 기존 유통·공간 경험과 무엇이 구조적으로 다른가?",
    deliverables: ["경쟁사 비교표", "포지셔닝 맵", "차별화 문장"],
    items: [
      ["쿠팡의 편의성·배송 강점과 비교했다.", false],
      ["네이버의 검색·정보·리뷰 강점과 비교했다.", false],
      ["기존 대형마트의 상품 접근성과 비교했다.", false],
      ["코스트코의 가격·대용량·탐색 경험과 비교했다.", false],
      ["스타필드의 체류·여가 경험과 비교했다.", false],
      ["구매 연결형 감각 경험을 오체FULL만족만의 차별점으로 정의했다.", true],
      ["경쟁 포지셔닝 맵의 비교 축을 명확히 정했다.", true]
    ]
  },
  {
    id: "stage-8", part: 2, stage: 8, title: "관객참여형 발표 설계",
    purpose: "관객이 문제와 해결책을 직접 체감하도록 15분 발표 여정을 설계합니다.",
    question: "관객이 발표를 듣는 것을 넘어 핵심 인사이트를 직접 경험하게 할 수 있는가?",
    deliverables: ["15분 발표 여정", "관객 참여 3회 설계", "발표 대본", "리허설 체크리스트"],
    items: [
      ["발표 시작부에 관객의 경험을 묻는 참여 장치를 배치했다.", true],
      ["오감 또는 구매행동을 체감할 수 있는 참여 장치를 설계했다.", true],
      ["Pilot 또는 KPI 판단에 참여하는 장치를 설계했다.", false],
      ["관객 참여는 총 3회 이내로 제한했다.", true],
      ["각 참여가 다음 메시지와 논리적으로 연결된다.", true],
      ["참여에 필요한 준비물과 실패 대응안을 마련했다.", false],
      ["15분 이내 발표가 가능하도록 구간별 시간을 배분했다.", true],
      ["발표자별 역할과 전환 문장을 정했다.", false]
    ]
  },
  {
    id: "stage-9", part: 2, stage: 9, title: "최종 제안 구조화",
    purpose: "전체 내용을 기업이 빠르게 이해할 수 있는 제안 논리로 재배열합니다.",
    question: "기업 의사결정자가 문제부터 실행 요청까지 한 흐름으로 이해할 수 있는가?",
    deliverables: ["Problem → Insight → Solution → Proof → Scale", "최종 스토리라인", "의사결정 요청사항"],
    items: [
      ["Problem이 기업의 현재 과제로 표현되어 있다.", true],
      ["Insight가 문제에서 자연스럽게 도출된다.", true],
      ["Solution이 고객 행동과 사업 성과로 연결된다.", true],
      ["Proof에 Pilot과 KPI가 포함되어 있다.", false],
      ["Scale에 운영 표준화와 단계적 확산이 포함되어 있다.", true],
      ["각 슬라이드 또는 섹션은 하나의 핵심 메시지만 전달한다.", false],
      ["제안의 결론과 요청사항이 명확하다.", true]
    ]
  },
  {
    id: "stage-10", part: 2, stage: 10, title: "압축과 우선순위",
    purpose: "핵심 메시지를 유지하면서 발표 본문과 부록을 구분합니다.",
    question: "시간이 절반으로 줄어도 반드시 남겨야 하는 메시지는 무엇인가?",
    deliverables: ["12장 발표 구조", "본문·축약·부록 구분표", "최종 슬라이드 우선순위"],
    items: [
      ["12장 내외의 핵심 발표 구조를 확정했다.", true],
      ["반드시 말해야 할 내용과 부록으로 보낼 내용을 구분했다.", false],
      ["반복되는 설명과 표현을 제거했다.", false],
      ["표와 문장은 발표 화면에서 읽을 수 있는 길이로 줄였다.", false],
      ["핵심 수치와 KPI가 눈에 띄게 배치되어 있다.", true],
      ["예상 질문의 상세 근거는 부록에 배치했다.", false],
      ["축약본에서도 문제, 해결책, 검증, 확산 논리가 유지된다.", true]
    ]
  },
  {
    id: "stage-11", part: 3, stage: 11, title: "기업 제안서 언어 전환",
    purpose: "아이디어 중심 표현을 고객 행동, 매출, 데이터, 운영, 확장 중심의 기업 언어로 전환합니다.",
    question: "좋은 아이디어가 아니라 실행하고 검증할 가치가 있는 사업 제안으로 들리는가?",
    deliverables: ["기업 제안서용 핵심 문장", "아이디어 언어 → 기업 언어 변환표", "KPI·실행·확장 중심 문구"],
    items: [
      ["재미·감성 중심 표현을 행동 변화 중심 표현으로 전환했다.", true],
      ["체류시간을 Meaningful Dwell Time 관점으로 설명했다.", true],
      ["체험을 구매전환 또는 구매 불안 감소와 연결했다.", true],
      ["단일 상품 판매를 연관구매와 Basket Size로 전환해 설명했다.", true],
      ["공간 연출을 측정·개선 가능한 Experience System으로 설명했다.", true],
      ["전국 확대보다 Pilot 검증 후 단계적 확산을 우선 제시했다.", true],
      ["모든 핵심 제안에 기업이 얻는 성과가 포함되어 있다.", false],
      ["과장되거나 검증되지 않은 확정 표현을 제거했다.", false],
      ["핵심 전략 정의 문장을 최종 확정했다.", true]
    ]
  }
].map(stage => ({
  ...stage,
  items: stage.items.map(([text, priority], index) => ({
    id: `${stage.id}-item-${index + 1}`,
    text,
    priority: priority ? "high" : "normal"
  }))
}));

const defaultState = () => ({
  version: 2,
  completed: {},
  important: {},
  notes: {},
  expanded: { "stage-1": true },
  filters: { status: "all", stage: "all", query: "" },
  updatedAt: null
});

let state = loadState();
let saveTimer = null;
let toastTimer = null;

const elements = {
  list: document.querySelector("#checklist-list"),
  empty: document.querySelector("#empty-state"),
  search: document.querySelector("#search-input"),
  stageFilter: document.querySelector("#stage-filter"),
  activeFilters: document.querySelector("#active-filters"),
  toggleAll: document.querySelector("#toggle-all-button"),
  saveStatus: document.querySelector("#save-status"),
  updatedAt: document.querySelector("#updated-at"),
  resetDialog: document.querySelector("#reset-dialog"),
  importInput: document.querySelector("#import-input"),
  shareDialog: document.querySelector("#share-dialog"),
  shareUrl: document.querySelector("#share-url"),
  localShareNotice: document.querySelector("#local-share-notice"),
  toast: document.querySelector("#toast")
};

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState();
    const parsed = JSON.parse(stored);
    if (!parsed || parsed.version !== 2) return defaultState();
    const defaults = defaultState();
    return {
      ...defaults,
      ...parsed,
      completed: isPlainObject(parsed.completed) ? parsed.completed : {},
      important: isPlainObject(parsed.important) ? parsed.important : {},
      notes: isPlainObject(parsed.notes) ? parsed.notes : {},
      expanded: isPlainObject(parsed.expanded) ? parsed.expanded : defaults.expanded,
      filters: { ...defaults.filters, ...(isPlainObject(parsed.filters) ? parsed.filters : {}) }
    };
  } catch (error) {
    console.warn("저장된 상태를 복원하지 못했습니다.", error);
    queueMicrotask(() => showToast("저장 데이터가 손상되어 기본 상태로 복구했습니다."));
    return defaultState();
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function saveState(message = "자동 저장됨") {
  state.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    elements.saveStatus.textContent = message;
    updateTimestamp();
  } catch (error) {
    console.warn("진행 상황을 저장하지 못했습니다.", error);
    elements.saveStatus.textContent = "현재 변경사항을 저장할 수 없습니다";
    showToast("브라우저 저장 공간을 사용할 수 없습니다.");
  }
}

function scheduleSave() {
  window.clearTimeout(saveTimer);
  elements.saveStatus.textContent = "저장 중…";
  saveTimer = window.setTimeout(() => saveState(), 400);
}

function getAllItems() {
  return checklistData.flatMap(stage => stage.items);
}

function getStageStats(stage) {
  const completed = stage.items.filter(item => Boolean(state.completed[item.id])).length;
  return { total: stage.items.length, completed, percent: Math.round((completed / stage.items.length) * 100) };
}

function getProjectStats() {
  const items = getAllItems();
  const completed = items.filter(item => Boolean(state.completed[item.id])).length;
  const importantIncomplete = items.filter(item => state.important[item.id] && !state.completed[item.id]).length;
  return {
    total: items.length,
    completed,
    remaining: items.length - completed,
    importantIncomplete,
    percent: items.length ? Math.round((completed / items.length) * 100) : 0
  };
}

function updateSummary() {
  const stats = getProjectStats();
  const values = {
    "hero-completed": stats.completed,
    "hero-remaining": stats.remaining,
    "hero-progress": `${stats.percent}%`,
    "summary-progress": `${stats.percent}%`,
    "summary-total": stats.total,
    "summary-completed": stats.completed,
    "summary-important": stats.importantIncomplete
  };
  Object.entries(values).forEach(([id, value]) => { document.getElementById(id).textContent = value; });
  document.querySelector("#summary-progress-bar").style.width = `${stats.percent}%`;
  const ring = document.querySelector("#progress-ring");
  ring.style.setProperty("--progress", `${stats.percent * 3.6}deg`);
  ring.setAttribute("aria-valuenow", String(stats.percent));
  document.querySelector("#progress-message").textContent = progressMessage(stats.percent, stats.remaining);
}

function progressMessage(percent, remaining) {
  if (percent === 100) return "모든 준비가 끝났습니다. 최종 리허설을 진행하세요.";
  if (percent >= 75) return `마무리 구간입니다. 남은 ${remaining}개 항목에 집중하세요.`;
  if (percent >= 50) return "절반을 넘었습니다. 발표와 증명 구조를 연결해 보세요.";
  if (percent >= 25) return "전략의 뼈대가 잡히고 있습니다. 꾸준히 이어가세요.";
  return "첫 번째 항목부터 시작해 보세요.";
}

function updateTimestamp() {
  if (!state.updatedAt) {
    elements.updatedAt.textContent = "아직 저장된 변경사항이 없습니다.";
    return;
  }
  const date = new Date(state.updatedAt);
  elements.updatedAt.textContent = `마지막 저장 ${new Intl.DateTimeFormat("ko-KR", {
    month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
  }).format(date)}`;
}

function stageMatchesScope(stage) {
  const filter = state.filters.stage;
  if (filter === "all") return true;
  if (filter.startsWith("part-")) return stage.part === Number(filter.replace("part-", ""));
  return stage.id === filter;
}

function itemMatchesStatus(item) {
  const complete = Boolean(state.completed[item.id]);
  const important = Boolean(state.important[item.id]);
  switch (state.filters.status) {
    case "complete": return complete;
    case "incomplete": return !complete;
    case "important": return important && !complete;
    default: return true;
  }
}

function getVisibleStages() {
  const query = state.filters.query.trim().toLocaleLowerCase("ko-KR");
  return checklistData.flatMap(stage => {
    if (!stageMatchesScope(stage)) return [];
    const stageText = [stage.title, stage.purpose, stage.question, ...stage.deliverables].join(" ").toLocaleLowerCase("ko-KR");
    const stageQueryMatch = !query || stageText.includes(query);
    const items = stage.items.filter(item => {
      const queryMatch = stageQueryMatch || item.text.toLocaleLowerCase("ko-KR").includes(query);
      return queryMatch && itemMatchesStatus(item);
    });
    if (items.length === 0) return [];
    return [{ ...stage, visibleItems: items }];
  });
}

function renderChecklist() {
  const visibleStages = getVisibleStages();
  const fragments = [];
  let lastPart = null;

  visibleStages.forEach(stage => {
    if (lastPart !== stage.part) {
      const part = partInfo(stage.part);
      fragments.push(`<div class="part-heading"><span>${part.label}</span><strong>${escapeHtml(part.title)}</strong></div>`);
      lastPart = stage.part;
    }
    fragments.push(renderStage(stage));
  });

  elements.list.innerHTML = fragments.join("");
  elements.empty.hidden = visibleStages.length > 0;
  elements.list.hidden = visibleStages.length === 0;
  renderActiveFilters();
  updateToggleAllLabel();
}

function partInfo(part) {
  return {
    1: { label: "PART I · STRATEGY", title: "발표 준비 이전 전략 · 1~7단계" },
    2: { label: "PART II · PROPOSAL", title: "발표 및 제안 구조 · 8~10단계" },
    3: { label: "PART III · LANGUAGE", title: "기업 제안서 언어 · 11단계" }
  }[part];
}

function renderStage(stage) {
  const stats = getStageStats(stage);
  const expanded = Boolean(state.expanded[stage.id]) || Boolean(state.filters.query);
  const tasks = stage.visibleItems.map(item => {
    const complete = Boolean(state.completed[item.id]);
    const important = Boolean(state.important[item.id]);
    return `
      <div class="task-row${complete ? " is-complete" : ""}" data-item-row="${item.id}">
        <input class="task-check" type="checkbox" id="${item.id}" data-item-id="${item.id}" ${complete ? "checked" : ""}>
        <label class="task-text" for="${item.id}">${escapeHtml(item.text)}</label>
        <button class="important-button${important ? " is-active" : ""}" type="button" data-important-id="${item.id}" aria-pressed="${important}" aria-label="${important ? "중요 표시 해제" : "중요 항목으로 표시"}" title="중요 항목">★</button>
      </div>`;
  }).join("");
  const note = typeof state.notes[stage.id] === "string" ? state.notes[stage.id].slice(0, MAX_NOTE_LENGTH) : "";

  return `
    <article class="stage-card${stats.percent === 100 ? " is-complete" : ""}" data-stage-id="${stage.id}" data-part="${stage.part}">
      <button class="stage-header" type="button" data-stage-toggle="${stage.id}" aria-expanded="${expanded}" aria-controls="${stage.id}-panel">
        <span class="stage-number">${String(stage.stage).padStart(2, "0")}</span>
        <span class="stage-title"><small>STEP ${String(stage.stage).padStart(2, "0")}</small><strong>${escapeHtml(stage.title)}</strong></span>
        <span class="stage-status">
          <span class="stage-status__text"><span>${stats.completed} / ${stats.total} 완료</span><strong>${stats.percent}%</strong></span>
          <span class="linear-progress" aria-hidden="true"><i style="width:${stats.percent}%"></i></span>
        </span>
        <span class="stage-chevron" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></span>
      </button>
      <div class="stage-panel" id="${stage.id}-panel" ${expanded ? "" : "hidden"}>
        <div class="stage-context">
          <div class="stage-purpose"><span class="context-label">PURPOSE</span><p>${escapeHtml(stage.purpose)}</p></div>
          <div class="stage-question"><span class="context-label">KEY QUESTION</span><blockquote>${escapeHtml(stage.question)}</blockquote></div>
        </div>
        <div class="stage-body">
          <div class="task-list" aria-label="${escapeHtml(stage.title)} 세부 체크 항목">${tasks}</div>
          <aside class="stage-side">
            <div class="deliverables"><span class="context-label">DELIVERABLES</span><ul>${stage.deliverables.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
            <label class="note-field">
              <span class="context-label">STAGE MEMO</span>
              <textarea data-note-id="${stage.id}" maxlength="${MAX_NOTE_LENGTH}" placeholder="근거, 담당자, 보완할 내용을 기록하세요.">${escapeHtml(note)}</textarea>
              <span class="note-meta"><span>자동 저장</span><span data-note-count="${stage.id}">${note.length} / ${MAX_NOTE_LENGTH}</span></span>
            </label>
          </aside>
        </div>
      </div>
    </article>`;
}

function renderActiveFilters() {
  const labels = [];
  if (state.filters.status !== "all") {
    labels.push({ type: "status", text: { incomplete: "미완료", complete: "완료", important: "중요 미완료" }[state.filters.status] });
  }
  if (state.filters.stage !== "all") {
    labels.push({ type: "stage", text: elements.stageFilter.options[elements.stageFilter.selectedIndex]?.text || state.filters.stage });
  }
  if (state.filters.query.trim()) labels.push({ type: "query", text: `“${state.filters.query.trim()}” 검색` });
  elements.activeFilters.innerHTML = labels.map(label => `<span class="active-filter">${escapeHtml(label.text)} 적용 중</span>`).join("");
}

function updateToggleAllLabel() {
  const visibleIds = getVisibleStages().map(stage => stage.id);
  const allExpanded = visibleIds.length > 0 && visibleIds.every(id => state.expanded[id]);
  elements.toggleAll.textContent = allExpanded ? "전체 접기" : "전체 펼치기";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function showToast(message) {
  if (!elements.toast) return;
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2600);
}

function syncControls() {
  elements.search.value = state.filters.query;
  elements.stageFilter.value = state.filters.stage;
  document.querySelectorAll("[data-status]").forEach(button => {
    const active = button.dataset.status === state.filters.status;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function clearFilters() {
  state.filters = { status: "all", stage: "all", query: "" };
  syncControls();
  renderChecklist();
  saveState("필터 초기화됨");
}

function exportState() {
  const payload = {
    product: "오체FULL만족 기업연계 PJT 웹 체크리스트",
    exportedAt: new Date().toISOString(),
    state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `오체FULL만족_체크리스트_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast("현재 진행 상황을 JSON 파일로 저장했습니다.");
}

function importState(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(String(reader.result));
      const imported = payload?.state;
      if (!isPlainObject(imported) || imported.version !== 2) throw new Error("지원하지 않는 형식입니다.");
      const defaults = defaultState();
      state = {
        ...defaults,
        completed: isPlainObject(imported.completed) ? imported.completed : {},
        important: isPlainObject(imported.important) ? imported.important : {},
        notes: isPlainObject(imported.notes) ? imported.notes : {},
        expanded: isPlainObject(imported.expanded) ? imported.expanded : defaults.expanded,
        filters: { ...defaults.filters, ...(isPlainObject(imported.filters) ? imported.filters : {}) }
      };
      syncControls();
      updateSummary();
      renderChecklist();
      saveState("불러오기 완료");
      showToast("체크리스트 데이터를 불러왔습니다.");
    } catch (error) {
      console.warn(error);
      showToast("올바른 체크리스트 JSON 파일이 아닙니다.");
    } finally {
      elements.importInput.value = "";
    }
  });
  reader.readAsText(file);
}

function isLocalAddress() {
  return location.protocol === "file:" || ["localhost", "127.0.0.1", "::1"].includes(location.hostname);
}

async function shareSite() {
  const shareData = {
    title: "오체FULL만족 프로젝트 체크리스트",
    text: "전략부터 발표와 기업 제안서 언어까지, 오체FULL만족 11단계 체크리스트입니다.",
    url: location.href
  };

  if (!isLocalAddress() && typeof navigator.share === "function") {
    try {
      await navigator.share(shareData);
      showToast("공유 메뉴를 열었습니다.");
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
      console.warn("기본 공유 기능을 열지 못했습니다.", error);
    }
  }

  elements.shareUrl.value = location.href;
  elements.localShareNotice.hidden = !isLocalAddress();
  document.querySelector("#share-description").textContent = isLocalAddress()
    ? "현재 주소의 공유 가능 범위를 확인하세요."
    : "아래 링크를 복사해 팀원에게 전달하세요.";
  elements.shareDialog.showModal();
}

async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(elements.shareUrl.value);
  } catch (error) {
    elements.shareUrl.focus();
    elements.shareUrl.select();
    document.execCommand("copy");
  }
  document.querySelector("#copy-link-button").textContent = "복사됨";
  showToast(isLocalAddress() ? "주소를 복사했습니다. 로컬 주소는 현재 PC에서만 열립니다." : "공유 링크를 복사했습니다.");
  window.setTimeout(() => { document.querySelector("#copy-link-button").textContent = "링크 복사"; }, 1600);
}

elements.list.addEventListener("click", event => {
  const toggle = event.target.closest("[data-stage-toggle]");
  if (toggle) {
    const stageId = toggle.dataset.stageToggle;
    state.expanded[stageId] = !state.expanded[stageId];
    const panel = document.getElementById(`${stageId}-panel`);
    toggle.setAttribute("aria-expanded", String(state.expanded[stageId]));
    panel.hidden = !state.expanded[stageId];
    updateToggleAllLabel();
    saveState("보기 설정 저장됨");
    return;
  }

  const importantButton = event.target.closest("[data-important-id]");
  if (importantButton) {
    const itemId = importantButton.dataset.importantId;
    state.important[itemId] = !state.important[itemId];
    renderChecklist();
    updateSummary();
    saveState(state.important[itemId] ? "중요 항목으로 표시됨" : "중요 표시 해제됨");
  }
});

elements.list.addEventListener("change", event => {
  const checkbox = event.target.closest("[data-item-id]");
  if (!checkbox) return;
  state.completed[checkbox.dataset.itemId] = checkbox.checked;
  updateSummary();
  renderChecklist();
  saveState(checkbox.checked ? "완료 상태 저장됨" : "미완료 상태 저장됨");
});

elements.list.addEventListener("input", event => {
  const textarea = event.target.closest("[data-note-id]");
  if (!textarea) return;
  const stageId = textarea.dataset.noteId;
  state.notes[stageId] = textarea.value.slice(0, MAX_NOTE_LENGTH);
  const counter = elements.list.querySelector(`[data-note-count="${stageId}"]`);
  if (counter) counter.textContent = `${state.notes[stageId].length} / ${MAX_NOTE_LENGTH}`;
  scheduleSave();
});

document.querySelectorAll("[data-status]").forEach(button => {
  button.addEventListener("click", () => {
    state.filters.status = button.dataset.status;
    syncControls();
    renderChecklist();
    saveState("필터 저장됨");
  });
});

elements.search.addEventListener("input", () => {
  state.filters.query = elements.search.value;
  renderChecklist();
  scheduleSave();
});

elements.stageFilter.addEventListener("change", () => {
  state.filters.stage = elements.stageFilter.value;
  renderChecklist();
  saveState("필터 저장됨");
});

elements.toggleAll.addEventListener("click", () => {
  const visibleIds = getVisibleStages().map(stage => stage.id);
  const shouldExpand = !visibleIds.every(id => state.expanded[id]);
  visibleIds.forEach(id => { state.expanded[id] = shouldExpand; });
  renderChecklist();
  saveState(shouldExpand ? "모든 단계 펼침" : "모든 단계 접음");
});

document.querySelector("#clear-filters-button").addEventListener("click", clearFilters);
document.querySelector("#export-button").addEventListener("click", exportState);
document.querySelector("#share-button").addEventListener("click", shareSite);
document.querySelector("#copy-link-button").addEventListener("click", copyShareLink);
document.querySelector("#import-button").addEventListener("click", () => elements.importInput.click());
elements.importInput.addEventListener("change", () => {
  const [file] = elements.importInput.files;
  if (file) importState(file);
});

document.querySelector("#reset-button").addEventListener("click", () => elements.resetDialog.showModal());
elements.resetDialog.addEventListener("close", () => {
  if (elements.resetDialog.returnValue !== "confirm") return;
  state = defaultState();
  try { localStorage.removeItem(STORAGE_KEY); } catch (error) { console.warn(error); }
  syncControls();
  updateSummary();
  renderChecklist();
  updateTimestamp();
  elements.saveStatus.textContent = "모든 진행 상황이 초기화되었습니다";
  showToast("체크리스트를 처음 상태로 되돌렸습니다.");
});

document.querySelector("#print-button").addEventListener("click", () => window.print());

document.addEventListener("keydown", event => {
  const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (!isShortcut) return;
  event.preventDefault();
  elements.search.focus();
});

syncControls();
updateSummary();
updateTimestamp();
renderChecklist();
