// Validações do formulário de filtros da tela "Listagem de Demandas".
// Responsabilidade: Ramiro Alexander

(function () {
  document.addEventListener('DOMContentLoaded', inicializar);

  function inicializar() {
    var formulario = document.getElementById('form-filtros');
    if (!formulario) {
      return;
    }

    var campoBusca = document.getElementById('busca');
    var campoStatus = document.getElementById('status');
    var campoPrioridade = document.getElementById('prioridade');

    var STATUS_PERMITIDOS = ['Todos', 'Pendente', 'Em andamento', 'Concluída', 'Atrasada'];
    var PRIORIDADES_PERMITIDAS = ['Todas', 'Crítica', 'Alta', 'Média', 'Baixa'];

    var TAMANHO_MINIMO_BUSCA = 2;
    var TAMANHO_MAXIMO_BUSCA = 60;

    function validarBusca() {
      var valor = campoBusca.value.trim();

      if (valor.length === 0) {
        campoBusca.setCustomValidity('');
        return;
      }

      if (valor.length < TAMANHO_MINIMO_BUSCA) {
        campoBusca.setCustomValidity(
          'Digite pelo menos ' + TAMANHO_MINIMO_BUSCA + ' caracteres para buscar, ou deixe o campo em branco.'
        );
        return;
      }

      if (valor.length > TAMANHO_MAXIMO_BUSCA) {
        campoBusca.setCustomValidity(
          'A busca deve ter no máximo ' + TAMANHO_MAXIMO_BUSCA + ' caracteres.'
        );
        return;
      }

      campoBusca.setCustomValidity('');
    }

    function validarSelecao(campo, valoresPermitidos, descricaoCampo) {
      if (valoresPermitidos.indexOf(campo.value) === -1) {
        campo.setCustomValidity('Selecione ' + descricaoCampo + ' válido(a) dentre as opções disponíveis.');
      } else {
        campo.setCustomValidity('');
      }
    }

    function validarStatus() {
      validarSelecao(campoStatus, STATUS_PERMITIDOS, 'um status');
    }

    function validarPrioridade() {
      validarSelecao(campoPrioridade, PRIORIDADES_PERMITIDAS, 'uma prioridade');
    }

    campoBusca.addEventListener('input', validarBusca);
    campoStatus.addEventListener('change', validarStatus);
    campoPrioridade.addEventListener('change', validarPrioridade);

    formulario.addEventListener('submit', function (evento) {
      validarBusca();
      validarStatus();
      validarPrioridade();

      if (!formulario.checkValidity()) {
        evento.preventDefault();
        formulario.reportValidity();
      }
    });
  }
})();
