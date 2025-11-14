import React, {useState} from "react";

const API_URL = 'http://localhost:3001/user';

function DeletarUsuario() {

   const [formData, setFormData] = useState({
      id: '',
    });//Enviar os dados do formulário
    const [mensagem, setMensagem] = useState('');//Informar o status da operação

    const handleChange = (e) => {
      const { id, value } = e.target;//destruir o evento
      setFormData(prevData => ({//atualizar o estado
        ...prevData,//copiar os dados anteriores
        [id]: value,//atualizar o campo alterado
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();//evita que a página seja recarregada
      setMensagem('Enviando dados para o endpoint...');//atualiza a mensagem

      const userId = formData.id;//pega o id
    
      const urlBusca = `${API_URL}/${userId}`;//cria um novo url

      try {
        const response = await fetch(urlBusca, {//envia a requisição para o endpoint
          method: 'DELETE',//metodo que está sendo usado
          
          
        });

        if (response.ok) {//Verifica se a resposta foi bem-sucedida
          const result = await response.json();//Mensagem de resposta
          if (result.statuscode === 200) {//Verifica se deu certo
              setMensagem(`Usuário deletado ${userId} com sucesso`);//Mostra os dados do usuário
              setFormData({//Limpa o formulário
                id: '',
              });
          } else {
               setMensagem(` Erro interno: Código ${result.statuscode}`);//mostra o erro
          }  
        }else{//erro na resposta da requisição
          setMensagem(`Falha ao buscar. Status HTTP: ${response.status}`);
        }
      }catch (error) {//erros de requisição
        console.error('Erro de requisição:', error);
        setMensagem(`Erro de conexão: O servidor pode estar fora do ar ou na porta errada. (${error.message})`);
      
      }
    }

    return(//html do componente //form: chama a função de envio "handleSubmit"
      <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
        <h3>Deletar Usuário por ID </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>ID: <input type="text" id="id" value={formData.id} onChange={handleChange} required /></label>
          
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Deletar Usuário
          </button>
        </form>
        
        {mensagem && <p style={{ marginTop: '20px' }}>{mensagem}</p>}
      </div>
    )
}
export default DeletarUsuario;//exporta o componente