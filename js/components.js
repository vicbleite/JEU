// evita duplicação de codigo

// js/components.js — Injeção Dinâmica de Headers e Footer (Com distinção entre Home e Internas)
(function () {
  const currentPath = window.location.pathname;
  const isSubfolder = currentPath.includes('/paginas/');
  
  const basePath = isSubfolder ? '../' : './';
  const pagePath = isSubfolder ? '' : 'paginas/';

  const pageTitle = document.body.dataset.pageTitle || 'JORNAL ECONÔMICO';
  const pageSubtitle = document.body.dataset.pageSubtitle || 'JEU UNICAMP — INSTITUTO DE ECONOMIA';

  // 1. MENU LATERAL (Idêntico para todas)
  const sideMenuHTML = `
    <div class="side-menu-overlay" id="sideMenuOverlay"></div>
    <aside class="side-menu" id="sideMenu">
      <div class="side-menu-header">
        <h3>JEU</h3>
        <button class="btn-close-menu" id="btnCloseMenu">&times;</button>
      </div>
      <ul class="side-menu-list">
        <li><a href="${basePath}index.html">Início</a></li>
        <li class="side-dropdown-item">
          <a href="${basePath}index.html#areas" class="side-link-main">Áreas de Pesquisa</a>
          <ul class="side-dropdown">
            <li><a href="${pagePath}equities.html">Equities</a></li>
            <li><a href="${pagePath}renda-fixa.html">Renda Fixa</a></li>
            <li><a href="${pagePath}commodities.html">Commodities</a></li>
            <li><a href="${pagePath}forex.html">Forex</a></li>
            <li><a href="${pagePath}global.html">Global</a></li>
          </ul>
        </li>
        <li><a href="${pagePath}diagnosticos-mensais.html">Diagnóstico Mensal</a></li>
        <li><a href="${pagePath}quem-somos.html">Quem Somos</a></li>
        <li><a href="${pagePath}processo-seletivo.html">Processo Seletivo</a></li>
        <li><a href="${pagePath}painel-redator.html">Área do Membro</a></li>
      </ul>
    </aside>
  `;

  // 2. TOPBAR COM COTAÇÕES (Idêntica para todas)
  const topbarHTML = `
    <div class="topbar">
      <div class="ticker-container">
        <div class="ticker-wrap">
          <span class="ticker-item">USD/BRL: R$ 4,97 <span class="down">-0.22%</span></span> |
          <span class="ticker-item">SELIC: 11.25%</span> |
          <span class="ticker-item">S&P 500: 5.088 pts <span class="up">+0.41%</span></span> |
          <span class="ticker-item">BRENT: $82.40 <span class="up">+0.15%</span></span>
        </div>
      </div>
    </div>
  `;

  // 3. HEADER PRINCIPAL DINÂMICO
  let mainHeaderHTML = '';

  if (!isSubfolder) {
    // LAYOUT DA PÁGINA INICIAL (INDEX) - Mantém o padrão original
    mainHeaderHTML = `
      <header class="main-header" id="mainHeader">
        <div class="header-left">
          <button class="btn-menu-toggle" id="btnMenuToggle">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="0" y1="1" x2="18" y2="1"/><line x1="0" y1="7" x2="18" y2="7"/><line x1="0" y1="13" x2="18" y2="13"/>
            </svg> MENU
          </button>
        </div>
        <div class="brand-center">
          <a href="${basePath}index.html">
            <img src="${basePath}assets/logo-transparente.png" alt="Ícone JEU" class="brand-logo-img">
          </a>
          <div class="brand-text">
            <h1 class="brand-title">${pageTitle}</h1>
            <span class="brand-subtitle">${pageSubtitle}</span>
          </div>
        </div>
        <div class="header-right">
          <form class="search-box" id="searchForm">
            <input type="text" class="search-input" id="searchInput" placeholder="Buscar..." aria-label="Buscar no site">
            <button type="submit" class="search-btn" aria-label="Confirmar busca">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </form>
          <a href="${pagePath}painel-redator.html" class="btn-entrar">Entrar</a>
        </div>
      </header>
    `;
  } else {
    // LAYOUT DAS SUBPÁGINAS (Mais enxuto, sem o logo gigante no centro)
    mainHeaderHTML = `
      <header class="main-header" id="mainHeader" style="padding-top: 15px; padding-bottom: 15px; min-height: 70px;">
        
        <div class="header-left" style="display: flex; align-items: center; gap: 20px;">
          <button class="btn-menu-toggle" id="btnMenuToggle">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="0" y1="1" x2="18" y2="1"/><line x1="0" y1="7" x2="18" y2="7"/><line x1="0" y1="13" x2="18" y2="13"/>
            </svg> MENU
          </button>
        </div>

        <div class="brand-center">
          <div class="brand-text" style="text-align: center;">
            <h1 class="brand-title" style="font-size: 1.8rem; margin: 0; letter-spacing: 1px;">${pageTitle}</h1>
            <span class="brand-subtitle" style="font-size: 0.75rem; letter-spacing: 1px;">${pageSubtitle}</span>
          </div>
        </div>

        <div class="header-right">
          <form class="search-box" id="searchForm">
            <input type="text" class="search-input" id="searchInput" placeholder="Buscar..." aria-label="Buscar no site">
            <button type="submit" class="search-btn" aria-label="Confirmar busca">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </form>
          <a href="${pagePath}painel-redator.html" class="btn-entrar">Entrar</a>
        </div>

      </header>
    `;
  }

  // 4. STICKY HEADER (Idêntico para todas)
  const stickyHeaderHTML = `
    <div class="sticky-header" id="stickyHeader">
      <div class="sticky-container">
        <button class="btn-menu-toggle" id="btnStickyMenuToggle">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="0" y1="1" x2="18" y2="1"/><line x1="0" y1="7" x2="18" y2="7"/><line x1="0" y1="13" x2="18" y2="13"/>
          </svg> MENU
        </button>
        <a href="${basePath}index.html" class="sticky-brand">
          <img src="${basePath}assets/logo-transparente.png" alt="Ícone JEU" class="sticky-logo-img" style="border-radius: 4px;">          
          <span>JEU UNICAMP</span>
        </a>
        <form class="search-box" id="stickySearchForm">
          <input type="text" class="search-input" id="stickySearchInput" placeholder="Buscar..." aria-label="Buscar no site">
          <button type="submit" class="search-btn" aria-label="Confirmar busca">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </form>
      </div>
    </div>
  `;

  // Insere os elementos no início do <body>
  document.body.insertAdjacentHTML('afterbegin', sideMenuHTML + topbarHTML + mainHeaderHTML + stickyHeaderHTML);

  // 5. RODAPÉ INSTITUCIONAL REORGANIZADO EM COLUNAS (FOOTER)
  const footerHTML = `
    <footer>
      <div class="footer-container">
        
        <!-- Coluna 1: Sobre -->
        <div class="footer-col footer-col-main">
          <h5>JEU — Jornal Econômico Universitário</h5>
          <p>Projeto de extensão nascido no Instituto de Economia da Unicamp e aberto a estudantes de todos os cursos da universidade.</p>
        </div>

        <!-- Coluna 2: Navegação Institucional -->
        <div class="footer-col">
          <h5>INSTITUCIONAL</h5>
          <ul>
            <li><a href="${basePath}index.html">Início</a></li>
            <li><a href="${pagePath}quem-somos.html">Quem Somos</a></li>
            <li><a href="${pagePath}processo-seletivo.html">Processo Seletivo</a></li>
            <li><a href="${pagePath}diagnosticos-mensais.html">Diagnóstico Mensal</a></li>
            <li><a href="${pagePath}painel-redator.html">Área do Membro</a></li>
          </ul>
        </div>

        <!-- Coluna 3: Áreas de Pesquisa -->
        <div class="footer-col">
          <h5>PESQUISA</h5>
          <ul>
            <li><a href="${pagePath}equities.html">Equities</a></li>
            <li><a href="${pagePath}renda-fixa.html">Renda Fixa</a></li>
            <li><a href="${pagePath}commodities.html">Commodities</a></li>
            <li><a href="${pagePath}forex.html">Forex</a></li>
            <li><a href="${pagePath}global.html">Global</a></li>
          </ul>
        </div>

        <!-- Coluna 4: Contato & Redes -->
        <div class="footer-col">
          <h5>CONTATO</h5>
          <ul class="contact-list">
            <li>
              <a href="https://wa.me/9999999" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                (19) 9999-9999
              </a>
            </li>
            <li>
              <a href="mailto:contato@contato.com.br">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                contato@contato.com.br
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/jeu_unicamp" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                jeu_unicamp
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/company/jornal-econômico-universitário-jeu" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                company/jeu
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} Jornal Econômico Universitário — IE Unicamp. Todos os direitos reservados.
      </div>
    </footer>
  `;

  // Insere o rodapé no final do <body>
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // 6. DESTACAR A PÁGINA ATUAL NO MENU LATERAL
  const sideMenuLinks = document.querySelectorAll('.side-menu-list a');
  
  sideMenuLinks.forEach(link => {
    const linkUrl = new URL(link.href);
    const currentUrl = new URL(window.location.href);
    
    // Normaliza os caminhos (se o utilizador estiver em "/" ele entende como "/index.html")
    const linkPath = linkUrl.pathname.replace(/\/$/, '/index.html');
    const currentPath = currentUrl.pathname.replace(/\/$/, '/index.html');

    // Só adiciona a classe se a página E a âncora (#) forem estritamente iguais
    if (linkPath === currentPath && linkUrl.hash === currentUrl.hash) {
      link.classList.add('active');
    }
  });

})();