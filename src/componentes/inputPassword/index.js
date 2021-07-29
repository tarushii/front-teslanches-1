import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './styles.css';

export default function InputPassword({
  label, value, setValue
}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="flexColunm mb1rem inputPassword">
      <label htmlFor="senha">Senha</label>
      <input
        id="senha"
        type={mostrarSenha ? 'text' : 'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FontAwesomeIcon
        onClick={() => setMostrarSenha(!mostrarSenha)}
        className="eyePassword"
        icon={mostrarSenha ? faEye : faEyeSlash}
        size="lg"
      />
    </div>
  );
}
