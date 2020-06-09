const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

//configurar pasta public
server.use(express.static("public"))

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended:true}))

//utilizando o template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha app
//página inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) =>{
    return res.render("index.html", {title:"Teste Nunjucks"})
})

server.get("/create-point", (req, res) =>{
    // req.query: Query Strings da url gerada pelo GET

    return res.render("create-point.html")
})

// uso do POST, mais seguro para capturar os valores
server.post("/savepoint", (req, res) =>{
    //uso do req.body: retorna o corpo do formulário
    // console.log(req.body) //verifica no terminal, já que estamos no server.js, se ta salvando.
    
    //Inserir dados no banco de dados

    const query =`
            INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items 
             ) VALUES (?,?,?,?,?,?,?)`

            const values = [
                req.body.image,
                req.body.name,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.items
            ]

    function afterInsertData(err){
        if(err){
           console.log(err)
           return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this) // lembrando que o this não funciona com arrow function "=>"

        return res.render("create-point.html" , {saved:true})
    }
       
    db.run(query, values, afterInsertData) // executa os códigos acima
})

    
server.get("/search-results", (req, res) =>{

    const search = req.query.search

    if(search == "") {
        //pesquisa for vazia
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html" , {total: 0}) // ou posso usar apenas um total, por ser o mesmo nome
    }


    //pegar os dados do banco de dados
    // consultar os dados na tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){ // "*" pega todos os registros, mas posso pesquisa apenas um "name"
        if(err){
            return console.log(err)
        }
        const total = rows.length // contabiliza o total de itens da resposta da pesquisa
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html" , {places: rows, total: total}) // ou posso usar apenas um total, por ser o mesmo nome
    })
})

// Ligar o servidor
server.listen(3000)
