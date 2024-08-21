# ueek-connect-test

 * Esse sistema utiliza Laravel para a API, Next.js para o frontend e postgreSQL no banco de dados.  
 * Primeiramente clone o repositório para sua máquina local, `git@github.com:alanldf1/ueek-connect-test.git`.

 ## No diretório do backend
 * 1. Para iniciar abra uma CLI no diretório /backend
 * 2. Instale as dependências necessárias executando composer install.
 * 3. Para utilizar o banco de dados em postgreSQL dentro de uma container no docker, necessita ter instalado o docker e docker compose
 * 4. Execute o comando `docker-compose up -d` para subir o container do banco de dados e pgadmin para gerenciar o banco
 * 5. Configure a conexão com o banco de dados no arquivo .env, localizado no diretório do backend.
    * Caso ele não exista copie o .env.example com o nome de .env;
    * O .env.example estará pronto para rodar
 * 6. Execute as migrações para criar as tabelas necessárias no banco de dados, executando `php artisan migrate` no diretório da API.
 * 7. Execute o comando para inserir dados necessários e alguns de exemplo já no banco com o comando `php artisan db:seed`
 * 8. Para iniciar o servidor da API, execute `php artisan serve` no diretório

## No diretório do frontend
 * 1. Para iniciar abra outro CLI agora no diretório /client
 * 2. Execute o código "npm install" no
 * 3. Execute o comando "npm run dev" para iniciar o servidor de desenvolvimento do next.js.
 * 4. Acesse a aplicação no seu navegador em `http://localhost:3000`.

 Para funcionar devem estar em execução:
 * O servidor da API em `http://localhost:8000`
 * O servidor do frontend em `http://localhost:3000`
 * O container do banco de dados em `http://localhost:5432`
 

 ### Observações
 * É meu primeiro projeto em Next.js
 * É meu primeiro projeto do zero em Laravel (Toda minha experiência em Laravel é em um projeto pronto que utiliza o laravel na versão 9)
 * É meu primeiro projeto com banco de dados em postgreSQL
 Tenho anotado algumas alterações que poderiam escalar no sistema
 * Fila para compra de um número
 * Função de tempo no banco de dados para reprovar as compras de números que não forem pagas em 24h
 * Display de erros em um toast



~ By Alan Cavalheiro de Souza