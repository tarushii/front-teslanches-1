import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './styles.css';

export default function InputPassword(props) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="flexColunm mb1rem inputPassword">
      <label>{props.label}</label>
      <input
        type={mostrarSenha ? 'text' : 'password'}
        value={props.value}
        {... props.register()}
        onChange={(e) => props.setValue(e.target.value)}
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
