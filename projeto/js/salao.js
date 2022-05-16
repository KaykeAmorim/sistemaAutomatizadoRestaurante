localStorage.mesaSelecionada = "";
let listaDeMesas = new Array();
if(localStorage.mesas != null){
    listaDeMesas = JSON.parse(localStorage.mesas)
}
let painelDeMesas = document.getElementById("mesas")

mostrarMesas(listaDeMesas);

function addMesa(){
    var nomeMesa = document.getElementById("nomeMesa");
    if(verificaSeVazio(nomeMesa.value));
    else if(verificaSeMesaExiste(nomeMesa.value));
    else{
        var mesa = {nome: nomeMesa.value, produto:new Array()};
        listaDeMesas.push(mesa)
        localStorage.setItem("mesas", JSON.stringify(listaDeMesas))
        addMesaHTML(mesa);
    }
}

function verificaSeVazio(value){
    if(value == ""){
        alert("A mesa precisa de um nome !")
        return true;
    }
    return false
}

function verificaSeMesaExiste(value){
    for(var i = 0; i < listaDeMesas.length; i++){
        if(verificaSeIgual(listaDeMesas[i].nome, value)){
            alert("Já existe uma mesa com esse nome !")
            return true;
        }
    }
    return false;
}

function verificaSeIgual(a, b){
    if(a==b){
        return true;
    }
    return false;
}

function mostrarMesas(lista){
    for(var i = 0; i < lista.length; i++){
        addMesaHTML(lista[i])
    }
}

function addMesaHTML(mesaJSON){
    var mesa = criarTexto(mesaJSON.nome)
    criarCartao(mesa)
}

function criarCartao(mesaElement){
    var element = document.createElement("div");
    element.setAttribute("class", "row p-3 mt-2");
    var lixeira = criarLixeira();
    element.appendChild(mesaElement)
    element.appendChild(lixeira)
    painelDeMesas.appendChild(element)
    return element;
}

function criarTexto(value){
    var div = document.createElement("div")
    div.setAttribute("class", "card col-sm-9 btn btn-light")
    div.setAttribute("type", "button")
    div.onclick=function(){
        localStorage.mesaSelecionada=div.children[0].innerHTML;
        location.href="carrinhoCompra.html"
    }
    var element = document.createElement("h3");
    element.setAttribute("class", "mt-3 text-dark card-title")
    element.innerText = value;
    div.appendChild(element);
    return div;
}

function criarLixeira(){
    var div = document.createElement("div")
    div.setAttribute("class","col-sm-3 text-center")
    var lixeira = document.createElement("img")
    lixeira.setAttribute("class", "w-50 btn btn-danger");
    lixeira.setAttribute("src","../imagens/lixeira.png");
    lixeira.onclick = function removeMesa(){
        var divNomeMesa = lixeira.parentElement.parentElement.children[0]
        var nomeMesa = divNomeMesa.children[0].innerHTML
        removeMesaLista(nomeMesa);
        lixeira.parentElement.parentElement.remove();
    }
    div.appendChild(lixeira)
    return div;
}

function removeMesaLista(value){
    listaDeMesas = listaDeMesas.filter(lista => lista.nome != value)
    localStorage.setItem("mesas", JSON.stringify(listaDeMesas))
}
