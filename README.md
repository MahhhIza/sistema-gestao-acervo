# Sistema de Gestão de Acervo

Projeto desenvolvido em **TypeScript** como atividade prática da disciplina, com o objetivo de aplicar conceitos de Programação Orientada a Objetos (POO), organização de código, tipagem e boas práticas de desenvolvimento.

O sistema simula o gerenciamento de um acervo em memória, permitindo cadastrar e administrar diferentes tipos de itens, como livros e jogos eletrônicos.

## Objetivo do projeto

Desenvolver uma aplicação utilizando TypeScript e os principais conceitos estudados durante as aulas, incluindo:

- Classes e objetos;
- Encapsulamento;
- Herança e abstração;
- Interfaces;
- Getters e métodos estáticos;
- Generics;
- Utility Types;
- Tratamento de exceções;
- Organização em camadas e separação de responsabilidades.

## Tecnologias utilizadas

- **TypeScript** — linguagem principal do projeto.
- **Node.js** — ambiente de execução.
- **tsx** — execução do TypeScript durante o desenvolvimento.
- **tsc** — compilação do TypeScript para JavaScript.
- **Node.js Readline** — interação com o usuário pelo terminal.

## Funcionalidades implementadas

O sistema possui um menu interativo pelo terminal, com as seguintes funcionalidades:

| Funcionalidade | Descrição |
|---|---|
| Cadastro de livros | Permite cadastrar livros com título, ano de publicação e autor. |
| Cadastro de jogos | Permite cadastrar jogos eletrônicos com título, ano de publicação e plataforma. |
| Listagem | Exibe os itens cadastrados no acervo. |
| Busca | Localiza um item pelo seu identificador. |
| Empréstimo | Permite realizar o empréstimo de itens disponíveis. |
| Devolução | Registra a devolução de itens emprestados. |
| Cálculo de multa | Calcula o valor da multa conforme o tipo de item e os dias de atraso. |
| Remoção | Permite remover itens do acervo. |
| Reserva | Permite reservar livros disponíveis. |
| Cancelamento de reserva | Permite cancelar uma reserva existente. |

### Regras de cálculo de multa

Cada tipo de item possui sua própria regra de cálculo:

- **Livro:** R$ 2,00 por dia de atraso.
- **Jogo eletrônico:** R$ 5,00 por dia de atraso.

Os cálculos são realizados por meio do método abstrato `calcularMulta()`, implementado de maneira específica em cada classe.

## Estrutura e conceitos de POO

### 1. Abstração e herança

Foi criada a classe abstrata `ItemAcervo`, que representa a estrutura comum dos itens cadastrados.

A partir dela, foram implementadas as classes:

- `Livro`
- `JogoEletronico`

Ambas herdam características da classe principal e implementam suas próprias regras de cálculo de multa.

### 2. Encapsulamento

Os atributos das classes são protegidos por modificadores de acesso, como `private` e `readonly`, evitando alterações externas indevidas.

As operações de empréstimo, devolução e atualização são realizadas por métodos próprios, que também verificam as regras de negócio.

### 3. Getters e métodos estáticos

Foram utilizados getters para consultar informações dos itens, incluindo seu status de disponibilidade.

Também foi implementado um contador estático privado para gerar identificadores incrementais para os itens cadastrados.

### 4. Interfaces

A interface `Reservavel` define os métodos necessários para realizar e cancelar reservas.

A classe `Livro` implementa essa interface, demonstrando como diferentes classes podem seguir contratos de comportamento.

### 5. Generics

Foi desenvolvido um repositório genérico em memória, permitindo armazenar e gerenciar diferentes tipos de itens sem precisar criar um repositório específico para cada classe.

### 6. Utility Types

Foram utilizados recursos do TypeScript para trabalhar com diferentes formatos de dados:

- `Partial`: permite atualizar apenas parte das informações de um item.
- `Pick`: seleciona propriedades específicas de uma estrutura.
- `Omit`: cria um tipo excluindo determinada propriedade.
- `Readonly`: define uma estrutura cujas propriedades não podem ser alteradas.

### 7. Tratamento de exceções

Foram criadas exceções personalizadas para tratar situações inválidas, como:

- Tentativa de emprestar um item já emprestado;
- Tentativa de devolver um item que não está emprestado;
- Tentativa de reservar um item indisponível;
- Cadastro com campos obrigatórios vazios;
- Ano de publicação inválido;
- Quantidade de dias de atraso inválida;
- Busca ou remoção de itens inexistentes.

## Funcionalidades complementares

Além dos requisitos apresentados na proposta oficial, algumas funcionalidades e demonstrações foram acrescentadas ao projeto por também aparecerem nos exemplos e conteúdos apresentados nos slides da disciplina.

Esses complementos foram implementados com o objetivo de ampliar a aplicação prática dos conceitos estudados e explorar melhor os recursos da linguagem.

Entre eles, destacam-se:

- **Sistema de reservas:** permite reservar livros e cancelar reservas, com validações para impedir operações incompatíveis com o estado do item.
- **Validações adicionais:** verificações de campos obrigatórios, ano de publicação e regras de disponibilidade.
- **Demonstração dos Utility Types:** utilização de `Partial`, `Pick`, `Omit` e `Readonly` em diferentes operações e formatos de dados.
- **Organização em camadas:** separação entre domínio, serviços, interfaces, repositórios, DTOs, exceções e interface de interação pelo terminal.
- **Injeção de dependência:** o serviço de acervo recebe o repositório por meio do construtor, reduzindo o acoplamento entre as classes.

Esses recursos complementares não substituem os requisitos da atividade. Foram acrescentados para enriquecer o desenvolvimento e demonstrar outros conteúdos trabalhados durante as aulas.

## Verificações realizadas

Durante o desenvolvimento, foram realizadas verificações de compilação e testes manuais pelo terminal para conferir o funcionamento das principais operações.

Foram verificadas situações como:

- Cadastro e listagem de livros e jogos;
- Busca de itens pelo identificador;
- Empréstimo e devolução;
- Bloqueio de empréstimos duplicados;
- Cálculo de multas;
- Criação e cancelamento de reservas;
- Bloqueio de operações incompatíveis com o estado do item;
- Tratamento de dados inválidos.

A compilação com `npm run build` foi executada com sucesso.

## Armazenamento dos dados

O projeto utiliza um repositório em memória (`RepositorioMemoria`), responsável por armazenar os itens durante a execução da aplicação.

Por esse motivo, os dados cadastrados não são persistidos em banco de dados e são perdidos quando o programa é encerrado.

## Considerações finais

O desenvolvimento deste projeto proporcionou a aplicação prática dos conceitos de TypeScript e Programação Orientada a Objetos, permitindo explorar desde a criação de classes e interfaces até a organização de uma aplicação em camadas.

Além de atender aos requisitos propostos na atividade, foram acrescentados recursos inspirados nos conteúdos e exemplos apresentados nos slides, buscando aprofundar o aprendizado e ampliar as possibilidades do sistema.

---

**Projeto acadêmico — Sistema de Gestão de Acervo**  
Desenvolvido como atividade prática da disciplina.