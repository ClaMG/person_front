import React, { useState } from 'react';

const API_URL = 'http://localhost:3001/user'; 

function CadastroUsuario() {
  const [formData, setFormData] = useState({//Dados do formulário
    usuario: '', senha: '', nome: '', idade: '', 
    cpf: '', telefone: '', email: '',
  });
  const [mensagem, setMensagem] = useState('');//Mensagem de status

  const handleChange = (e) => {
    const { name, value } = e.target;//destruir o evento
    setFormData(prevData => ({//atualizar o estado
      ...prevData,//copiar os dados anteriores
      [name]: value,//atualizar o campo alterado
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();//evita que a página seja recarregada
    setMensagem('Enviando dados para o endpoint...');//atualiza a mensagem

    try {
      const response = await fetch(API_URL, {//envia a requisição para o endpoint
        method: 'POST',//metodo que está sendo usado
        headers: {
          'Content-Type': 'application/json',
        },//indica o tipo de dado que está sendo enviado
        body: JSON.stringify(formData),//converte os dados do formulário para JSON
      });

    
      if (response.ok) {//Verifica se a resposta foi bem-sucedida
        const result = await response.json(); 
        if (result.statuscode === 200) {
            setMensagem('Usuário cadastrado com sucesso!');//Mostra a mensagem de sucesso
            setFormData({//Limpa o formulário
                usuario: '', senha: '', nome: '', idade: '', 
                cpf: '', telefone: '', email: '',
            });
        } else {
             setMensagem(`Erro interno: Código ${result.statuscode}`);//mostra o erro
        }
      } else {//erro na resposta da requisição
        setMensagem(`Falha ao cadastrar. Status HTTP: ${response.status}`);
      }
    } catch (error) {//erros de requisição
      console.error('Erro de requisição:', error);
      setMensagem(`Erro de conexão: O servidor pode estar fora do ar ou na porta errada. (${error.message})`);
    }
  };

  return (//html do componente //form: chama a função de envio "handleSubmit"
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h3>Novo Cadastro de Usuário </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Usuário: <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} required /></label>
        <label>Senha: <input type="password" name="senha" value={formData.senha} onChange={handleChange} required /></label>
        <label>Nome: <input type="text" name="nome" value={formData.nome} onChange={handleChange} required /></label>
        <label>Idade: <input type="number" name="idade" value={formData.idade} onChange={handleChange} required /></label>
        <label>CPF: <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required /></label>
        <label>Telefone: <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required /></label>
        <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
        
        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p style={{ marginTop: '10px' }}>{mensagem}</p>}
    </div>
  );
}

export default CadastroUsuario;