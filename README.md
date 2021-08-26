# Esta é uma solução de um restaurante
Tela inicial com login e cadastro.
Todas as pagina são acessadas somente por usuarios autenticados.
É utilizado criptografia ao registrar a senha.
No banco de dados é salvo apenas o hash da senha.
Apos login a tela principal onde é possivel visualizar a pagina de pedidos e pagina de produtos.
Ao clicar na imagem do usuario é possível editá-lo.
O background da pagina muda de acordo com a categoria do restaurante.
Na pagina de produtos é possivel cadastrar novos produtos ou editá-los.
O cadrastro de imagem do usuario e produto é feito é um banco de dados na nuvem.
É possivel ativar/desativar um produto, mudando assim a visibilidade do mesmo para o cliente.
É possivel excluir um produto mas somente apos desativá-lo.
Na tela de lista de pedidos é possivel visualizar os pedidos ordenados do mais antigo para o mais novo.
Em cada linha de pedido um resumo é exibido.
Ao clicar no pedido é possivel visualizar seus detalhes e marcar o pedido como enviado.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.



### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
