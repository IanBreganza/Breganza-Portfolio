// ── Config ─────────────────────────────────────────────────────
// Change this to your Railway URL before deploying.
// For local dev: 'http://localhost:8000'
const API_BASE = 'http://localhost:8000';

// ── Mobile menu ─────────────────────────────────────────────────
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});
function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.add('hidden');
}

// ── Collapsible story ───────────────────────────────────────────
function toggleStory() {
  const body    = document.getElementById('story-body');
  const chevron = document.getElementById('story-chevron');
  const btn     = document.getElementById('story-toggle');
  const isOpen  = body.classList.contains('open');

  body.classList.toggle('open', !isOpen);
  chevron.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
}

// ── Scroll reveal ────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── API fetch helpers ────────────────────────────────────────────
async function apiFetch(path) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    headers: { 'Accept': 'application/json' }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ── PROJECTS ─────────────────────────────────────────────────────
async function loadProjects() {
  const container = document.getElementById('projects-container');

  try {
    const projects = await apiFetch('/projects');
    const skeleton = document.getElementById('projects-skeleton');
    if (skeleton) skeleton.remove();

    if (!projects.length) {
      container.innerHTML = '<p class="text-text-muted text-sm">No projects to display yet.</p>';
      return;
    }

    // Sort into size tiers by priority
    const html = projects.map(p => {
      const score   = p.priority_score;
      const isFeat  = score >= 8;
      const isStd   = score >= 5 && score < 8;
      const colSpan = isFeat ? 'md:col-span-2' : '';
      const tags    = (p.tech_stack || []).map(t => `<span class="tag">${t}</span>`).join('');
      const link    = p.external_link
        ? `<a href="${p.external_link}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-1 text-xs text-accent hover:underline mt-4">
             View Project
             <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
             </svg>
           </a>`
        : '';
      const badge = isFeat
        ? `<span class="tag tag-green mb-3 inline-block">Featured</span>`
        : '';

      return `
        <div class="card p-6 flex flex-col ${colSpan}">
          ${badge}
          <h3 class="font-display text-base font-bold text-text-primary mb-3">${p.title}</h3>
          <p class="text-text-secondary text-sm leading-relaxed flex-1">${p.description}</p>
          <div class="flex flex-wrap gap-2 mt-4">${tags}</div>
          ${link}
        </div>`;
    }).join('');

    const grid = document.createElement('div');
    grid.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-6';
    grid.innerHTML = html;
    container.appendChild(grid);

  } catch (err) {
    document.getElementById('projects-skeleton')?.remove();
    container.innerHTML = `
      <div class="card p-8 text-center">
        <p class="text-text-muted text-sm">Projects temporarily unavailable.</p>
      </div>`;
  }
}

// ── EXPERIENCE ───────────────────────────────────────────────────
async function loadExperience() {
  const container = document.getElementById('experience-container');

  try {
    const items = await apiFetch('/experience');
    document.getElementById('experience-skeleton')?.remove();

    if (!items.length) {
      container.innerHTML = '<p class="text-text-muted text-sm">No experience entries yet.</p>';
      return;
    }

    const html = items.map((exp, i) => {
      const duties = (exp.responsibilities || [])
        .map(r => `<li class="flex items-start gap-2 text-text-secondary text-sm">
                     <span class="text-accent mt-1 shrink-0">▸</span>
                     <span>${r}</span>
                   </li>`)
        .join('');
      return `
        <div class="relative mb-10 pl-12">
          <div class="timeline-dot"></div>
          <div class="card p-6">
            <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <h3 class="font-display text-base font-bold text-text-primary">${exp.role}</h3>
                <p class="text-accent text-sm font-medium">${exp.company}</p>
              </div>
              <div class="text-right shrink-0">
                <p class="text-text-secondary text-xs">${exp.date_range}</p>
                ${exp.location ? `<p class="text-text-muted text-xs">${exp.location}</p>` : ''}
              </div>
            </div>
            ${duties ? `<ul class="space-y-1.5 mt-3">${duties}</ul>` : ''}
          </div>
        </div>`;
    }).join('');

    container.innerHTML = `<div class="timeline-line"></div>${html}`;

  } catch (err) {
    document.getElementById('experience-skeleton')?.remove();
    container.innerHTML = '<p class="text-text-muted text-sm">Experience temporarily unavailable.</p>';
  }
}

