for(var i = 0; i < 6; i++){
    carregaCardapio(pegaCardapio('cardapioHamburguer'))
}

function carregaCardapio(cardapio){
    var textoLorem = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum fugit cupiditate architecto aspernatur, distinctio commodi neque necessitatibus sunt! Iste placeat expedita nemo iure sint debitis! Labore animi eveniet sequi voluptate."
    var divProduto = configuraElemento(criaDiv(), "col-sm-6 mt-5", cardapio)
    var titulo = configuraElemento(criaTexto("h3","The Best Burguer"), "text-dark", divProduto)
    var divDetalhes = configuraElemento(criaDiv(), "row", divProduto)
    var divImagem = configuraElemento(criaDiv(), "col-sm-4", divDetalhes)
    var imagem = configuraElemento(criaImg("../imagens/the-best-burguer.png"), "w-100", divImagem)
    var divDescricao = configuraElemento(criaDiv(), "col-sm-8", divDetalhes)
    var descricao = configuraElemento(criaTexto("p", textoLorem), "text-dark", divDescricao)
    var preco = configuraElemento(criaTexto("h4", "R$ 30,50"), "text-success", divDescricao)
}

function pegaCardapio(id){
    return document.getElementById(id);
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