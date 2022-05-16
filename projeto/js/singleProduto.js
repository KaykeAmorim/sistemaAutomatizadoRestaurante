var titulo = document.querySelector("#nomeProduto")
var imagem = document.querySelector("#imagemProduto")
var descricao = document.querySelector("#descricaoProduto")
var elementoImagem = document.createElement("img");
elementoImagem.setAttribute("class", "w-100")
var textoLorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur ex optio quidem a nesciunt veritatis nemo sint. Est, aperiam? Neque, minus dolor nostrum facilis sunt in amet reprehenderit assumenda numquam suscipit deserunt, odio debitis dolore doloremque maxime voluptate inventore libero modi cum perspiciatis asperiores. Incidunt voluptate harum odio fugiat nemo!"

let listaDeMesas = new Array();
listaDeMesas = JSON.parse(localStorage.mesas)
let mesaSelecionada = listaDeMesas.filter(lista => lista.nome == localStorage.mesaSelecionada)

let produto = '{"titulo":"Nome Produto", "imagem":"../imagens/the-best-burguer.png","descricao":"Lorem aqui", "preco":30.50}'
var produtoJSON = JSON.parse(produto)

produtoJSON.descricao = textoLorem;

elementoImagem.setAttribute("src",produtoJSON.imagem)
imagem.appendChild(elementoImagem)
titulo.innerHTML = produtoJSON.titulo
descricao.innerHTML = (produtoJSON.descricao).substring(0, 400) + "...";

let lista = new Array();

function btnClick(){
    var quantidade = document.querySelector("#quantidade").value;
    if(confereSeVazio(quantidade));
    else if(confereSeMenorQueUm(quantidade));
    else{ 
        addProduto(quantidade)
        location.href="carrinhoCompra.html"
    }
}

function confereSeVazio(value){
    if(value==""){
        alert("Preencha o campo quantidade !")
        return true;
    }
    return false;
}

function confereSeMenorQueUm(value){
    if(value<1){
        alert("A quantidade deve ser maior que zero !")
        return true;
    }
    return false;
}

function addProduto(value){
    var listaProdutos = getLista(mesaSelecionada[0].produto)
    listaProdutos.push({img:produtoJSON.imagem, qtd: value, preco: produtoJSON.preco});
    mesaSelecionada[0].produto = listaProdutos;
    var index = listaDeMesas.findIndex(lista => lista.nome == mesaSelecionada[0].nome)
    listaDeMesas[index].produto = mesaSelecionada[0].produto;
    console.log(listaDeMesas[0].produto)
    localStorage.setItem("mesas", JSON.stringify(listaDeMesas))
}

function getProdutoJSON(){
    var produtoJSON = {img:"", qtd:"", preco:""}
    return produtoJSON;
}

function getLista(listaParaPercorrer){
    var lista = new Array()
    for(var i = 0; i < listaParaPercorrer.length; i++){
        lista[i] = listaParaPercorrer[i]
    }
    return lista
}