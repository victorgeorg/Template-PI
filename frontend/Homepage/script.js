
const token = localStorage.getItem('token_arcade');
if (!token) {
  
    window.location.href = 'login.html';
}

function fazerLogout() {
    localStorage.removeItem('token_arcade'); 
    window.location.href = 'login.html';    
}


function carregarTela(nome) {
  fetch("paginas/" + nome + ".html")
    .then(res => {
      if (!res.ok) throw new Error("Página não encontrada");
      return res.text();
    })
    .then(html => {
     
      document.getElementById("conteudo").innerHTML = html;
    })
    .catch(err => {
     
      document.getElementById("conteudo").innerHTML =
        "Erro ao abrir página 😢<br>" + err.message;
    });
}


function abrirJogo(nome) {
  fetch("jogos/" + nome + ".html")
    .then(res => {
      if (!res.ok) throw new Error("Jogo não encontrado");
      return res.text();
    })
    .then(html => {
      const area = document.getElementById("area-jogo");
      area.innerHTML = html;

    
      const scripts = area.querySelectorAll("script");
      scripts.forEach(oldScript => {
        const newScript = document.createElement("script");
        newScript.text = oldScript.innerText;
        document.body.appendChild(newScript).parentNode.removeChild(newScript);
      });
    })
    .catch(err => {
      document.getElementById("area-jogo").innerHTML =
        "Erro ao abrir jogo 😢<br>" + err.message;
    });
}


window.onload = () => carregarTela("inicio");