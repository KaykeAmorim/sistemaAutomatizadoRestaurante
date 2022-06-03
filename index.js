const express = require('express')
const mysql = require('mysql')
const app = express();
const port = 3000;

app.use(express.static('projeto'))
app.use("/imagens",express.static('imagens'))
app.use("/js",express.static('js'))

app.set("view engine", "ejs")

const conn = mysql.createConnection({
                    host:"localhost",
                    user:"kayke",
                    database:"legare",
                    password:"K310104+a"
                })

app.get("/login/:nomeMesa", function(req,res){
    res.render("login",{link:`/carrinho/${req.params.nomeMesa}`})
})

app.get("/adm", function(req,res){
    res.render("index")
})

app.get("/adm/salao", function(req,res){
    res.render("salao")
})

app.get("/carrinho/:nomeMesa", function(req,res){
    var CPF = req.query["CPF"];
    var senha = req.query["senha"];
    var nomeMesa = req.params.nomeMesa;
    res.render("carrinhoCompra",{
        CPF: CPF,
        mesa: nomeMesa,
        linkCardapio:`/cardapio/${nomeMesa}`,
        linkEnviar:`/pedido/${nomeMesa}`
    });
})

app.get("/cardapio/:nomeMesa", function(req,res){
    var CPF = req.query["CPF"];
    var nomeMesa = req.params.nomeMesa;
    res.render("cardapio",{
        caminho:`/produto/${nomeMesa}`
    });
})

app.get("/get/cardapio",function(req,res){
    conn.connect(function(err){
        console.log("Conexão SQL iniciada!")

        let itens = "SELECT itens.nome,itens.descricao,categoria.nome_categoria,itens.imagem,itens.preco FROM itens INNER JOIN categoria ON itens.categoria=categoria_id"
        conn.query(itens, function(err,result,fields){
            if(err) throw err;
            res.send(result)
            console.log(fields)
        })
        conn.end.bind()
        console.log("Conexão SQL encerrada!");
    })
})

app.get("/produto/:nomeMesa",function(req,res){
    res.render("singleProduto",{link:`/carrinho/${req.params.nomeMesa}`})
})
app.listen(port, () => console.log("Servidor iniciado com sucesso !"))