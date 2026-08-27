import { platformComparisonData, type PlatformComparisonItem } from './platform-comparison-data';

type Filters = {
  age: number | null;
  budget: number | null;
  teacher: 'any' | 'formal' | 'recurring';
  cancel: number | null;
  recording: 'any' | 'video' | 'any-recording';
  payment: 'any' | 'subscription' | 'package' | 'marketplace' | 'hybrid';
};

function money(v: number | null) {
  return v == null ? '未有可精準比較單堂價' : `約 NT$${v.toLocaleString()} 起／堂`;
}

function ageMatches(item: PlatformComparisonItem, age: number | null) {
  if (age == null) return true;
  if (item.ageMin == null || item.ageMax == null) return false;
  return age >= item.ageMin && age <= item.ageMax;
}

function budgetMatches(item: PlatformComparisonItem, budget: number | null) {
  if (budget == null) return true;
  if (item.priceTwdMinPerLesson == null) return false;
  return item.priceTwdMinPerLesson <= budget;
}

function teacherMatches(item: PlatformComparisonItem, teacher: Filters['teacher']) {
  if (teacher === 'any') return true;
  if (teacher === 'formal') return item.fixedTeacherMode === 'formal';
  return ['formal', 'recurring', 'teacher-specific'].includes(item.fixedTeacherMode);
}

function cancelMatches(item: PlatformComparisonItem, cancel: number | null) {
  if (cancel == null) return true;
  if (item.cancelHours == null) return false;
  return item.cancelHours <= cancel;
}

function recordingMatches(item: PlatformComparisonItem, recording: Filters['recording']) {
  if (recording === 'any') return true;
  if (recording === 'video') return item.recordingMode === 'video';
  return ['video', 'audio', 'board'].includes(item.recordingMode);
}

function paymentMatches(item: PlatformComparisonItem, payment: Filters['payment']) {
  return payment === 'any' || item.paymentModel === payment;
}

function getFilters(root: HTMLElement): Filters {
  const ageRaw = (root.querySelector('[name="pf-age"]') as HTMLSelectElement)?.value ?? '';
  const budgetRaw = (root.querySelector('[name="pf-budget"]') as HTMLSelectElement)?.value ?? '';
  const cancelRaw = (root.querySelector('[name="pf-cancel"]') as HTMLSelectElement)?.value ?? '';
  return {
    age: ageRaw ? Number(ageRaw) : null,
    budget: budgetRaw ? Number(budgetRaw) : null,
    teacher: ((root.querySelector('[name="pf-teacher"]') as HTMLSelectElement)?.value || 'any') as Filters['teacher'],
    cancel: cancelRaw ? Number(cancelRaw) : null,
    recording: ((root.querySelector('[name="pf-recording"]') as HTMLSelectElement)?.value || 'any') as Filters['recording'],
    payment: ((root.querySelector('[name="pf-payment"]') as HTMLSelectElement)?.value || 'any') as Filters['payment']
  };
}

function render(root: HTMLElement) {
  const f = getFilters(root);
  const results = platformComparisonData.filter((p) =>
    ageMatches(p, f.age) && budgetMatches(p, f.budget) && teacherMatches(p, f.teacher) &&
    cancelMatches(p, f.cancel) && recordingMatches(p, f.recording) && paymentMatches(p, f.payment)
  );

  const selected = [f.age, f.budget, f.teacher !== 'any', f.cancel, f.recording !== 'any', f.payment !== 'any'].filter(Boolean).length;
  const unknownExcluded = platformComparisonData.filter((p) => {
    if (f.age != null && (p.ageMin == null || p.ageMax == null)) return true;
    if (f.budget != null && p.priceTwdMinPerLesson == null) return true;
    if (f.cancel != null && p.cancelHours == null) return true;
    if (f.recording !== 'any' && p.recordingMode === 'unknown') return true;
    return false;
  }).length;

  const count = root.querySelector('[data-pf-count]') as HTMLElement;
  const note = root.querySelector('[data-pf-note]') as HTMLElement;
  const list = root.querySelector('[data-pf-results]') as HTMLElement;

  count.textContent = selected === 0 ? `目前顯示全部 ${results.length} 家` : `完全符合：${results.length} 家`;
  note.textContent = selected === 0
    ? '先選 1～6 個條件。篩選器只使用已核實欄位，不以推測補空值。'
    : `已套用 ${selected} 個條件。${unknownExcluded ? `另有 ${unknownExcluded} 家因相關公開資料不足，沒有被算進「完全符合」。` : ''}`;

  list.innerHTML = results.length ? results.map((p) => `
    <article class="pf-result-card">
      <div class="pf-result-head">
        <h3>${p.href ? `<a href="${p.href}">${p.name}</a>` : p.name}</h3>
        <span class="pf-source">${p.sourceLevel}</span>
      </div>
      <div class="pf-result-grid">
        <div><span>費用</span><strong>${money(p.priceTwdMinPerLesson)}</strong><small>${p.priceNote}</small></div>
        <div><span>老師</span><strong>${p.fixedTeacherLabel}</strong></div>
        <div><span>取消</span><strong>${p.cancelHours == null ? '目前不能精準比對' : p.cancelHours < 1 ? `${Math.round(p.cancelHours * 60)} 分鐘前` : `${p.cancelHours} 小時前`}</strong><small>${p.cancelNote}</small></div>
        <div><span>課後紀錄</span><strong>${p.recordingLabel}</strong></div>
      </div>
      <p class="pf-first-payment"><strong>付款型態：</strong>${p.paymentModel}　${p.firstPaymentNote}</p>
    </article>`).join('') : `
      <div class="pf-empty">
        <strong>目前沒有平台同時符合全部條件。</strong>
        <p>這不代表平台不適合，而是沒有任何一筆「已核實資料」能同時滿足目前 6 個條件。可以先放寬一個條件再看。</p>
      </div>`;
}

function initPlatformFilter() {
  document.querySelectorAll<HTMLElement>('[data-platform-filter]').forEach((root) => {
    if (root.dataset.initialized === 'true') return;
    root.dataset.initialized = 'true';
    root.addEventListener('change', () => render(root));
    root.querySelector('[data-pf-reset]')?.addEventListener('click', () => {
      root.querySelectorAll<HTMLSelectElement>('select').forEach((el) => el.selectedIndex = 0);
      render(root);
    });
    render(root);
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPlatformFilter);
else initPlatformFilter();
