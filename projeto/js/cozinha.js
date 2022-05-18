localStorage.setItem("mesaSelecionada", "");

const spreadsheetID = '10s6NHQbCkuMfYollv_EYIRNjWekTf5E9Gk3yPGjZ6yE'
const url = 'https://opensheet.elk.sh/'+spreadsheetID+"/Respostas ao formulário 2"
let pedidosProntos = new Array;
let pedidosPendentes = new Array;
let painelPedidos = document.getElementById("pedidos")
let data = getData();

async function getData(){
    data = await fetch(url)
        .then((res) => res.json())
        .then((data) => verificaPedidos(data))
}

function verificaPedidos(dados){
    var pedidos = Array.from(dados)
    pedidosProntos=(pedidos.filter(lista => lista.STATUS == "ENTREGUE"))
    pedidosPendentes=(pedidos.filter(lista => lista.STATUS == "PENDENTE"))

    for(var i = 0; i < pedidosProntos.length; i++){
        var id = pedidosProntos[i].ID;
        pedidosPendentes = pedidosPendentes.filter(lista => lista.ID != id)
    }

    mostraPedidosPendentes();
}

function mostraPedidosPendentes(){
    for(var i = 0; i < pedidosPendentes.length ; i++){
        var divPedido = criarDiv("col-sm-3", painelPedidos)
        var link = criarLink(divPedido, pedidosPendentes[i].ID)
        var divCard = criarDiv("card card-body", link)
        var nomeMesa = criarTitulo(pedidosPendentes[i].NOME, divCard)
        var descricaoPedido = criarTexto(pedidosPendentes[i].PEDIDO, divCard)
    }
}

function criarDiv(classe, parent){
    var element = document.createElement("div")
    element.setAttribute("class",classe)
    parent.appendChild(element)
    return element;
}

function criarLink(parent, id){
    var element = document.createElement("a")
    element.setAttribute("id", id)
    element.setAttribute("type","button")
    element.setAttribute("class","btn btn-light")
    element.onclick = function(){
        var nome = element.children[0].children[0].innerHTML
        console.log(nome);
        var id = element.id;
        var descricao = element.children[0].children[1].innerHTML
        var produtoFinalizado = {nome: nome, descricao: descricao, id: id}
        localStorage.setItem("produtoFinalizado", JSON.stringify(produtoFinalizado))
        location.href="finalizar.html"
    }
    parent.appendChild(element)
    return element;
}

function criarTitulo(texto, parent){
    var element = document.createElement("h4")
    element.innerHTML = texto;
    element.setAttribute("class","card-title")
    parent.appendChild(element)
    return element;
}

function criarTexto(texto, parent){
    var element = document.createElement("p")
    element.innerHTML = texto;
    element.setAttribute("class","card-text text-dark")
    parent.appendChild(element)
    return element;
}