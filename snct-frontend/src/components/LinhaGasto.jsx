export default function LinhaGasto({ nome, valor, data, fnExclusao }) {
  return (
    <div className="linha-gasto">
      <span>Nome: {nome}</span>
      <span>Valor: {valor}</span>
      <span>Data: {data}</span>
      <button className="botao-excluir" onClick={fnExclusao}>
        Excluir
      </button>
    </div>
  );
}
