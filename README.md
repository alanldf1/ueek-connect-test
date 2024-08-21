# ueek-connect-test
Project test send by ueek. Will be used 2 technologies, Laravel to backend on API and Next.js to frontend.


 * Esse código é um sistema que utiliza Laravel para a API e Next.js para o frontend. 
 * Ele foi projetado para proporcionar uma integração perfeita entre o backend e o frontend,  permitindo uma comunicação e troca de dados eficientes.
 
 * Para executar este sistema, você precisará ter o Laravel e o Next.js instalados em sua máquina.
 * Primeiramente clone o repositório para sua máquina local, `git@github.com:alanldf1/ueek-connect-test.git`.
 ## No diretório do backend
 * 1. Instale as dependências necessárias executando composer install.
 * 2. Configure a conexão com o banco de dados no arquivo .env, localizado no diretório do backend.
    * Caso ele não exista copie o .env.example com o nome de .env;
    * Substitua as informações de DB por essas:
    ``` 
        DB_CONNECTION=pgsql
        DB_HOST=127.0.0.1
        DB_PORT=5432
        DB_DATABASE=ueek-connect-test
        DB_USERNAME=postgres
        DB_PASSWORD=postgres
    ```
 * 3. Execute as migrações para criar as tabelas necessárias no banco de dados, executando ```php artisan migrate``` no diretório da API.
## No diretório do frontend
 * 1. Rodar o código "npm install" no CMD/Powershell/Bash.

 
 * 5. Inicie o servidor da API executando php artisan serve no diretório da API.
 * 6. Inicie o servidor do frontend executando npm run dev no diretório do frontend.
 * 7. Acesse a aplicação no seu navegador em `http://localhost:3000`.
 