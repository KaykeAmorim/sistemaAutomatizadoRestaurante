var formE = document.forms.formEnvio;
let produtoJSON = JSON.parse(localStorage.getItem("produtoFinalizado"))

var idProduto = document.getElementById("idProduto");
idProduto.value = produtoJSON.id
var textArea = document.getElementById("produtos");
var input = document.getElementById("mesa");
var progress = document.getElementById("progress")
var statusPedido = document.getElementById("status");
statusPedido.value = "ENTREGUE";
input.value = produtoJSON.nome;


textArea.innerHTML = produtoJSON.descricao;


var btnEnviar = document.getElementById("btnEnviar").onclick=function(){
    if(verificaSeVazio(input.value, "Preencha o nome da mesa!"));
    else if(verificaSeVazio(textArea.innerHTML, "Preencha o pedido"));
    else{
        progress.setAttribute("style", "width:100%")
        formE.submit();
        location.href="cozinha.html"
    }
}

function verificaSeVazio(value, msg){
    if(value==''){
        alert(msg)
        return true
    }
    return false
}