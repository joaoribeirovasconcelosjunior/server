npx sequelize db: create #cria o data base de acordo com o nome nas configurações
npx sequelize migration:create --name=create-user # cria uma migrations o nome é só para identificar pode ser qualquer outro

#as migrations são executadas de forma linear

npx sequelize db:migrate # atualiza as migrations criando as tabelas

#Uma das tabelas criadas é sequelizeMeta que é tipo um versionador de migrations


npx sequelize db:migrate:undo # desfaz a ultima modificação. só pode ser usado em desenvolvimento





