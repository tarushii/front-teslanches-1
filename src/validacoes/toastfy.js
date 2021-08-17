import { toast } from 'react-toastify';

const customId = 'custom-id-yes';

function toastNome() {
  toast.error('O campo nome é obrigatorio', { toastId: customId });
}
function toastEmail() {
  toast.error('O email é obrigatorio', { toastId: customId });
}
function toastTelefone() {
  toast.error('O campo telefone é obrigatorio', { toastId: customId });
}
function toastSenha() {
  toast.error('O campo senha é obrigatorio, com no minimo 8 caracteres', { toastId: customId });
}
function toastSenhaConfere() {
  toast.error('Repita a senha, com no minimo 8 caracteres', { toastId: customId });
}
function toastDescricao() {
  toast.error('O campo descrição é obrigatorio', { toastId: customId });
}
function toastPreco() {
  toast.error('O campo proço é obrigatorio', { toastId: customId });
}
function toastTaxaDeEntrega() {
  toast.error('O taxa de entrega é obrigatorio', { toastId: customId });
}

export {
  toastDescricao,
  toastEmail,
  toastNome,
  toastPreco,
  toastSenha,
  toastSenhaConfere,
  toastTaxaDeEntrega,
  toastTelefone
};
