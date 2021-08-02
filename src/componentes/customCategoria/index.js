import './styles.css';

const categorias = [
  'Escolha uma categoria',
  'chines',
  'japones',
  'mineira',
  'italiana'
];

export default function InputSelect({ setCategoria }) {
  return (
    <div className="flexColunm mb1rem posRelative">
      <label htmlFor="categoria">Categoria do restaurante</label>
      <select className="categoria" id="categoria" type="select" onChange={(e) => setCategoria(e.target.value)}>
        { categorias.map((categoria) => (
          <option className="categoria" value="categoria">{categoria}</option>
        ))}
      </select>
    </div>

  );
}
