import React, {useState} from "react";

const API_URL = 'http://localhost:3001/users';

function TodosUsuarios() {
    const [mensagem, setMensagem] = useState('');//Informar o status da operação


    const handleSubmit = async () => {
      setMensagem('Enviando dados para o endpoint...');//atualiza a mensagem


      try {
        const response = await fetch(API_URL, {//envia a requisição para o endpoint
          method: 'GET',//metodo que está sendo usado
        });

        if (response.ok) {//Verifica se a resposta foi bem-sucedida
          const result = await response.json();//Mensagem de resposta
          if (result.statuscode === 200) {//Verifica se deu certo
              setMensagem(`Usuário encontrado: ${JSON.stringify(result.data)}`);//Mostra os dados do usuário
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
        <h3>Filtrar Usuário por ID </h3>
        
        <button 
        type="button" // Use type="button" ou remova
        onClick={handleSubmit} // Use onClick em vez de onSubmit
        style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Buscar Usuários
      </button>
        
        {mensagem && <p style={{ marginTop: '20px' }}>{mensagem}</p>}
      </div>
    )
}
export default TodosUsuarios;//exporta o componente