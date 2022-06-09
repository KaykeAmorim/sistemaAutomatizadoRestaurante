const imagem = document.querySelectorAll("#imagem")
const imagemBlob = document.querySelectorAll("#imagemBlob")

let reader = new FileReader()

reader.addEventListener('loadend', function(){
    imagem[0].src = (this.result);
})


//reader.readAsDataURL(imagemBlob[0])

 const url = "/get/imagens"
// let itensMenu = new Array();
 //let data = getData();

/*async function getData(){
    let response = await fetch(url)
    let data = await response.json()
    let myBlob = new Blob(data[0].imagem.data, {type:'image/png'})
    console.log(URL.createObjectURL(myBlob));
    reader.readAsDataURL(myBlob)

    return data
}*/

// function mostraResultados(dados){
//     for(var i = 0; i < dados.length; i++){
//         itensMenu.push(dados[i])
//         console.log(dados[i])
//         carregaCardapio(pegaCardapio(itensMenu[i].nome_categoria), itensMenu[i])
//     }
// }

// function carregaCardapio(cardapio, item){
//     var divProduto = configuraElemento(criaDiv(), "col-sm-6 mt-5", cardapio)
//     let caminhoProduto = document.querySelector("#link").innerHTML
//     var link = configuraElemento(criarLink(caminhoProduto),"text-left btn btn-light", divProduto)
//     var titulo = configuraElemento(criaTexto("h3",item.nome), "text-dark", link)
//     var divDetalhes = configuraElemento(criaDiv(), "row", link)
//     var divImagem = configuraElemento(criaDiv(), "col-sm-4", divDetalhes)
//     var imagem = configuraElemento(criaImg(item.imagem), "w-100", divImagem)
//     var divDescricao = configuraElemento(criaDiv(), "col-sm-8", divDetalhes)
//     var descricao = configuraElemento(criaTexto("p", item.descricao), "text-dark", divDescricao)
//     var preco = configuraElemento(criaTexto("h4", "R$ "+ (item.preco.toFixed(2)).toString().replace('.',',')), "text-success", divDescricao)
// }

// function pegaCardapio(id){
//     var element;
//     switch(id){
//         case "Hamburguer":
//             element = document.getElementById("cardapioHamburguer")
//         break;

//         case "Pizza":
//             element = document.getElementById("cardapioPizza")
//         break;

//         case "Comida Mineira":
//             element = document.getElementById("cardapioComidaMineira")
//         break;

//         case "Comida Mexicana":
//             element = document.getElementById("cardapioComidaMexicana")
//         break;

//         case "Petisco Caiçara":
//             element = document.getElementById("cardapioPetiscoCaicara")
//         break;

//         case "Drink":
//             element = document.getElementById("cardapioDrink")
//         break;

//         case "Suco":
//             element = document.getElementById("cardapioSuco")
//         break;

//         case "Refrigerante":
//             element = document.getElementById("cardapioRefrigerante")
//         break;

//         case "Caldo":
//             element = document.getElementById("cardapioCaldo")
//         break;

//         case "Sobremesas":
//             element = document.getElementById("cardapioSobremesas")
//         break;
//     }
//     return element;
// }

// function configuraElemento(element, config, destino){
//     element.setAttribute("class", config)
//     destino.appendChild(element);
//     return element;
// }

// function criaDiv(){
//     return document.createElement("div");
// }

// function criaTexto(tipo, texto){
//     var element = document.createElement(tipo);
//     element.innerHTML = texto;
//     return element;
// }

// function criaImg(caminho){
//     var element = document.createElement("img")
//     element.setAttribute("src", caminho);
//     return element;
// }

// function criarLink(caminho){
//     var element = document.createElement("a")
//     element.setAttribute("href", caminho)
//     element.setAttribute("type","button")
//     element.onclick = function(){
//         var titulo = element.children[0].innerHTML
//         var imagem = (element.children[1].children[0].children[0].getAttribute("src"))
//         var descricao = element.children[1].children[1].children[0].innerHTML
//         var preco = element.children[1].children[1].children[1].innerHTML
//         preco = preco.split("R$ ")
//         preco = preco[1];
//         preco = Number(preco.replace(',','.'))
//         var produtoSelecionado = {titulo: titulo, imagem:imagem, descricao: descricao, preco:preco}
//         localStorage.setItem("produtoSelecionado", JSON.stringify(produtoSelecionado))
//     }
//     return element
// }