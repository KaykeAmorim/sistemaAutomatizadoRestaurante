var formC = document.forms.cadastro;
var btnCadastrar = document.querySelector("#btnCadastro")
var nomeProduto = formC.nomeProduto;
var precoProduto = formC.precoProduto;
var descricaoProduto = formC.descricaoProduto;
var nome = new String();
var imagem = document.querySelector('#imagem')


btnCadastrar.onclick=function(){
    if(verificaSeVazio(nomeProduto.value, "Preencha o nome do produto!"));
    else if(verificaSeVazio(descricaoProduto.value, "Preencha a descrição do produto!"));
    else if(verificaSeVazio(precoProduto.value, "Preencha o preço do produto!"));
    else{
        formC.submit();
    }
}

function verificaSeVazio(value, msg){
    if(value==""){
        alert(msg)
        return true;
    }
    return false
}