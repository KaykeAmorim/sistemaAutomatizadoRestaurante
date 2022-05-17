const spreadsheetID = '10s6NHQbCkuMfYollv_EYIRNjWekTf5E9Gk3yPGjZ6yE'
const url = 'https://opensheet.elk.sh/'+spreadsheetID+"/Respostas ao formulário 1"
let itensMenu = new Array();
let data = getData();

async function getData(){
    data = await fetch(url)
        .then((res) => res.json())
        .then((data) => mostraResultados(data))
}

function mostraResultados(dados){
    for(var i = 0; i < dados.length; i++){
        itensMenu.push(dados[i])
        carregaCardapio(pegaCardapio(itensMenu[i].CATEGORIA), itensMenu[i])
    }
}

function carregaCardapio(cardapio, item){
    var divProduto = configuraElemento(criaDiv(), "col-sm-6 mt-5", cardapio)
    var link = configuraElemento(criarLink("singleProduto.html"),"text-left btn btn-light", divProduto)
    var titulo = configuraElemento(criaTexto("h3",item.NOME), "text-dark", link)
    var divDetalhes = configuraElemento(criaDiv(), "row", link)
    var divImagem = configuraElemento(criaDiv(), "col-sm-4", divDetalhes)
    var imagem = configuraElemento(criaImg("../imagens/"+item.IMG), "w-100", divImagem)
    var divDescricao = configuraElemento(criaDiv(), "col-sm-8", divDetalhes)
    var descricao = configuraElemento(criaTexto("p", item.DESCRICAO), "text-dark", divDescricao)
    var preco = configuraElemento(criaTexto("h4", "R$ "+ item.PRECO.replace('.',',')), "text-success", divDescricao)
}

function pegaCardapio(id){
    var element;
    switch(id){
        case "Hamburguer":
            element = document.getElementById("cardapioHamburguer")
        break;

        case "Pizza":
            element = document.getElementById("cardapioPizza")
        break;

        case "Comida Mineira":
            element = document.getElementById("cardapioComidaMineira")
        break;

        case "Comida Mexicana":
            element = document.getElementById("cardapioComidaMexicana")
        break;

        case "Petisco Caiçara":
            element = document.getElementById("cardapioPetiscoCaicara")
        break;

        case "Drink":
            element = document.getElementById("cardapioDrink")
        break;

        case "Suco":
            element = document.getElementById("cardapioSuco")
        break;

        case "Refrigerante":
            element = document.getElementById("cardapioRefrigerante")
        break;

        case "Caldo":
            element = document.getElementById("cardapioCaldo")
        break;

        case "Sobremesas":
            element = document.getElementById("cardapioSobremesas")
        break;
    }
    return element;
}

function configuraElemento(element, config, destino){
    element.setAttribute("class", config)
    destino.appendChild(element);
    return element;
}

function criaDiv(){
    return document.createElement("div");
}

function criaTexto(tipo, texto){
    var element = document.createElement(tipo);
    element.innerHTML = texto;
    return element;
}

function criaImg(caminho){
    var element = document.createElement("img")
    element.setAttribute("src", caminho);
    return element;
}

function criarLink(caminho){
    var element = document.createElement("a")
    element.setAttribute("href", caminho)
    return element
}