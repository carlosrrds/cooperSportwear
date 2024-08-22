# cooperSportwear

Este projeto foi desenvolvido pelo desenvolvedor web mobile Carlos Roberto com o intuito de demonstrar suas habilidades, conhecimentos e capacidade de aprenzidado.

Instruções para execução do projeto:
Documentação da API:
Consulte a documentação da API no Postman. No Postman, há exemplos de cada requisição disponíveis para testes.

link do postman: https://documenter.getpostman.com/view/30335356/2sAXjDevNt

Instalação do Backend:
No terminal, acesse a pasta backend e execute o comando yarn install.

Em docs copie o arquivo backenv edite o nome para .env e coloque na pasta backend

Na pasta backend crie uma pasta chamada tmp, então execute o node ace migration:run

Iniciar o Backend:
Ainda no terminal, execute yarn run dev para iniciar o servidor.

População do Banco de Dados - Tamanhos:
No Postman, faça uma requisição para http://localhost:3333/sizes/bulk (createmany) utilizando o JSON encontrado no arquivo sizes.json, localizado na pasta dosc.

População do Banco de Dados - Produtos:
No Postman, faça uma requisição para http://localhost:3333/products/bulk  (createmany) utilizando o JSON encontrado no arquivo products.json, localizado na pasta dosc.

Instalação do Frontend:
No terminal, acesse a pasta frontend e execute o comando yarn install.

Em docs copie o arquivo frontenv edite o nome para .env e coloque na pasta frontend

Iniciar o Frontend:
Ainda no terminal, execute yarn run dev para iniciar a aplicação.

Aplicação rodará por padrão em http://localhost:3000

Testes:
Com todos os serviços em execução, você agora pode testar o projeto.
