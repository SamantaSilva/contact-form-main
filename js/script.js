// Seleção de elementos
const formulario = document.getElementById('form');
const camposDoFormulario = document.querySelectorAll('input[required], textarea[required]');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const queryCheckboxes = document.querySelectorAll('.query-checkbox');

// Adicionando um evento para verificar o e-mail quando o usuário digitar
camposDoFormulario[2].addEventListener('input', emailValidate);
camposDoFormulario[2].addEventListener('blur', emailValidate);

// Função para exibir erro
function setError(index) {
    camposDoFormulario[index].style.border = '2px solid #e63636';
    spans[index].style.display = 'block';
}

// Função para remover erro
function removeError(index) {
    camposDoFormulario[index].style.border = '';
    spans[index].style.display = 'none';
}

// Função para validar o nome
function validaNome() {
    if (camposDoFormulario[0].value.length < 3) {
        setError(0);
    } else {
        removeError(0);
    }
}

// Função para validar o sobrenome
function validaSobrenome() {
    if (camposDoFormulario[1].value.length < 3) {
        setError(1);
    } else {
        removeError(1);
    }
}

// Função para validar o e-mail
function emailValidate() {
    if (emailRegex.test(camposDoFormulario[2].value)) {
        removeError(2);
    } else {
        setError(2);
    }
}

// Função para validar a mensagem
function messageValidate() {
    const messageLength = camposDoFormulario[3].value.length;
    if (messageLength < 10 || messageLength > 100) {
        setError(3);
    } else {
        removeError(3);
    }
}

// Função para validar os checkboxes
function validateCheckboxes() {
    if (!queryCheckboxes[0].checked && !queryCheckboxes[1].checked) {
        setError(4);
        return false;
    } else {
        removeError(4);
        return true;
    }
}

// Adicionando evento de change aos checkboxes para permitir apenas uma seleção
function toggleCheckbox(checkbox) {
    queryCheckboxes.forEach(box => {
        if (box !== checkbox) {
            box.checked = false;
        }
    });
}

queryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => toggleCheckbox(checkbox)); // O evento change é um tipo de evento em JavaScript que é disparado quando o valor de um elemento de formulário muda e perde o foco.
});

// Adicionando validação dos checkboxes no envio do formulário
formulario.addEventListener('submit', function (e) {
    validateCheckboxes();
    if (Array.from(spans).some(span => span.style.display === 'block')) {
        e.preventDefault(); // e.preventDefault() é chamado para evitar que o formulário seja enviado, caso certas condições de validação não sejam atendidas.
    }
});
