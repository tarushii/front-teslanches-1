import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './styles.css';

export default function InputPassword({
  label, value, setValue, register, id
}) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="flexColunm mb1rem inputPassword">
      <label>{label}</label>
      <input
        type={mostrarSenha ? 'text' : 'password'}
        value={value}
        {... register(id)}
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
