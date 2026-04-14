const sections = [
  { id: 'section-dataset',     label: 'Dataset' },
  { id: 'section-methodology', label: 'Methodology & Pipeline' },
  { id: 'section-eda',         label: 'EDA' },
  { id: 'section-preprocessing', label: 'Preprocessing' },
  { id: 'section-modeling',    label: 'Modeling Approach' },
  { id: 'section-ensemble',    label: 'Ensemble Learning' },
  { id: 'section-results',     label: 'Results & Evaluation' },
  { id: 'section-selection',   label: 'Final Model Selection' },
  { id: 'section-demo',        label: 'Live Detection' },
  { id: 'section-summary',     label: 'Summary' },
  { id: 'section-references',  label: 'References' },
];

const tocList = document.getElementById('toc-list');
const progressBar = document.getElementById('toc-progress-bar');

sections.forEach(s => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = '#' + s.id;
  a.textContent = s.label;
  a.dataset.id = s.id;
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.getElementById(s.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  li.appendChild(a);
  tocList.appendChild(li);
});

function updateTOC() {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? Math.min(100, (scrollY / docH) * 100) : 0;
  progressBar.style.width = pct.toFixed(1) + '%';

  let active = null;
  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 80) active = s.id;
    }
  });

  tocList.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.dataset.id === active);
  });
}

window.addEventListener('scroll', updateTOC, { passive: true });
updateTOC();