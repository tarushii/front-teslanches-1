import * as yup from 'yup';

const schemaLogin = yup.object().shape({
  email: yup.string().email().required(),
  senha: yup.string().min(8).required(),
});

const schemaCadastro = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().min(8).required(),
  senhaConfere: yup.string().min(8).required(),
  nome_restaurante: yup.string().required(),
  descricao: yup.string(50).required(),
  taxa_entrega: yup.number().positive().integer().required(),
  tempo_entrega: yup.number().positive().integer().required(),
  valor_pedido: yup.number().positive().integer().required(),
});

export { schemaCadastro, schemaLogin };
