# Dúvidas frequentes

Abaixo estão algumas orientações e dúvidas comuns ao desenvolvimento do projeto.

Se houver qualquer outra dúvida ou problema, é só procurar a monitoria ou postar uma thread no slack.

## Git e GitHub

<details>
  <summary>‼️ Antes de começar a desenvolver</summary><br />

  1. Clone o repositório `Usar link SSH`

  - Entre na pasta do repositório que você acabou de clonar:
    * `cd pasta-do-repositório`

  2. Instale as dependências [**Caso existam**]

  * `npm install`

  3. Crie uma branch a partir da branch `main`

  - Verifique se você está na branch `main`
    * Exemplo: `git branch`

  - Se não estiver, mude para a branch `main`
    * Exemplo: `git checkout main`

  - Agora crie uma branch à qual você vai submeter os `commits` do seu projeto

  - Você deve criar uma branch no seguinte formato:   `nome-de-usuario-nome-do-projeto`
    * Exemplo: `git checkout -b maria-sd-0x-trybe-futebol-clube`

  4. Adicione as mudanças ao _stage_ do Git e faça um `commit`

  - Verifique que as mudanças ainda não estão no _stage_
    * Exemplo: `git status` (deve aparecer listada a pasta _maria_ em vermelho)

  - Adicione o novo arquivo ao _stage_ do Git
    * Exemplo:
    * `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
    * `git status` (deve aparecer listado o arquivo _maria/README.md_ em verde)
  - Faça o `commit` inicial
    * Exemplo:
      * `git commit -m 'iniciando o projeto x'` (fazendo o primeiro commit)
      * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

  5. Adicione a sua branch com o novo `commit` ao repositório remoto

  - Usando o exemplo anterior: `git push -u origin joaozinho-sd-0x-trybe-futebol-clube`

  6. Crie um novo `Pull Request` _(PR)_

  - Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-0x-project-[nome-do-projeto]/pulls)
  - Clique no botão verde _"New pull request"_
  - Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  - Clique no botão verde _"Create pull request"_
  - Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  - Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-0x-project-[nome-do-projeto]/pulls) e confira que o seu _Pull Request_ está criado

</details>

<details>
  <summary>⌨️ Durante o desenvolvimento</summary><br />

- Faça `commits` das alterações que você fizer no código regularmente

- Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

- Os comandos que você utilizará com mais frequência são:
    1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
    2. `git add` _(para adicionar arquivos ao stage do Git)_
    3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
    4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
    5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

</details>

<details>
  <summary>🤝 Depois de terminar o desenvolvimento (opcional)</summary><br />

  Para **"entregar"** seu projeto, siga os passos a seguir:

- Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-xx` onde `xx` é o número da sua turma

Se ainda houver alguma dúvida sobre como entregar seu projeto [aqui tem um video explicativo](https://vimeo.com/362189205).

</details>

<details>
  <summary>🕵🏿 Revisando um pull request</summary><br />

  Use o conteúdo sobre [Code Review](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/f04cdb21-382e-4588-8950-3b1a29afd2dd/section/b3af2f05-08e5-4b4a-9667-6f5f729c351d/lesson/36268865-fc46-40c7-92bf-cbded9af9006) para te ajudar a revisar os _Pull Requests_.

</details>

## Node e NPM

<details>
  <summary>🕵️ Use a <strong>versão 16.14.0 LTS</strong> ou superior do Node</summary><br />

  - O `node` deve ter versão igual ou superior à `16.14.0 LTS`;

  - Para gerenciar as versões do node e utilizar a versão correta, utilize/instale o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);

  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

</details>

<details>
  <summary><strong>🕵️ Linter</strong></summary><br />

