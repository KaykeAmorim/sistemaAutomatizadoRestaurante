var formE = document.forms.formEnvio;

var descricao = document.getElementById("descricao");
var pedido = document.getElementById("pedido");
pedido.innerHTML = localStorage.getItem('produtosNoCarrinho')

var progress = document.getElementById("progress")


var btnEnviar = document.getElementById("btnEnviar").onclick=function(){
    progress.setAttribute("style", "width:100%")
    formE.submit();
}