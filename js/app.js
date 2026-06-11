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

// ── Hardcoded data ───────────────────────────────────────────────
const PROJECTS = [
  {
    title:          'Dipterocarp Species Classifier',
    description:    'A deep-learning system for automated identification of Philippine Dipterocarp tree species from leaf imagery. Built as an undergraduate thesis, it uses a CNN trained on a custom dataset sourced from Mount Makiling\'s forest reserve, achieving high classification accuracy and leveraging Grad-CAM for explainable AI visualizations — turning field photography into a non-invasive alternative to manual tree inventory.',
    tech_stack:     ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Grad-CAM'],
    priority_score: 9,
    external_link:  null,
  },
  {
    title:          'ArcLight — Edge-AI Face Recognition',
    description:    'A real-time face recognition system designed for resource-constrained environments. Combines YOLOv5 for fast face detection with ArcFace embeddings for high-accuracy identity verification, deployed on a Raspberry Pi. Built as a freelance engagement to bring biometric access control to settings without cloud connectivity.',
    tech_stack:     ['Python', 'YOLOv5', 'ArcFace', 'Raspberry Pi', 'Edge AI'],
    priority_score: 7,
    external_link:  null,
  },
  {
    title:          'QS ImpACT',
    description:    'An award-winning educational game built in Unity where players experience the ecological and economic consequences of invasive species in Philippine forests. Designed to make environmental science tangible and emotionally resonant for a general audience.',
    tech_stack:     ['Unity', 'C#', 'Game Dev'],
    priority_score: 5,
    external_link:  null,
  },
  {
    title:          'PMS — Project Management System',
    description:    'A web-based project management system built during a software development internship at DOST-FPRDI. Streamlines internal project tracking with features including digital signature integration, certificate validation, and PDF export. Built with Laravel and MySQL, it replaced manual document workflows for a government research institution.',
    tech_stack:     ['Laravel', 'MySQL', 'Bootstrap', 'PHP', 'OPENSSL'],
    priority_score: 9,
    external_link:  null,
  },
];

const EXPERIENCE = [
  {
    role:             'Freelance ML Engineer',
    company:          'ArcLight (Independent)',
    location:         'Los Baños, Laguna',
    date_range:       '2026',
    responsibilities: [
      'Designed and implemented an edge-AI face recognition pipeline using YOLOv5 and ArcFace.',
      'Optimized inference for deployment on Raspberry Pi hardware with limited compute.',
      'Delivered a working biometric access control demo for a client use case.',
    ],
  },
  {
    role:             'IT & Systems Development Intern',
    company:          'DOST-FPRDI',
    location:         'UPLB, Los Baños, Laguna',
    date_range:       'Dec 2025 – Feb 2026',
    responsibilities: [
      'Assisted in the development and maintenance of internal IT systems.',
      'Contributed to digitization initiatives for forestry research data.',
      'Collaborated with senior researchers on systems documentation and workflow improvement.',
    ],
  },
];

const SKILLS = [
  { name: 'Python',       category: 'Languages' },
  { name: 'PHP',          category: 'Languages' },
  { name: 'JavaScript',   category: 'Languages' },
  { name: 'SQL',          category: 'Languages' },
  { name: 'C#',           category: 'Languages' },
  { name: 'HTML/CSS',     category: 'Languages' },
  { name: 'TensorFlow',   category: 'ML & AI' },
  { name: 'Keras',        category: 'ML & AI' },
  { name: 'PyTorch',      category: 'ML & AI' },
  { name: 'scikit-learn', category: 'ML & AI' },
  { name: 'OpenCV',       category: 'ML & AI' },
  { name: 'YOLOv5',       category: 'ML & AI' },
  { name: 'ArcFace',      category: 'ML & AI' },
  { name: 'Laravel',      category: 'Web & Backend' },
  { name: 'FastAPI',      category: 'Web & Backend' },
  { name: 'REST APIs',    category: 'Web & Backend' },
  { name: 'AJAX',         category: 'Web & Backend' },
  { name: 'Git',          category: 'Tools & Platforms' },
  { name: 'VS Code',      category: 'Tools & Platforms' },
  { name: 'Linux',        category: 'Tools & Platforms' },
  { name: 'Raspberry Pi', category: 'Tools & Platforms' },
  { name: 'MySQL',        category: 'Tools & Platforms' },
  { name: 'Ollama',       category: 'Tools & Platforms' },
];

const CERTIFICATES = [];

// ── PROJECTS ─────────────────────────────────────────────────────
function loadProjects() {
  const container = document.getElementById('projects-container');
  document.getElementById('projects-skeleton')?.remove();

  if (!PROJECTS.length) {
    container.innerHTML = '<p class="text-text-muted text-sm">No projects to display yet.</p>';
    return;
  }

  const html = PROJECTS.map(p => {
    const isFeat  = p.priority_score >= 8;
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
}

// ── EXPERIENCE ───────────────────────────────────────────────────
function loadExperience() {
  const container = document.getElementById('experience-container');
  document.getElementById('experience-skeleton')?.remove();

  if (!EXPERIENCE.length) {
    container.innerHTML = '<p class="text-text-muted text-sm">No experience entries yet.</p>';
    return;
  }

  const html = EXPERIENCE.map(exp => {
    const duties = (exp.responsibilities || [])
      .map(r => `<li class="flex items-start gap-2 text-text-secondary text-sm">
                   <span class="text-accent shrink-0">▸</span>
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
}

// ── SKILLS ───────────────────────────────────────────────────────
function loadSkills() {
  const container = document.getElementById('skills-container');
  document.getElementById('skills-skeleton')?.remove();

  const grouped = SKILLS.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  const categoryColors = {
    'Languages':         'text-accent',
    'ML & AI':           'text-blue',
    'Web & Backend':     'text-purple-400',
    'Tools & Platforms': 'text-yellow-400',
  };

  const html = Object.entries(grouped).map(([cat, items]) => {
    const color = categoryColors[cat] || 'text-accent';
    const tags  = items.map(s => `<span class="tag">${s.name}</span>`).join('');
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
}

// ── CERTIFICATES ─────────────────────────────────────────────────
function loadCertificates() {
  const container = document.getElementById('certificates-container');
  document.getElementById('certificates-skeleton')?.remove();

  if (!CERTIFICATES.length) {
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

  const html = CERTIFICATES.map(cert => {
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
loadProjects();
loadExperience();
loadSkills();
loadCertificates();
