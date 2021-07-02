import express, { response } from "express";

const app = express();

/**
 * GET => Buscar uma informação (listagem de produtos, usuários...)
 * POST => Inserir uma informação (criação de produtos, usuários...)
 * PUT => Alterar uma informação (alterar os dados do usuário ex: email, senha...)
 * DELETE => Remover um dado (remover um produto, usuário...)
 * PATCH => Alterar um dado específico (alterar somente a senha do usuário...)
 */

app.get("/test", (request, response) => {
    //Request => tudo que está entrando
    //Response => tudo que está saindo
    return response.send("Olá NLW");
});

app.post("/test-post", (request, response) => {
    return response.send("Olá NLW método POST")
})

//http://localhost:3000
app.listen(3000, () => console.log("Server is running"));