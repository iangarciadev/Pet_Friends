/* ═══════════════════════════════════════════════════════════════
   DADOS DA ONG
   ↓ Edite esta seção para personalizar o site
═══════════════════════════════════════════════════════════════ */

const ONG = {
  nome: "Patinhas do Bem",
  contatos: [
    {
      icone: "📱",
      label: "WhatsApp",
      valor: "(11) 91234-5678",
      link: "https://wa.me/5511912345678"
    },
    {
      icone: "📸",
      label: "Instagram",
      valor: "@patinhasdobem",
      link: "https://instagram.com/patinhasdobem"
    },
    {
      icone: "📧",
      label: "E-mail",
      valor: "adocao@patinhasdobem.org",
      link: "mailto:adocao@patinhasdobem.org"
    },
    {
      icone: "📍",
      label: "Endereço",
      valor: "Rua das Flores, 42 — São Paulo, SP",
      link: "https://maps.google.com"
    }
  ]
};

/*
 * LISTA DE CACHORROS
 * Campos:
 *   nome       → string
 *   foto       → URL da imagem (ou "" para usar o emoji)
 *   emoji      → emoji exibido quando não há foto
 *   idade      → string, ex.: "2 anos" ou "6 meses"
 *   porte      → "Pequeno" | "Médio" | "Grande"
 *   sexo       → "Macho" | "Fêmea"
 *   castrado   → "Sim" | "Não"
 *   vacinado   → "Sim" | "Não"
 *   descricao  → texto curto sobre a personalidade
 *   tags       → array de strings (características)
 */
const CACHORROS = [
  {
    nome: "Bolota",
    foto: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    emoji: "🐶",
    idade: "3 anos",
    porte: "Médio",
    sexo: "Macho",
    castrado: "Sim",
    vacinado: "Sim",
    descricao: "Bolota é alegre, adora brincar e se dá bem com crianças. Ama passear e aprender truques novos.",
    tags: ["Dócil", "Brincalhão", "Adora crianças"]
  },
  {
    nome: "Mel",
    foto: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    emoji: "🐾",
    idade: "1 ano",
    porte: "Pequeno",
    sexo: "Fêmea",
    castrado: "Sim",
    vacinado: "Sim",
    descricao: "Mel é meiga e carinhosa. Perfeita para apartamento e adora um colo no fim do dia.",
    tags: ["Carinhosa", "Tranquila", "Apartamento"]
  },
  {
    nome: "Thor",
    foto: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&q=80",
    emoji: "🦴",
    idade: "4 anos",
    porte: "Grande",
    sexo: "Macho",
    castrado: "Sim",
    vacinado: "Sim",
    descricao: "Thor parece intimidador, mas é um tremendo bobalhão. Ama água e é ótimo com outros cães.",
    tags: ["Amigável", "Ama água", "Bom com cães"]
  },
  {
    nome: "Pipoca",
    foto: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&q=80",
    emoji: "🐕",
    idade: "8 meses",
    porte: "Pequeno",
    sexo: "Fêmea",
    castrado: "Não",
    vacinado: "Sim",
    descricao: "Filhote cheia de energia! Pipoca está em fase de aprendizado e precisa de paciência e carinho.",
    tags: ["Filhote", "Energética", "Em treinamento"]
  },
  {
    nome: "Bob",
    foto: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80",
    emoji: "🐶",
    idade: "6 anos",
    porte: "Médio",
    sexo: "Macho",
    castrado: "Sim",
    vacinado: "Sim",
    descricao: "Bob é calmo, obediente e adora longas caminhadas. Ideal para quem busca um companheiro tranquilo.",
    tags: ["Calmo", "Obediente", "Adulto"]
  },
  {
    nome: "Nina",
    foto: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
    emoji: "🐾",
    idade: "2 anos",
    porte: "Médio",
    sexo: "Fêmea",
    castrado: "Sim",
    vacinado: "Sim",
    descricao: "Nina é esperta e curiosa. Já sabe vários comandos e adora desafios mentais com brinquedos.",
    tags: ["Inteligente", "Curiosa", "Ativa"]
  }
];

/* ═══════════════════════════════════════════════════════════════
   FIM DOS DADOS — não é necessário editar abaixo
═══════════════════════════════════════════════════════════════ */


// ── Renderiza os cards dos cachorros ──────────────────────────
function renderCards() {
  const grid  = document.getElementById("dogs-grid");
  const label = document.getElementById("count-label");

  label.textContent = `${CACHORROS.length} animais disponíveis`;

  grid.innerHTML = CACHORROS.map((dog, index) => `
    <article class="dog-card" tabindex="0"
      onclick="openModal(${index})"
      onkeydown="if(event.key==='Enter') openModal(${index})">

      ${dog.foto
        ? `<img class="dog-photo" src="${dog.foto}" alt="Foto de ${dog.nome}" loading="lazy" />`
        : `<div class="dog-photo-placeholder" aria-label="Foto de ${dog.nome}">${dog.emoji}</div>`}

      <div class="dog-body">
        <h3 class="dog-name">${dog.nome}</h3>
        <div class="dog-tags">
          ${dog.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <p class="dog-desc">${dog.descricao}</p>
        <span class="dog-btn">Ver mais & adotar</span>
      </div>
    </article>
  `).join("");
}

// ── Renderiza os links de contato ─────────────────────────────
function renderContacts() {
  const wrapper = document.getElementById("contact-links");

  wrapper.innerHTML = ONG.contatos.map(c => `
    <a href="${c.link}" class="contact-item" target="_blank" rel="noopener">
      <span class="contact-icon">${c.icone}</span>
      <div>
        <div class="contact-label">${c.label}</div>
        <div class="contact-value">${c.valor}</div>
      </div>
    </a>
  `).join("");
}

// ── Abre o modal com os detalhes do cachorro ──────────────────
function openModal(index) {
  const dog     = CACHORROS[index];
  const overlay = document.getElementById("modal-overlay");
  const box     = document.getElementById("modal-box");

  const whatsapp = ONG.contatos.find(c => c.label === "WhatsApp");
  const link = whatsapp
    ? `${whatsapp.link}?text=Olá! Tenho interesse em adotar ${dog.nome} 🐾`
    : "#contato";

  box.innerHTML = `
    ${dog.foto
      ? `<img class="modal-photo" src="${dog.foto}" alt="Foto de ${dog.nome}" />`
      : `<div class="modal-photo-placeholder">${dog.emoji}</div>`}

    <div class="modal-body">
      <button class="modal-close" onclick="closeModal()" aria-label="Fechar">✕</button>
      <h2 class="modal-name">${dog.nome}</h2>
      <div class="dog-tags">
        ${dog.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <p class="modal-desc">${dog.descricao}</p>
      <div class="modal-details">
        <div class="modal-detail">
          <div class="modal-detail-label">Idade</div>
          <div class="modal-detail-value">${dog.idade}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Porte</div>
          <div class="modal-detail-value">${dog.porte}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Sexo</div>
          <div class="modal-detail-value">${dog.sexo}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Castrado</div>
          <div class="modal-detail-value">${dog.castrado}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Vacinado</div>
          <div class="modal-detail-value">${dog.vacinado}</div>
        </div>
      </div>
      <a href="${link}" class="modal-adopt-btn" target="_blank" rel="noopener">
        Quero adotar ${dog.nome}! 🐾
      </a>
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

// ── Fecha o modal ─────────────────────────────────────────────
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// Fecha ao clicar fora do modal
document.getElementById("modal-overlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Fecha com a tecla ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// ── Inicialização ─────────────────────────────────────────────
renderCards();
renderContacts();
