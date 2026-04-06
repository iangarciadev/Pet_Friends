

// Dados gerais da ONG: nome e canais de contato exibidos na seção de contato.
const ONG = {
  nome: "Pet Friends",
  contatos: [
    {
      icone: "📸",
      label: "Instagram",
      valor: "@petfriends_animal",
      link: "https://instagram.com/petfriends_animal"
    },
    {
      icone: "📧",
      label: "E-mail",
      valor: "petfriends.22@gmail.com",
      link: "mailto:petfriends.22@gmail.com"
    },

  ]
};



// ── Filtros ───────────────────────────────────────────────────

// Estado atual dos filtros ativos. "sexo" aceita um único valor; "porte" e
// "caracteristicas" aceitam múltiplos valores simultaneamente.
const activeFilters = { sexo: null, porte: [], caracteristicas: [] };

// Abre ou fecha o painel de filtros e atualiza o texto/ícone do botão.
function toggleFilters() {
  const panel = document.getElementById('filters');
  const btn   = document.getElementById('filter-toggle-btn');
  const open  = panel.style.display === 'none';
  panel.style.display = open ? 'flex' : 'none';
  btn.textContent = open ? 'Filtrar ▴' : 'Filtrar ▾';
  btn.classList.toggle('active', open);
}

// Alterna um filtro de seleção única (ex: sexo). Se o valor já estava ativo,
// desmarca; caso contrário, substitui o valor anterior.
function toggleSingle(field, value) {
  activeFilters[field] = activeFilters[field] === value ? null : value;
  updatePills();
  visibleCount = 10;
  renderCards();
}

// Adiciona ou remove um valor do filtro de porte (seleção múltipla).
function togglePorte(value) {
  const idx = activeFilters.porte.indexOf(value);
  if (idx === -1) activeFilters.porte.push(value);
  else activeFilters.porte.splice(idx, 1);
  updatePills();
  visibleCount = 10;
  renderCards();
}

// Adiciona ou remove uma característica do filtro de características (seleção múltipla).
function toggleCarac(field) {
  const idx = activeFilters.caracteristicas.indexOf(field);
  if (idx === -1) activeFilters.caracteristicas.push(field);
  else activeFilters.caracteristicas.splice(idx, 1);
  updatePills();
  visibleCount = 10;
  renderCards();
}

// Atualiza a aparência visual (ativo/inativo) de todos os botões de filtro
// com base no estado atual de activeFilters.
function updatePills() {
  document.querySelectorAll('.filter-pill').forEach(btn => {
    const filter = btn.dataset.filter;
    const value  = btn.dataset.value;
    let active = false;
    if (filter === 'sexo')  active = activeFilters.sexo  === value;
    if (filter === 'porte') active = activeFilters.porte.includes(value);
    if (filter === 'carac') active = activeFilters.caracteristicas.includes(value);
    btn.classList.toggle('active', active);
  });
}

// Retorna apenas os cachorros que correspondem a todos os filtros ativos.
// Para "agitado", o filtro busca cachorros que NÃO são agitados (valor "não").
// Para as demais características, busca cachorros com valor "sim".
function applyFilters(dogs) {
  return dogs.filter(dog => {
    if (activeFilters.sexo  && dog.sexo  !== activeFilters.sexo)  return false;
    if (activeFilters.porte.length && !activeFilters.porte.includes(dog.porte)) return false;
    for (const campo of activeFilters.caracteristicas) {
      const val = (dog[campo] || '').toLowerCase();
      if (campo === 'agitado') { if (val !== 'não') return false; }
      else if (val !== 'sim') return false;
    }
    return true;
  });
}

// ── Renderiza os cards dos cachorros ──────────────────────────

// Quantidade de cards visíveis na página. Aumenta em 10 a cada clique em "Ver mais".
let visibleCount = 9;

// Renderiza os cards dos cachorros no grid, aplicando os filtros ativos.
// Exibe mensagem caso nenhum animal corresponda aos filtros.
// Controla a visibilidade do botão "Ver mais" conforme o total filtrado.
function renderCards() {
  const grid    = document.getElementById("dogs-grid");
  const label   = document.getElementById("count-label");
  const wrapper = document.getElementById("show-more-wrapper");

  const filtered = applyFilters(CACHORROS);
  const visible  = filtered.slice(0, visibleCount);

  label.textContent = `${filtered.length} animais disponíveis`;

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-results">Nenhum animal encontrado com esses filtros.</p>`;
    wrapper.style.display = "none";
    return;
  }

  grid.innerHTML = visible.map((dog) => {
    const index = CACHORROS.indexOf(dog);
    return `
    <article class="dog-card" tabindex="0"
      onclick="openModal(${index})"
      onkeydown="if(event.key==='Enter') openModal(${index})">

    ${dog.foto
      ? `<img class="dog-photo" src="${dog.foto}" alt="Foto de ${dog.nome}" loading="lazy" />`
      : `<div class="dog-photo-placeholder">${dog.emoji}</div>`}

      <div class="dog-body">
        <h3 class="dog-name">${dog.nome}</h3>
        <div class="dog-tags">
          ${dog.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
        <p class="dog-desc">${dog.descricao}</p>
        <span class="dog-btn">Ver mais & adotar</span>
      </div>
    </article>
  `;
  }).join("");

  wrapper.style.display = visibleCount < filtered.length ? "flex" : "none";
}

