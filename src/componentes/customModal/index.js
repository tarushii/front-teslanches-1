import React from 'react';
import './styles.css';

export default function CustomModal({ children, className }) {
  return (
    <div className="conteiner flexColunm contentCenter itemsCenter">
      <div className={`${className} contentWrapper`}>
        {children}
      </div>
    </div>
  );
}
