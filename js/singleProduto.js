var titulo = document.querySelector("#nomeProduto")
var imagem = document.querySelector("#imagemProduto")
var descricao = document.querySelector("#descricaoProduto")
var elementoImagem = document.createElement("img");
elementoImagem.setAttribute("class", "w-100")

var produtoJSON = JSON.parse(localStorage.produtoSelecionado)

elementoImagem.setAttribute("src",produtoJSON.imagem)
imagem.appendChild(elementoImagem)
titulo.innerHTML = produtoJSON.titulo
descricao.innerHTML = (produtoJSON.descricao).substring(0, 400) + "...";

let listaProdutos = new Array();

if(localStorage.getItem('produtosNoCarrinho') != null){
    listaProdutos = JSON.parse(localStorage.produtosNoCarrinho);
}

function btnClick(){
    var quantidade = document.querySelector("#quantidade").value;
    if(confereSeVazio(quantidade));
    else if(confereSeMenorQueUm(quantidade));
    else{ 
        addProduto(quantidade)
        let link = document.getElementById("link")
        location.href=link.innerHTML
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
    listaProdutos.push({titulo:produtoJSON.titulo,img:produtoJSON.imagem, qtd: value, preco: produtoJSON.preco})
    localStorage.setItem("produtosNoCarrinho", JSON.stringify(listaProdutos))
}

function getProdutoJSON(){
    var produtoJSON = {titulo:"",img:"", qtd:"", preco:""}
    return produtoJSON;
}