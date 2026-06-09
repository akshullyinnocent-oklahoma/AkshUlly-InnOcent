const DOCS = {
  "01":  { title: "Norman Police Report", date: "2019", pages: 4 },
  "02":  { title: "Forensic Interview Transcript", date: "2019", pages: 50 },
  "03":  { title: "Protective Order Hearing", date: "2020", pages: 49 },
  "04":  { title: "Preliminary Hearing", date: "2020", pages: 76 },
  "05":  { title: "2803 Notice", date: "2020", pages: 2 },
  "06":  { title: "2803 Hearsay Hearing", date: "2020", pages: 38 },
  "07":  { title: "Res-Gestae Hearing", date: "2021", pages: 61 },
  "08":  { title: "Trial Transcript — Vol. 1", date: "2021", pages: 239 },
  "09":  { title: "Trial Transcript — Vol. 2", date: "2021", pages: 315 },
  "10":  { title: "Trial Transcript — Vol. 3", date: "2021", pages: 191 },
  "11":  { title: "Trial Transcript — Vol. 4", date: "2021", pages: 104 },
  "12":  { title: "New-Trial Hearing & Sentencing", date: "2021", pages: 59 },
  "13":  { title: "Brief of Appellant", date: "2022", pages: 53 },
  "13-1": { title: "Notice of Assignment (Walterschied)", date: "2022", pages: 1 },
  "13-2": { title: "Notice of Re-Assignment (Sanders)", date: "2022", pages: 1 },
  "13-3": { title: "Sanders — Extension Request 1", date: "2022", pages: 4 },
  "13-4": { title: "Sanders — Extension Request 2", date: "2022", pages: 4 },
  "14":  { title: "Brief of Appellee", date: "2022", pages: 53 },
  "15":  { title: "Direct Appeal — Summary Opinion", date: "2023", pages: 7 },
  "16":  { title: "Motions to Disqualify & Discovery", date: "2023", pages: 12 },
  "17":  { title: "Application for Post-Conviction Relief", date: "2023", pages: 36 },
  "18":  { title: "Petition for Writ of Mandamus (2nd)", date: "2023", pages: 5 },
  "19":  { title: "State's Response to Application for PCR", date: "2023", pages: 13 },
  "20":  { title: "Mandamus — Order Directing Response", date: "2023", pages: 2 },
  "21":  { title: "Petitioner's Response to Correct the Record", date: "2023", pages: 14 },
  "22":  { title: "Order Denying Motions to Disqualify", date: "2023", pages: 4 },
  "23":  { title: "Written Request for Rehearing", date: "2024", pages: 17 },
  "24":  { title: "Order Denying Application for PCR", date: "2024", pages: 9 },
  "25":  { title: "Notice of Intent to Appeal (Post-Conviction)", date: "2024", pages: 1 },
  "26":  { title: "Petition in Error & Brief — PCR Appeal", date: "2024", pages: 30 },
  "27":  { title: "OCCA Denial of Post-Conviction Appeal", date: "2025", pages: 7 },
};

const DOC_ORDER = ["01","02","03","04","05","06","07","08","09","10","11","12","13","13-1","13-2","13-3","13-4","14","15","16","17","18","19","20","21","22","23","24","25","26","27"];

let selected = null;
let searchTerm = '';

function renderDocList() {
  const container = document.getElementById('doc-list');
  const filtered = DOC_ORDER.filter(id => {
    const doc = DOCS[id];
    return (doc.title + ' ' + id).toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  document.getElementById('doc-filter-count').textContent = filtered.length;
  document.getElementById('doc-count').textContent = DOC_ORDER.length;
  
  container.innerHTML = filtered.map(id => {
    const doc = DOCS[id];
    const active = selected && selected.id === id;
    return `
      <button class="doc-row" data-id="${id}" style="display:block;width:100%;text-align:left;padding:10px 14px;background:transparent;border:none;border-left:3px solid ${active ? '#00FFFF' : 'transparent'};border-bottom:1px solid rgba(255,255,255,0.04);color:${active ? '#fafafa' : '#d4d4d8'};cursor:pointer;transition:background 0.15s;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-family:monospace;font-size:9px;letter-spacing:0.15em;color:#00FFFF;">DOC-${id}</span>
          <span style="font-family:monospace;font-size:9px;color:#a1a1aa;">${doc.date}</span>
        </div>
        <div style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;line-height:1.3;">${doc.title}</div>
        <div style="font-family:monospace;font-size:9px;color:#71717a;margin-top:4px;letter-spacing:0.1em;">${doc.pages} page${doc.pages === 1 ? '' : 's'}</div>
      </button>
    `;
  }).join('');
  
  container.querySelectorAll('.doc-row').forEach(row => {
    row.addEventListener('click', () => {
      selected = DOCS[row.dataset.id];
      selected.id = row.dataset.id;
      renderDocList();
      renderViewer();
    });
  });
}

function renderViewer() {
  const viewer = document.getElementById('viewer-body');
  const title = document.getElementById('viewer-title');
  
  if (!selected) {
    viewer.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;min-height:400px;color:#71717a;font-family:\'DM Sans\',sans-serif;font-size:13px;"><div style="font-size:28px;margin-bottom:12px;">📄</div>Select any document on the left to view its pages.</div>';
    title.innerHTML = 'Select a document from the list';
    return;
  }
  
  title.innerHTML = `
    <span style="font-family:monospace;font-size:11px;color:#00FFFF;letter-spacing:0.15em;">DOC-${selected.id}</span>
    <span style="color:#52525b;">•</span>
    <span style="color:#a1a1aa;">${selected.pages} pages</span>
    <span style="color:#52525b;">•</span>
    <span>${selected.title}</span>
  `;
  
  // Lazy-load images on demand via IntersectionObserver
  let html = '<div id="lazy-container" style="max-width:950px;margin:0 auto;">' +
    Array.from({ length: selected.pages }, (_, i) => {
      const n = i + 1;
      return `<figure class="page-wrap" data-page="${n}" style="margin:0 auto 1rem;max-width:950px;background:#fff;box-shadow:0 4px 20px rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.05);border-radius:4px;overflow:hidden;position:relative;">
        <img class="lazy-img" data-src="/assets/documents/${selected.id}/page-${String(n).padStart(3, '0')}.jpg" alt="${selected.title} — page ${n}" loading="lazy" decoding="async" draggable="false" style="display:block;width:100%;height:auto;pointer-events:none;" />
        <figcaption style="font-family:monospace;font-size:9px;color:#a1a1aa;text-align:center;padding:6px 0;background:#0a0a0a;letter-spacing:0.2em;text-transform:uppercase;">Page ${n} of ${selected.pages}</figcaption>
      </figure>`;
    }).join('') + '</div>';
  
  viewer.innerHTML = html;
  
  // Set up lazy loading
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const ds = img.dataset.src;
        if (ds && !img.src) img.src = ds;
        observer.unobserve(img);
      }
    });
  }, { root: viewer, rootMargin: '600px 0px' });
  
  setTimeout(() => {
    viewer.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  renderDocList();
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderDocList();
  });
});

// Prevent right-click on entire page
document.addEventListener('contextmenu', (e) => e.preventDefault());