Para garantir a qualidade do código, usaremos o [ESLint](https://eslint.org/) para fazer a sua análise estática.

Este projeto já vem com as dependências relacionadas ao _linter_ configurada no arquivo `package.json` no seguinte caminho:

- `sd-0x-trybe-futebol-clube/app/backend/package.json`

Para rodar o `ESLint` em um projeto, basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

Você também pode instalar o plugin do `ESLint` no `VSCode`: bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

⚠️**Atenção:** Pull Requests com issues de linter não serão avaliadas. Atente-se para resolvê-las antes de finalizar o desenvolvimento.

</details>

<details id="testes-avaliador">
  <summary>🧪 Executando testes do avaliador com Puppeteer</summary><br />

Usaremos o [Puppeteer](https://pptr.dev/) para fazer os testes automatizados. Os testes estão localizados na pasta `__tests__/E2E/`.

⚠️ Para que os testes do projeto sejam executados na sua máquina, é necessário que todos os seus containers estejam no ar e saudáveis.

Os testes devem ser executados na raiz do projeto. Seguem algumas maneiras de executar os testes:

|Comando|Resultado|
|---|---|
|`npm test`|Executa todos os testes pelo terminal|
|`npm test 01_database.test.js`|Executa todos os testes do arquivo 01_database.test.js|
|`npm run test:browser`|Abre uma janela no Chrome, demonstrando a realização dos testes de maneira visual|
|`npm run test:debug`|Executa os testes pelo terminal e __printa__ algumas informações adicionais para ajudar a debugar o erros encontrados|

</details>

<details>
  <summary id="testes-integracao">🧪 Executando testes com Mocha</summary><br />

Você irá escrever testes de integração para o código que desenvolveu. Os testes deverão ser escritos na pasta `app/backend/src/tests/`, conforme o exemplo em `app/backend/src/tests/change.me.test.ts`.

Além do [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) e [Sinon](https://sinonjs.org/), usaremos o [Istambul](https://istanbul.js.org/) para analisar a cobertura de testes.

É possível rodá-los diretamente dentro da **pasta de backend** fora do container. Seguem algumas maneiras de rodar os testes com Mocha:

|Comando|Resultado|
|---|---|
|`npm run test`|Executa todos os testes pelo terminal|
|`npm run test:coverage`|Executa todos os testes e mostra a cobertura de testes|

</details>

<details id="comandos-uteis">
  <summary><strong>👀 Comandos úteis</strong></summary><br />

  ⚠️ Os comandos abaixo funcionam na raiz do projeto. É possível ver o resultado de cada comando, mas recomendamos que você verifique esses scripts no arquivo **package.json** da raiz do projeto para obter uma compreensão mais detalhada de cada um..

|Comando|Resultado|
|---|---|
|`npm run install:apps`|Instala as dependências de front-end e back-end localmente|
|`npm run compose:up`|Sobe todos os containers da sua aplicação|
|`npm run compose:down`|Derruba todos os containers da sua aplicação|
|`npm run logs [nome_do_servico]`|Acompanhar os logs de algum container na aplicação ([_nome_do_servico_] é opcional e pode receber os serviços _backend_, _frontend_ ou _db_)|

</details>

## Rodando o projeto pelo Docker

<details>
  <summary>⚠️ Não execute comandos do Git dentro do container</summary>

  - O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

</details>

<details>
  <summary>⚠️ Use a <strong>versão 2.5</strong> ou superior do Docker Compose</summary><br />

  - Para garantir o funcionamento adequado do seu projeto com Docker e do avaliador, é fundamental que o seu 'docker-compose' esteja na **versão 2.5** ou superior.".

  - Verifique sua versão:

  ```bash
  docker-compose --version
  ```

  - Se não for a versão 2.5 ou superior, faça os seguintes comandos para atualizar a versão:

  ```bash
  sudo rm /usr/local/bin/docker-compose
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  ```

</details>

## Depois de completar o projeto

<details>
  <summary><strong>🗣 Nos dê feedbacks sobre o projeto!</strong></summary><br />

Ao finalizar e submeter o projeto, não se esqueça de avaliar sua experiência preenchendo o formulário.
**Leva menos de 3 minutos!**

[FORMULÁRIO DE AVALIAÇÃO DE PROJETO](https://be-trybe.typeform.com/to/ZTeR4IbH)

</details>

<details>
  <summary>🗂 Compartilhe seu portfólio!</summary><br />

Após finalizar os requisitos, chegou a hora de mostrar ao mundo que você aprendeu algo novo! 🚀

Siga esse [**guia que preparamos com carinho**](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/a3cac6d2-5060-445d-81f4-ea33451d8ea4/section/d4f5e97a-ca66-4e28-945d-9dd5c4282085/day/eff12025-1627-42c6-953d-238e9222c8ff/lesson/49cb103b-9e08-4ad5-af17-d423a624285a) para disponibilizar o projeto finalizado no seu GitHub pessoal.

Esse passo é super importante para ganhar mais visibilidade no mercado de trabalho, mas também é útil para manter um back-up do seu trabalho.

E você sabia que o LinkedIn é a principal rede social profissional e compartilhar o seu aprendizado lá é muito importante para quem deseja construir uma carreira de sucesso? Compartilhe esse projeto no seu LinkedIn, marque o perfil da Trybe (@trybe) e mostre para a sua rede toda a sua evolução.

</details>
