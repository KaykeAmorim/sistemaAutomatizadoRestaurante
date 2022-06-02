var formE = document.forms.formEnvio;
let listaDeMesas = JSON.parse(localStorage.mesas)
let mesaSelecionada = localStorage.mesaSelecionada
let mesa = listaDeMesas.filter(lista => lista.nome == mesaSelecionada)
let produtosAdquiridos = mesa[0].produto

var idProduto = document.getElementById("idProduto");
idProduto.value = Math.floor((Math.random()*1000000000));
var textArea = document.getElementById("produtos");
var input = document.getElementById("mesa");
var progress = document.getElementById("progress")
var statusPedido = document.getElementById("status");
statusPedido.value = "PENDENTE";
input.value = mesaSelecionada;

for(var i = 0; i < produtosAdquiridos.length; i++){
    textArea.innerHTML += produtosAdquiridos[i].qtd + "x " + produtosAdquiridos[i].titulo + '\n'
}

var btnEnviar = document.getElementById("btnEnviar").onclick=function(){
    if(verificaSeVazio(input.value, "Preencha o nome da mesa!"));
    else if(verificaSeVazio(textArea.innerHTML, "Preencha o pedido"));
    else{
        progress.setAttribute("style", "width:100%")
        formE.submit();
    }
}

function verificaSeVazio(value, msg){
    if(value==''){
        alert(msg)
        return true
    }
    return false
}