// Carrega mais 10 cards ao clicar no botão "Ver mais".
function showMore() {
  visibleCount += 9;
  renderCards();
}

// ── Renderiza os links de contato ─────────────────────────────

// Gera os links de contato da ONG (Instagram, e-mail, etc.) a partir do
// array ONG.contatos e os insere na seção de contato da página.
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

// ── Detalhes exibidos no modal ────────────────────────────────

// Lista de campos exibidos no modal de detalhes do cachorro.
// Para adicionar ou remover um campo, basta inserir ou apagar uma linha aqui.
// "label" é o texto exibido; "key" é a propriedade correspondente no objeto do cachorro.
const DETALHES_MODAL = [
  { label: "Idade",               key: "idade" },
  { label: "Porte",               key: "porte" },
  { label: "Sexo",                key: "sexo" },
  { label: "Castrado",            key: "castrado" },
  { label: "Vacinado",            key: "vacinado" },
  { label: "Afinidade com cães",  key: "afinidade_caes" },
  { label: "Afinidade com gatos", key: "afinidade_gatos" },
  { label: "Gosta de carinho?",   key: "gosta_de_carinho" },
  { label: "Gosta de brincar?",   key: "gosta_de_brincar" },
  { label: "Gosta de passear?",   key: "gosta_de_passear" },
  { label: "Agitado",             key: "agitado" },
  { label: "Pula muito?",         key: "pula_muito" },
  { label: "Late muito?",         key: "late_muito" },
  { label: "Possessivo?",         key: "possessivo" },
  { label: "Medicação contínua?", key: "medicacao_continua" },
  { label: "Comorbidades?",       key: "comorbidades" },
];

// ── Abre o modal com os detalhes do cachorro ──────────────────

// Preenche e exibe o modal com as informações do cachorro pelo seu índice
// no array CACHORROS. Bloqueia o scroll da página enquanto o modal está aberto.
function openModal(index) {
  const dog     = CACHORROS[index];
  const overlay = document.getElementById("modal-overlay");
  const box     = document.getElementById("modal-box");

  const link = "https://ig.me/m/petfriends_animal";

  box.innerHTML = `
  ${dog.foto
    ? `<img class="modal-photo" src="${dog.foto}" alt="Foto de ${dog.nome}"
        onclick="openLightbox('${dog.foto}', '${dog.nome}')"
        style="cursor: zoom-in;" />`
    : `<div class="modal-photo-placeholder">${dog.emoji}</div>`}

    <div class="modal-body">
      <button class="modal-close" onclick="closeModal()" aria-label="Fechar">✕</button>
      <h2 class="modal-name">${dog.nome}</h2>
      <div class="dog-tags">
        ${dog.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <p class="modal-desc">${dog.descricao}</p>
      <div class="modal-details">
        ${DETALHES_MODAL.map(d => `
          <div class="modal-detail">
            <div class="modal-detail-label">${d.label}</div>
            <div class="modal-detail-value">${dog[d.key]}</div>
          </div>
        `).join("")}
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

// Remove a classe "open" do modal e restaura o scroll da página.
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// Fecha o modal ao clicar no fundo escuro (fora da caixa do modal).
document.getElementById("modal-overlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Fecha o modal ao pressionar a tecla ESC.
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// ── Lightbox ──────────────────────────────────────────────────

// Abre o lightbox com a foto ampliada do cachorro.
// Recebe a URL da imagem e o texto alternativo (nome do animal).
function openLightbox(src, alt) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-img').alt = alt;
  document.getElementById('lightbox-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Fecha o lightbox e restaura o scroll da página.
function closeLightbox() {
  document.getElementById('lightbox-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Fecha o lightbox ao pressionar a tecla ESC.
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});

// ── Inicialização ─────────────────────────────────────────────
renderCards();
renderContacts();

// ── Menu hamburger ────────────────────────────────────────────

// Controla a abertura e fechamento do menu mobile (hamburger).
// Fecha automaticamente ao clicar em qualquer link do menu.
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Exibe o botão "voltar ao topo" somente após o usuário rolar 300px para baixo.
window.addEventListener('scroll', function () {
  const btn = document.getElementById('back-to-top');
  if (window.scrollY > 300) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});
