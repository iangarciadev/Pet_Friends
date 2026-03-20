/* ═══════════════════════════════════════════════════════════════
   DADOS DA ONG
   ↓ Edite esta seção para personalizar o site
═══════════════════════════════════════════════════════════════ */

const ONG = {
  nome: "Pet Friends",
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
      valor: "@petfriends_animal",
      link: "https://instagram.com/petfriends_animal"
    },
    {
      icone: "📧",
      label: "E-mail",
      valor: "adocao@petfriends.org",
      link: "mailto:adocao@petfriends.org"
    },

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
    nome: "Afonso",
    foto: "Imagens/Afonso.png",
    emoji: "🐶",
    idade: "5 anos",
    porte: "Médio",
    sexo: "Macho",
    castrado: "Sim",
    vacinado: "Sim, V10 e Raiva",
    afinidade_caes: "Sim",
    afinidade_gatos: "Não testado",
    gosta_de_carinho: "Sim",
    gosta_de_brincar: "Sim",
    gosta_de_passear: "Sim",
    agitado: "Não",
    pula_muito: "Não",
    late_muito: "Não",
    possessivo: "Não",
    medicacao_continua: "Não",
    comorbidades: "Não",
    descricao: "Resgatado em uma construção em Mauá junto com a Pilar. Corriam risco de cair no fosso do elevador pois ficavam em um andar mais elevado",
    tags: ["Dócil", "Brincalhão", "Adora crianças"]
  },

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
        <div class="modal-detail">
          <div class="modal-detail-label">Afinidade com cães</div>
          <div class="modal-detail-value">${dog.afinidade_caes}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Afinidade com gatos</div>
          <div class="modal-detail-value">${dog.afinidade_gatos}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Gosta de carinho?</div>
          <div class="modal-detail-value">${dog.gosta_de_carinho}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Gosta de brincar?</div>
          <div class="modal-detail-value">${dog.gosta_de_brincar}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Gosta de passear?</div>
          <div class="modal-detail-value">${dog.gosta_de_passear}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label"> Agitado</div>
          <div class="modal-detail-value">${dog.agitado}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Pula muito?</div>
          <div class="modal-detail-value">${dog.pula_muito}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Late muito?</div>
          <div class="modal-detail-value">${dog.late_muito}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Possessivo?</div>
          <div class="modal-detail-value">${dog.possessivo}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Medicação contínua?</div>
          <div class="modal-detail-value">${dog.medicacao_continua}</div>
        </div>
        <div class="modal-detail">
          <div class="modal-detail-label">Comorbidades?</div>
          <div class="modal-detail-value">${dog.comorbidades}</div>
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
