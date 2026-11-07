// Aguarda o carregamento completo do HTML antes de executar os scripts
document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. CONTROLO DO MENU LATERAL (DRAWER)
  // ==========================================
  const btnMenuToggle = document.getElementById('btnMenuToggle');
  const btnCloseMenu = document.getElementById('btnCloseMenu');
  const sideMenu = document.getElementById('sideMenu');
  const sideMenuOverlay = document.getElementById('sideMenuOverlay');

  // Função para abrir o menu lateral
  function openSideMenu() {
    if (sideMenu && sideMenuOverlay) {
      sideMenu.classList.add('active');
      sideMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Impede o scroll da página ao abrir o menu
    }
  }

  // Função para fechar o menu lateral
  function closeSideMenu() {
    if (sideMenu && sideMenuOverlay) {
      sideMenu.classList.remove('active');
      sideMenuOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restaura o scroll da página
    }
  }

  // Eventos de clique para abrir e fechar
  if (btnMenuToggle) btnMenuToggle.addEventListener('click', openSideMenu);
  if (btnCloseMenu) btnCloseMenu.addEventListener('click', closeSideMenu);
  if (sideMenuOverlay) sideMenuOverlay.addEventListener('click', closeSideMenu);

  // Fechar o menu ao clicar nos links (exceto no link principal do submenu)
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
      event.preventDefault(); // Evita a navegação imediata ao apenas expandir a lista
      
      // Alterna a classe 'open' para exibir/esconder o submenu e girar a seta
      sideLinkMain.classList.toggle('open');
      sideDropdown.classList.toggle('open');
    });
  }

  // ==========================================
  // 3. FORMULÁRIO DE PESQUISA
  // ==========================================
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput ? searchInput.value.trim() : '';

      if (query !== '') {
        alert(`A pesquisar por: ${query}`);
        // Futuramente, aqui irás redirecionar para a página de resultados
      } else {
        alert('Por favor, digite um termo para pesquisar.');
      }
    });
  }

  // ==========================================
  // 4. CONTROLO INTELIGENTE DE LINK ATIVO PELA URL
  // ==========================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .side-menu-list a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Se a URL contiver o caminho do link, adiciona a classe active
    if (href && currentPath.includes(href) && href !== 'index.html' && href !== '../index.html') {
      link.classList.add('active');

      // Se o link ativo estiver dentro do submenu, mantém o submenu expandido
      if (link.closest('.side-dropdown')) {
        const parentDropdown = link.closest('.side-dropdown');
        const parentLinkMain = parentDropdown.previousElementSibling;
        
        if (parentDropdown && parentLinkMain) {
          parentDropdown.classList.add('open');
          parentLinkMain.classList.add('open');
        }
      }
    }
  });

});