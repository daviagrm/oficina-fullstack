import axios from "axios";

export const cadastrarDespesa = async (nome, data, valor) => {
 try {
    const response = await axios.post("http://localhost:8000/gastos", {
        "nome": nome,
        "data": data,
        "valor": valor
    });
    console.log("Despesa cadastrada com sucesso:", response.data);
    return response.data;
 } catch (error) {
    console.error("Erro ao cadastrar despesa:", error);
 }
}

export const visualizarDespesas = async () => {
    try {
        const response = await axios.get("http://localhost:8000/gastos");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Erro ao visualizar despesas:", error);
    }
}

export const deletarDespesa = async (id) => {
 try {
    const response = await axios.delete(`http://localhost:8000/gasto/${id}`);
    console.log("Despesa: excluída: ", response.data);
 } catch (error) {
    console.error("Erro ao excluir despesa: ", error);
 }
}

export const editarDespesa = async (id, nome, data, valor) => {
 try {
    const response = await axios.put(`http://localhost:8000/gasto/${id}`, {
        "nome": nome,
        "data": data,
        "valor": valor
    });
    console.log("Despesa editada com sucesso:", response.data);
    return response.data;
 } catch (error) {
    console.error("Erro ao editar despesa:", error);
 }
}