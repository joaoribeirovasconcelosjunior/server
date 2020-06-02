# Objetivos

Uma API para login de jogos multiplayer feito para engine godot, porém pode ser usado
por qualquer outra ferramenta que comunique em HTTP.

seguindo os padrão REST



### Workflow:

1. [x] - Comunicação com o banco de dados
2. [x] - Autenticação JWT
  2. [x] - criar tabelas;
  2. [x] - interligar com o database
3. [x] - Banco Usuario
4. [ ] - Criar Testes automatizados
  4. [ ] - TDD com JEST

### Melhorias:

1. [x] - Verificar se o email é valido tanto no login e registro.  
2. [x] - Fazer melhorar algumas funções  
3. [x] - remover bugs  
4. [x] - Subtituir a criptografia que usar o name com o secret pelo ID para ajudar depois do decript
5. [ ] - opção de login por nome ou usuario talvez...  



Como rodar a aplicação.

```git clone https://github.com/joaoribeirovasconcelosjunior/server.git```
```npm install```
```npm start```


