document.getElementById('form-login').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const msgErro = document.getElementById('msg-erro');

    try {
    
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, senha: senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
          
            localStorage.setItem('token_arcade', dados.token);
            
            
            window.location.href = 'index.html';
        } else {
       
            msgErro.innerText = dados.message || 'Erro ao fazer login.';
        }
    } catch (erro) {
        msgErro.innerText = 'Erro de conexão. O servidor está rodando?';
        console.error(erro);
    }
});