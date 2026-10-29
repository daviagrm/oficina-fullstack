export default function LinhaGasto({ nome, valor, data, fnEdicao, fnExclusao }) {
  return (
    <div className="linha-gasto">
      <span>Nome: {nome}</span>
      <span>Valor: {valor}</span>
      <span>Data: {data}</span>
      <div className="acoes-linha">
        <button className="botao-editar" onClick={fnEdicao}>
          Editar
        </button>
        <button className="botao-excluir" onClick={fnExclusao}>
          Excluir
        </button>
      </div>
    </div>
  );
}
