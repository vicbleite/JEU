/* ==========================================================================
   LÓGICA DA FASE 2 — PAINEL DO REDATOR (CARREGAMENTO DINÂMICO & SPA)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const usuarioSalvo = sessionStorage.getItem('jeu_redator_logado');
  if (usuarioSalvo === 'true') {
    exibirPainelInterno();
  } else {
    exibirTelaLogin();
  }
});

function realizarLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;

  if (email && senha) {
    sessionStorage.setItem('jeu_redator_logado', 'true');
    exibirPainelInterno();
  } else {
    alert('Por favor, preencha o e-mail e a senha.');
  }
}

function realizarLogout() {
  sessionStorage.removeItem('jeu_redator_logado');
  fecharDrawerPerfil();
  exibirTelaLogin();
}

function exibirPainelInterno() {
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('panelSection').style.display = 'block';
  document.getElementById('userProfileWidget').style.display = 'flex';

  // Carrega a aba padrão ("Nova Matéria") assim que entra
  const btnDefault = document.querySelector('.panel-tabs .tab-btn');
  carregarAba('tab-nova-materia', btnDefault);
}

function exibirTelaLogin() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.reset();
  
  document.getElementById('loginSection').style.display = 'block';
  document.getElementById('panelSection').style.display = 'none';
  document.getElementById('userProfileWidget').style.display = 'none';
}

/* ==========================================
   CARREGADOR DINÂMICO DE ABAS (FETCH API)
   ========================================== */
async function carregarAba(nomeArquivoAba, btnElement) {
  const container = document.getElementById('tabContainer');
  
  // Atualiza classe ativa dos botões
  const tabBtns = document.querySelectorAll('.panel-tabs .tab-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  try {
    const resposta = await fetch(`abas-painel-redator/${nomeArquivoAba}.html`);
    if (!resposta.ok) throw new Error('Não foi possível carregar a aba.');
    
    const html = await resposta.text();
    container.innerHTML = html;

    // Reinicializa comportamentos dinâmicos específicos da aba carregada
    if (nomeArquivoAba === 'tab-nova-materia') {
      renderizarTagsColaboradores();
    }
  } catch (erro) {
    container.innerHTML = `<div class="panel-card"><p style="color: red;">Erro ao carregar o conteúdo da aba.</p></div>`;
  }
}

/* ==========================================
   DRAWER DE PERFIL
   ========================================== */
function abrirDrawerPerfil() {
  document.getElementById('profileDrawer').classList.add('active');
  document.getElementById('profileDrawerOverlay').classList.add('active');
}

function fecharDrawerPerfil() {
  document.getElementById('profileDrawer').classList.remove('active');
  document.getElementById('profileDrawerOverlay').classList.remove('active');
}

function salvarPerfil(event) {
  event.preventDefault();
  
  const novoNome = document.getElementById('perfilNome').value;
  const novoCargo = document.getElementById('perfilCargo').value;

  document.getElementById('headerUserName').textContent = novoNome;
  document.getElementById('headerUserRole').textContent = novoCargo;

  if (colaboradoresSelecionados.length > 0 && colaboradoresSelecionados[0].principal) {
    colaboradoresSelecionados[0].nome = novoNome;
    renderizarTagsColaboradores();
  }

  alert('Perfil atualizado com sucesso!');
  fecharDrawerPerfil();
}

/* ==========================================
   GERENCIADOR DE COLABORADORES (MULTIUSUÁRIO)
   ========================================== */
let colaboradoresSelecionados = [
  { email: "ana.souza@jeu.unicamp.br", nome: "Ana Souza", principal: true }
];

function adicionarCoautor(selectElement) {
  const email = selectElement.value;
  if (!email) return;

  const nomeOption = selectElement.options[selectElement.selectedIndex].text;

  if (colaboradoresSelecionados.some(c => c.email === email)) {
    selectElement.value = "";
    return;
  }

  colaboradoresSelecionados.push({ email: email, nome: nomeOption, principal: false });
  renderizarTagsColaboradores();
  selectElement.value = "";
}

function removerCoautor(email) {
  colaboradoresSelecionados = colaboradoresSelecionados.filter(c => c.email !== email || c.principal);
  renderizarTagsColaboradores();
}

function renderizarTagsColaboradores() {
  const container = document.getElementById('collaboratorsTags');
  if (!container) return;
  
  container.innerHTML = "";

  colaboradoresSelecionados.forEach(c => {
    const chip = document.createElement('span');
    chip.className = `collaborator-chip ${c.principal ? 'main-author' : ''}`;
    
    if (c.principal) {
      chip.innerHTML = `👤 ${c.nome} (Você)`;
    } else {
      chip.innerHTML = `
        👤 ${c.nome}
        <button type="button" class="btn-remove-chip" onclick="removerCoautor('${c.email}')">&times;</button>
      `;
    }
    container.appendChild(chip);
  });
}

function atualizarNomeArquivo(input, elementId) {
  const displayElement = document.getElementById(elementId);
  if (!displayElement) return;

  if (input.files && input.files.length > 0) {
    displayElement.textContent = input.files[0].name;
    displayElement.style.color = "var(--verde-escuro)";
    displayElement.style.fontWeight = "600";
  } else {
    displayElement.textContent = "Nenhum arquivo selecionado";
    displayElement.style.color = "var(--grafite-claro)";
    displayElement.style.fontWeight = "normal";
  }
}

function enviarMateria(event) {
  event.preventDefault();

  const titulo = document.getElementById('materiaTitulo').value;
  const categoria = document.getElementById('materiaCategoria').value;

  if (!titulo || !categoria) {
    alert('Por favor, preencha o Título e a Área de Pesquisa.');
    return;
  }

  alert('Matéria publicada com sucesso!');
  
  // Muda dinamicamente para a aba "Minhas Matérias"
  const tabBtnMinhasMaterias = document.querySelectorAll('.panel-tabs .tab-btn')[1];
  carregarAba('tab-minhas-materias', tabBtnMinhasMaterias);
}