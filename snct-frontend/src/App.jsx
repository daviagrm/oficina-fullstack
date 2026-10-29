import "./App.css";
import LinhaGasto from "./components/LinhaGasto";
import React from "react";
import { cadastrarDespesa, visualizarDespesas, deletarDespesa, editarDespesa } from "./services/GastoService.js";

function App() {
  const [despesa, setDespesa] = React.useState("");
  const [gasto, setGasto] = React.useState("");
  const [data, setData] = React.useState("");
  const [linhasDeGastos, setLinhasDeGastos] = React.useState([]);
  // ID do gasto que está sendo editado (null quando o formulário está cadastrando)
  const [idEmEdicao, setIdEmEdicao] = React.useState(null);

  const handleVisualizarDespesas = async () => {
    const despesas = await visualizarDespesas();
    setLinhasDeGastos(despesas);
    console.log(despesas);
  }

  React.useEffect(() => {
      handleVisualizarDespesas();
  }, []);

  const limparFormulario = () => {
    setDespesa("");
    setGasto("");
    setData("");
    setIdEmEdicao(null);
  }

  const handleSubmit = async () => {
    const resultado = idEmEdicao
      ? await editarDespesa(idEmEdicao, despesa, data, gasto)
      : await cadastrarDespesa(despesa, data, gasto);

    // se a requisição falhou, mantém o que foi digitado no formulário
    if (!resultado) return;

    limparFormulario();
    await handleVisualizarDespesas();
  };

  const handleEdicao = (linhaDeGasto) => {
    setDespesa(linhaDeGasto.Nome);
    setGasto(linhaDeGasto.Valor);
    setData(linhaDeGasto.Data);
    setIdEmEdicao(linhaDeGasto.ID);
  }

  const handleExclusao = async (id) => {
    await deletarDespesa(id);

    if (id === idEmEdicao) {
      limparFormulario();
    }

    await handleVisualizarDespesas();
  }

  return (
    <div>
      {linhasDeGastos && linhasDeGastos.map((linhaDeGasto) => (
        <LinhaGasto
          key={linhaDeGasto.ID}
          nome={linhaDeGasto.Nome}
          valor={linhaDeGasto.Valor}
          data={linhaDeGasto.Data}
          fnEdicao={() => handleEdicao(linhaDeGasto)}
          fnExclusao={() => handleExclusao(linhaDeGasto.ID)}
        />
      ))}

      <div className="formulario-despesa">
        <input
          className="campo"
          type="text"
          placeholder="Digite uma nova despesa..."
          value={despesa}
          onChange={(e) => setDespesa(e.target.value)}
        ></input>
        <input
          className="campo"
          type="date"
          placeholder="Digite a data da despesa..."
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
        ></input>
        <input
          className="campo"
          type="number"
          placeholder="Digite o valor da despesa..."
          value={gasto}
          onChange={(e) => {
            setGasto(e.target.value);
          }}
        ></input>
        <button
          className="botao-cadastrar"
          onClick={() => {
            handleSubmit();
          }}
        >
          {idEmEdicao ? "Salvar alteração" : "Cadastrar despesa"}
        </button>
        {idEmEdicao && (
          <button className="botao-cancelar" onClick={limparFormulario}>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