// ── SKILLS ───────────────────────────────────────────────────────
async function loadSkills() {
  const container = document.getElementById('skills-container');

  try {
    const skills = await apiFetch('/skills');
    document.getElementById('skills-skeleton')?.remove();

    if (!skills.length) {
      container.innerHTML = '<p class="text-text-muted text-sm">Skills temporarily unavailable.</p>';
      return;
    }

    // Group by category
    const grouped = skills.reduce((acc, s) => {
      (acc[s.category] = acc[s.category] || []).push(s);
      return acc;
    }, {});

    const categoryColors = {
      'Languages':        'text-accent',
      'ML & AI':          'text-blue',
      'Web & Backend':    'text-purple-400',
      'Tools & Platforms':'text-yellow-400',
    };

    const html = Object.entries(grouped).map(([cat, items]) => {
      const color = categoryColors[cat] || 'text-accent';
      const tags = items.map(s => `<span class="tag">${s.name}</span>`).join('');
      return `
        <div class="card p-6">
          <h3 class="text-xs font-display tracking-widest uppercase ${color} mb-4">${cat}</h3>
          <div class="flex flex-wrap gap-2">${tags}</div>
        </div>`;
    }).join('');

    const grid = document.createElement('div');
    grid.className = 'grid md:grid-cols-2 gap-6';
    grid.innerHTML = html;
    container.appendChild(grid);

  } catch (err) {
    document.getElementById('skills-skeleton')?.remove();
    container.innerHTML = '<p class="text-text-muted text-sm">Skills temporarily unavailable.</p>';
  }
}

// ── CERTIFICATES ─────────────────────────────────────────────────
async function loadCertificates() {
  const container = document.getElementById('certificates-container');

  try {
    const certs = await apiFetch('/certificates');
    document.getElementById('certificates-skeleton')?.remove();

    if (!certs.length) {
      container.innerHTML = `
        <div class="card p-10 text-center max-w-md mx-auto">
          <div class="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <p class="text-text-secondary text-sm">Certifications in progress — check back soon.</p>
        </div>`;
      return;
    }

    const html = certs.map(cert => {
      const link = cert.credential_url
        ? `<a href="${cert.credential_url}" target="_blank" rel="noopener noreferrer"
             class="text-xs text-accent hover:underline mt-3 inline-block">View Credential →</a>`
        : '';
      const expiry = cert.expiration
        ? `<p class="text-text-muted text-xs">Expires ${cert.expiration}</p>`
        : '';
      return `
        <div class="card p-6 flex flex-col">
          <h3 class="font-semibold text-text-primary text-sm mb-1">${cert.name}</h3>
          <p class="text-accent text-xs font-medium mb-2">${cert.organization}</p>
          <p class="text-text-secondary text-xs">Issued ${cert.date_issued}</p>
          ${expiry}
          ${link}
        </div>`;
    }).join('');

    const grid = document.createElement('div');
    grid.className = 'grid md:grid-cols-2 lg:grid-cols-3 gap-6';
    grid.innerHTML = html;
    container.appendChild(grid);

  } catch (err) {
    document.getElementById('certificates-skeleton')?.remove();
    container.innerHTML = `
      <div class="card p-10 text-center max-w-md mx-auto">
        <p class="text-text-muted text-sm">Certifications in progress — check back soon.</p>
      </div>`;
  }
}

// ── Contact form ─────────────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn    = document.getElementById('contact-submit');
  const status = document.getElementById('form-status');
  const data   = new FormData(this);
  const obj    = Object.fromEntries(data.entries());

  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.classList.add('hidden');

  try {
    const res = await fetch(this.action, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      }
    });

    if (res.ok) {
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.className   = 'mt-3 text-sm text-center text-accent';
      this.reset();
    } else {
      const errorData = await res.json();
      if (errorData.errors) {
        status.textContent = '✗ ' + errorData.errors.map(err => err.message).join(', ');
      } else {
        status.textContent = '✗ Submission failed. Please try again.';
      }
      status.className = 'mt-3 text-sm text-center text-red-400';
    }
  } catch (err) {
    status.textContent = '✗ Connection error. Please email me directly.';
    status.className   = 'mt-3 text-sm text-center text-red-400';
  } finally {
    status.classList.remove('hidden');
    btn.disabled    = false;
    btn.textContent = 'Send Message';
  }
});

// ── Init ─────────────────────────────────────────────────────────
(async () => {
  await Promise.allSettled([
    loadProjects(),
    loadExperience(),
    loadSkills(),
    loadCertificates(),
  ]);
})();
