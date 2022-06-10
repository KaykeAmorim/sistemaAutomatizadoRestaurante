const express = require('express')
const bodyParser = require("body-parser")
const app = express();
const port = 3000;
const connection = require('./database/database')
const Sequelize = require('sequelize')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const Usuarios = require('./database/Usuarios')
const Mesas = require('./database/Mesas')
const Produtos = require('./database/Produtos')
const Categorias = require('./database/Categorias');
const Pedidos = require('./database/Pedidos');
const res = require('express/lib/response');

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
                Mesas.update({usuario: usuario[0].usuario_id},{where: { meesa_nome: req.params.nomeMesa}}).then(()=>{
                    Mesas.findAll({
                        raw:true,
                        attributes: ['mesa_id'],
                        where: {
                            nome:req.params.nomeMesa
                        }
                    }).then((mesaID)=>{
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
    const ID = req.params.ID;
    (async()=>{
        let result = await getCarrinho(ID)
        let total = 0;
        for(var i = 0; i < result.length; i++){
            result[i].imagem = result[i].imagem.toString('base64')
            total += result[i].preco * result[i].quantidade
            result[i].preco = (result[i].preco.toFixed(2)).toString().replace('.',',')
        }
        res.render('carrinhoCompra',{produtos:result, ID:ID, total:total})
    })()
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
    const produto = req.params.produto
    Produtos.findOne({raw:true,where: {produto_id:req.params.produto}}).then(result =>{
        result.imagem = result.imagem.toString('base64')
        res.render('singleProduto',{ID:req.params.ID,produto:result})
    })
})

app.get("/adm", function(req,res){
    res.render("index")
})

app.get("/adm/salao", function(req,res){
    Mesas.findAll({raw:true}).then(result=>{
        res.render('salao', {mesas:result})
    })
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

app.post('/addProdutoCarrinho/:ID/:produto',function(req, res){
    const quantidade = req.body.quantidade
    const ID = req.params.ID
    const produto = req.params.produto
    Pedidos.create({
        produto: produto,
        quantidade: quantidade,
        mesa: ID,
        confirmado: false,
        status: false
    }).then(()=>{
        res.redirect(`/carrinho/${ID}`)
    })
    
})

app.get('/deletePedido/:ID/:pedido', function(req,res){
    Pedidos.destroy({where: {pedido_id: req.params.pedido}}).then(()=>{
        res.redirect(`/carrinho/${req.params.ID}`)
    })
})

app.get('/confirmarPedidos/:ID', function(req,res){
    Pedidos.update({confirmado: true}, {where: {mesa: req.params.ID}}).then(()=>{
        res.redirect(`/carrinho/${req.params.ID}`)
    })
})

app.get('/adm/mesa/:ID', function(req,res){
    (async()=>{
        let result = await getCarrinho(req.params.ID)
        let total = 0;
        for(var i = 0; i < result.length; i++){
            result[i].imagem = result[i].imagem.toString('base64')
            total += result[i].preco * result[i].quantidade
            result[i].preco = (result[i].preco.toFixed(2)).toString().replace('.',',')
        }
        res.render('carrinhoAdm',{produtos:result, ID:req.params.ID, total:total})
    })()
})

app.get('/limparMesa/:ID', function(req, res){
    Pedidos.destroy({where: {mesa:req.params.ID}}).then(()=>{
        res.redirect('/adm/salao')
    })
})

app.post('/adm/addMesa', function(req,res){
    const nome = req.body.nomeMesa
    Mesas.create({
        mesa_nome: nome
    }).then(()=>{
        res.redirect('/adm/salao')
    })
})

app.get('/adm/cozinha', async(req,res) => {
    let result = await getPedidos();
    res.render('cozinha',{pedidos:result})
})

app.get('/pedidoPronto/:ID', function(req, res){
    Pedidos.update({status:true},{where:{pedido_id:req.params.ID}}).then(()=>{
        res.redirect('/adm/cozinha')
    })
})

app.listen(port, () => console.log("Servidor iniciado com sucesso !"))

async function getCardapio(){
    const [result,metadata] = await connection.query("SELECT Produtos.nome,Produtos.produto_id,Produtos.descricao,Produtos.imagem,Produtos.preco,categoria.nome_categoria FROM Produtos INNER JOIN categoria ON Produtos.categoria=categoria.categoria_id ORDER BY Produtos.categoria ASC" )
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

async function getCarrinho(ID){
    const [result, metadata] = await connection.query(`SELECT Produtos.imagem,Pedidos.confirmado,Produtos.preco, Pedidos.quantidade, Pedidos.pedido_id FROM Produtos INNER JOIN Pedidos ON Pedidos.produto = Produtos.produto_id AND Pedidos.mesa=${ID}`)
    return result
}

async function getPedidos(){
    const [result, metadata] = await connection.query(`SELECT Produtos.nome,Pedidos.pedido_id,Pedidos.quantidade, Mesas.mesa_nome FROM Produtos INNER JOIN Pedidos ON Pedidos.produto = Produtos.produto_id INNER JOIN Mesas ON Pedidos.mesa = Mesas.mesa_id WHERE Pedidos.confirmado=${true} AND Pedidos.status=${false} ORDER BY Pedidos.pedido_id ASC`)
    return result
}