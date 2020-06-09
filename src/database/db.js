// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados, para nossas operações
// db.serialize(() => {
//     // com comandos SQL eu vou:
//     // 1- Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // 2-  Inserir dados na tabela 
//     const query =`
//             INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items 
//             ) VALUES (?,?,?,?,?,?,?)`

//             const values = [
//                 "https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//                 "PaperSider",
//                 "Sta Barbara",
//                 "n° 260",
//                 "Sta Catarina",
//                 "Rio do Sul",
//                 "Resíduos"
//             ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this) // lembrando que o this não funciona com arrow function "=>"
//     }
       
//     // db.run(query, values, afterInsertData) // executa os códigos acimaSS
//     // Deletar um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?` , [3], function(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Deletado com sucesso!")
//     }) 

//     // // consultar os dados na tabela
//     db.all(`SELECT * FROM places`, function(err, rows){ // "*" pega todos os registros, mas posso pesquisa apenas um "name"
//         if(err){
//             return console.log(err)
//         }
//         console.log("Consultado com sucesso")
//         console.log(rows) 
//     })


// })