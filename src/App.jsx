import "./App.css";
import LinhaGasto from "./components/LinhaGasto";
import React from "react";

function App() {

const [despesa, setDespesa] = React.useState("comida");
const [gasto, setGasto] = React.useState(56);
const [data, setData] = React.useState("01/10/2026");

  const linhasDeGastos = [
    { despesa: "comida", gasto: 56, data: "01/10/2026" },
    { despesa: "roupa", gasto: "R$20,00", data: "07/10/2026" },
    { despesa: "transporte", gasto: "R$30,00", data: "15/10/2026" },
    { despesa: "lazer", gasto: "100", data: "20/10/2026" },
  ];

  return (
    <div>
      {linhasDeGastos.map((linhaDeGasto) => (
        <LinhaGasto despesa={linhaDeGasto.despesa} gasto={linhaDeGasto.gasto} data={linhaDeGasto.data}/>
      ))}

     {despesa}

      <input type="text" placeholder="Digite uma nova despesa..." value={despesa} onChange={(e) => setDespesa(e.target.value)}></input>
      <input type="date" placeholder="Digite a data da despesa..."></input>
      <input type="number" placeholder="Digite o valor da despesa..."></input>
    </div>
  );
}

export default App;
