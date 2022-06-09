const express = require('express')
const bodyParser = require("body-parser")
const app = express();
const port = 3000;
const connection = require('./database/database')
const urlencoded = require('body-parser/lib/types/urlencoded')
const Sequelize = require('sequelize')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Blob = require('node-blob');

const Usuarios = require('./database/Usuarios')
const Mesas = require('./database/Mesas')
const Produtos = require('./database/Produtos')
const Categorias = require('./database/Categorias');
const { render } = require('express/lib/response');
const { JSON } = require('mysql/lib/protocol/constants/types');
const { send } = require('process');

connection
    .authenticate()
        .then(() => {
            console.log("Conexão estabelecida")
        })
        .catch((msgErro) => {
            console.log(msgErro)
        })

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
        
    filename: function(req, file, cb){
        cb(null, `${file.originalname}${Date.now()}${path.extname(file.originalname)}`)
    } 
})

const upload = multer({storage})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('projeto'))
app.use("/imagens",express.static('imagens'))
app.use("/js",express.static('js'))

app.set("view engine", "ejs")

app.get("/login/:nomeMesa", function(req,res){
    let msgErro = req.query["msgErr"]
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
                    Mesas.findAll({
                        raw:true,
                        attributes: ['mesa_id'],
                        where: {
                            nome:req.params.nomeMesa
                        }
                    }).then((mesaID)=>{
                        console.log(mesaID[0].meda_id)
                        res.redirect(`/carrinho/${mesaID[0].mesa_id}`)
                    })
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

app.get("/novoCadastro/:nomeMesa", function(req,res){
    let msgErr = req.query["msgErr"]
    res.render("cadastroUser",{mesa:req.params.nomeMesa, msg:msgErr})
})

app.post("/validarCadastro/:nomeMesa", function(req, res){
    let cpf = req.body.CPF
    let senha = req.body.senha;
    Usuarios.findAll({
        raw:true,
        where:{
            CPF:cpf
        }
    }).then((usuario)=>{
        console.log(usuario)
        if(!usuario.length){
            Usuarios.create({
                CPF:cpf,
                senha:senha
            }).then(()=>{
                res.redirect(`/login/${req.params.nomeMesa}`)
            })
        }else{
            res.redirect(`/novoCadastro/${req.params.nomeMesa}?msgErr=${"Exists"}`)
        }
    })
})

app.get("/carrinho/:ID", function(req,res){
    var ID = req.params.ID;
    res.render("carrinhoCompra",{
        mesa: ID,
        linkCardapio:`/cardapio/${ID}`,
        linkEnviar:`/pedido/${ID}`
    });
})

app.get("/cardapio/:ID", function(req,res){
    var ID = req.params.ID;
    
    (async() => {
        const result = await getCardapio();
        for(var i = 0; i < result.length; i++){
            result[i].imagem = result[i].imagem.toString('base64')
            result[i].preco = (result[i].preco.toFixed(2)).toString().replace('.',',')
        }
        res.render('cardapio',{produtos:result, ID:ID})
    })()
    
})

app.get("/produto/:ID/:produto",function(req,res){
    res.render("singleProduto",{link:`/carrinho/${req.params.ID}`})
})

app.get("/adm", function(req,res){
    res.render("index")
})

app.get("/adm/salao", function(req,res){
    res.render("salao")
})

app.get('/adm/cadastrarProduto', function(req,res){
    res.render('cadastro')
})

app.post('/enviarProduto',upload.single('imagem'),function(req, res){
    const nome = req.body.nome
    const descricao = req.body.descricao
    const preco = req.body.preco
    const categoria = req.body.categoria

    var dir = fs.readdirSync('uploads/')

    let ultimoArquivo = ultimoArquivoModificado(dir)
    
    let buffer = fs.readFileSync(`uploads/${ultimoArquivo}`)

    Produtos.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        categoria: categoria,
        imagem: buffer
    }).then(()=>{
        console.log("Arquivos enviados com sucesso!");
        res.redirect('/adm/cadastrarProduto')
    })
})

app.listen(port, () => console.log("Servidor iniciado com sucesso !"))

async function getCardapio(){
    const [result,metadata] = await connection.query("SELECT Produtos.nome,Produtos.produto_id,Produtos.descricao,Produtos.imagem,Produtos.preco,categoria.nome_categoria FROM Produtos INNER JOIN categoria ON Produtos.categoria=categoria.categoria_id ORDER BY Produtos.produto_id ASC" )
    return result
}

function ultimoArquivoModificado(dir){
    let dataDir = new Array();
    dir.forEach(element => {
        var stat = fs.statSync(`uploads/${element}`)
        dataDir.push( [element, stat.ctime] )
    })
    dataDir.sort((a,b) => b[1] - a[1])
    return dataDir[0][0]
}