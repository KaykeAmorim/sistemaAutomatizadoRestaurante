const express = require('express');
const res = require('express/lib/response');
const bodyParser = require("body-parser")
const app = express();
const port = 3000;
const connection = require('./database/database');
const urlencoded = require('body-parser/lib/types/urlencoded');

const Usuarios = require('./database/Usuarios')
const Mesas = require('./database/Mesas');


connection
    .authenticate()
        .then(() => {
            console.log("Conexão estabelecida")
        })
        .catch((msgErro) => {
            console.log(msgErro)
        })

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('projeto'))
app.use("/imagens",express.static('imagens'))
app.use("/js",express.static('js'))

app.set("view engine", "ejs")

app.get("/login/:nomeMesa", function(req,res){
    let msgErro = req.query["msgErr"]
    console.log(msgErro)
    res.render("login",{mesa:req.params.nomeMesa, msg: msgErro})
})

app.post("/validar/:nomeMesa",function(req,res){
    let cpf = req.body.CPF
    let Senha = req.body.senha
    Usuarios.findAll({
        raw: true,
        where: {
            CPF: cpf
        }
    }).then((usuario)=>{
        if(usuario.length){
            if(Senha == usuario[0].senha){
                Mesas.update({usuario: usuario[0].usuario_id},{where: { nome: req.params.nomeMesa}}).then(()=>{
                    res.end()
                    //res.redirect(`/carrinho/${mesaID}`)
                })
            }
            else{
                res.redirect(`/login/${req.params.nomeMesa}?msgErr=${"PasswordsNotSame"}`)
            }
        }
        else{
            res.redirect(`/login/${req.params.nomeMesa}?msgErr=${"NotExists"}`)
        }
    })
    
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

// app.get("/get/cardapio",function(req,res){
//     conn.connect(function(err){
//         console.log("Conexão SQL iniciada!")

//         let itens = "SELECT itens.nome,itens.descricao,categoria.nome_categoria,itens.imagem,itens.preco FROM itens INNER JOIN categoria ON itens.categoria=categoria_id"
//         conn.query(itens, function(err,result,fields){
//             if(err) throw err;
//             res.send(result)
//             console.log(fields)
//         })
//         conn.end(function(err){
//             if(err) throw err;
//             console.log("Conexão SQL encerrada!");
//         })
//     })
// })

app.get("/produto/:nomeMesa",function(req,res){
    res.render("singleProduto",{link:`/carrinho/${req.params.nomeMesa}`})
})
app.listen(port, () => console.log("Servidor iniciado com sucesso !"))