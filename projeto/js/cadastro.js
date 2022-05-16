var formC = document.forms.cadastro;
var btnCadastrar = document.querySelector("#btnCadastro")
var nomeProduto = formC.nomeProduto;
var precoProduto = formC.precoProduto;
var descricaoProduto = formC.descricaoProduto;
var nome = new String();

btnCadastrar.onclick=function(){
    if(verificaSeVazio(nomeProduto.value, "Preencha o nome do produto!"));
    else if(verificaSeVazio(descricaoProduto.value, "Preencha a descrição do produto!"));
    else if(verificaSeVazio(precoProduto.value, "Preencha o preço do produto!"));
    else{
        nome = nomeProduto.value;
        nome = nome.split(' ')
        console.log(nome)
        var nomeImagem;
        nomeImagem = nome[0];
        if(nome.length > 1){
            for(var i = 1; i < nome.length; i++){
                nomeImagem += nome[i];
            }
        }
        document.querySelector("#mensagemNomeImagem").value = nomeImagem + ".png"
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