import "./App.css";
import LinhaGasto from "./components/LinhaGasto";
import React from "react";
import { cadastrarDespesa, visualizarDespesas, deletarDespesa } from "./services/GastoService.js";

function App() {
  const [despesa, setDespesa] = React.useState("");
  const [gasto, setGasto] = React.useState("");
  const [data, setData] = React.useState("");
  const [linhasDeGastos, setLinhasDeGastos] = React.useState([]);

  const handleVisualizarDespesas = async () => {
    const despesas = await visualizarDespesas();
    setLinhasDeGastos(despesas);
    console.log(despesas);
  }

  React.useEffect(() => {
      handleVisualizarDespesas();
  }, []);

  

  const handleSubmit = async () => {
    await cadastrarDespesa(despesa, data, gasto);
  };

  const handleExclusao = async (id) => {
    await deletarDespesa(id);
  }

  

  return (
    <div>
      {linhasDeGastos && linhasDeGastos.map((linhaDeGasto) => (
        <LinhaGasto
          nome={linhaDeGasto.Nome}
          valor={linhaDeGasto.Valor}
          data={linhaDeGasto.Data}
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
          Cadastrar despesa
        </button>
      </div>
    </div>
  );
}

export default App;
