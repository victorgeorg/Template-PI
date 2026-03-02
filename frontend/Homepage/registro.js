document.getElementById('form-registro').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const msgStatus = document.getElementById('msg-status');

    try {
        const resposta = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            msgStatus.style.color = "green";
            msgStatus.innerText = "Conta criada com sucesso! Redirecionando...";
            // Espera 2 segundos e manda para o login
            setTimeout(() => window.location.href = 'login.html', 2000);
        } else {
            msgStatus.style.color = "red";
            msgStatus.innerText = dados.message || "Erro ao criar conta.";
        }
    } catch (erro) {
        msgStatus.style.color = "red";
        msgStatus.innerText = "Erro de conexão com o servidor.";
    }
});