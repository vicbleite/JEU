// evita duplicação de codigo

// js/components.js — Injeção Dinâmica de Headers (Com distinção entre Home e Internas)
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
        <li><a href="${basePath}index.html#sobre">Quem Somos</a></li>
        <li><a href="${basePath}index.html#processo-seletivo">Processo Seletivo</a></li>
        <li><a href="${basePath}painel-redator.html">Área do Membro</a></li>
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
            <img src="${basePath}assets/logo.png" alt="Ícone JEU" class="brand-logo-img">
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
          <a href="${basePath}painel-redator.html" class="btn-entrar">Entrar</a>
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
          <a href="${basePath}painel-redator.html" class="btn-entrar">Entrar</a>
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
          <img src="${basePath}assets/logo.png" alt="Ícone JEU" class="sticky-logo-img">
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
})();