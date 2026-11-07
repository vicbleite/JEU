// Aguarda o carregamento completo do HTML e dos componentes antes de executar
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. CONTROLE DO MENU LATERAL (DRAWER)
  // ==========================================
  const sideMenu = document.getElementById('sideMenu');
  const sideMenuOverlay = document.getElementById('sideMenuOverlay');

  function openSideMenu() {
    if (sideMenu && sideMenuOverlay) {
      sideMenu.classList.add('active');
      sideMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSideMenu() {
    if (sideMenu && sideMenuOverlay) {
      sideMenu.classList.remove('active');
      sideMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Event Delegation para garantir o clique nos botões de menu principal e sticky
  document.addEventListener('click', (event) => {
    const toggleBtn = event.target.closest('#btnMenuToggle, #btnStickyMenuToggle');
    const closeBtn = event.target.closest('#btnCloseMenu');
    const overlay = event.target.closest('#sideMenuOverlay');

    if (toggleBtn) {
      openSideMenu();
    } else if (closeBtn || overlay) {
      closeSideMenu();
    }
  });

  // Fechar o menu ao clicar nos links (exceto na sanfona principal)
  const sideMenuLinks = document.querySelectorAll('.side-menu-list a:not(.side-link-main)');
  sideMenuLinks.forEach(link => {
    link.addEventListener('click', closeSideMenu);
  });

  // ==========================================
  // 2. TOGGLE DO SUBMENU ÁREAS DE PESQUISA (SANFONA)
  // ==========================================
  const sideLinkMain = document.querySelector('.side-link-main');
  const sideDropdown = document.querySelector('.side-dropdown');

  if (sideLinkMain && sideDropdown) {
    sideLinkMain.addEventListener('click', (event) => {
      event.preventDefault();
      sideLinkMain.classList.toggle('open');
      sideDropdown.classList.toggle('open');
    });
  }

  // ==========================================
  // 3. APARIÇÃO DINÂMICA DO STICKY HEADER
  // ==========================================
  const mainHeader = document.getElementById('mainHeader');
  const stickyHeader = document.getElementById('stickyHeader');

  if (mainHeader && stickyHeader) {
    window.addEventListener('scroll', () => {
      const headerBottom = mainHeader.getBoundingClientRect().bottom;

      if (headerBottom < 0) {
        stickyHeader.classList.add('visible');
      } else {
        stickyHeader.classList.remove('visible');
      }
    });
  }

  // ==========================================
  // 4. FORMULÁRIOS DE PESQUISA (MAIN E STICKY)
  // ==========================================
  const handleSearchSubmit = (event, inputElement) => {
    event.preventDefault();
    const query = inputElement ? inputElement.value.trim() : '';

    if (query !== '') {
      alert(`A pesquisar por: ${query}`);
    } else {
      alert('Por favor, digite um termo para pesquisar.');
    }
  };

  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => handleSearchSubmit(e, searchInput));
  }

  const stickySearchForm = document.getElementById('stickySearchForm');
  const stickySearchInput = document.getElementById('stickySearchInput');
  if (stickySearchForm) {
    stickySearchForm.addEventListener('submit', (e) => handleSearchSubmit(e, stickySearchInput));
  }

  // ==========================================
  // 5. CONTROLE INTELIGENTE DE LINK ATIVO PELA URL
  // ==========================================
  const currentPageFile = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .side-menu-list a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    const linkFile = href.split('/').pop();

    if (linkFile === currentPageFile && linkFile !== 'index.html') {
      link.classList.add('active');

      const parentDropdown = link.closest('.side-dropdown');
      if (parentDropdown) {
        parentDropdown.classList.add('open');
        const parentLinkMain = parentDropdown.previousElementSibling;
        if (parentLinkMain) {
          parentLinkMain.classList.add('open');
        }
      }
    }
  });

});