export default function LinhaGasto({ despesa, gasto, data }) {
  return (
    <div className="linha-gasto">
      <span>Despesa: {despesa}</span>
      <span>Gasto: {gasto}</span>
      <span>Data: {data}</span>
    </div>
  );
}
