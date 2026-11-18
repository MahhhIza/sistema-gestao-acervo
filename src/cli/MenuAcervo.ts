
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { Livro } from "../domain/Livro";
import { JogoEletronico } from "../domain/JogoEletronico";
import { AcervoService } from "../services/AcervoService";

export class MenuAcervo {
  private interfaceTerminal = createInterface({
    input: stdin,
    output: stdout
  });

  constructor(
    private readonly acervoService: AcervoService
  ) {}

  async iniciar(): Promise<void> {
    let opcao = "";

    console.log("\n⋆.˚Bem-vindo ao Sistema de Gestão de Acervo!˚.⋆");

    while (opcao !== "0") {
      console.log("\n★☆----------⭒⭑⭒----------☆★");
      console.log("   SISTEMA DE GESTÃO DE ACERVO");
      console.log("★☆----------⭒⭑⭒----------☆★");
      console.log("1 ｡˚ Cadastrar livro");
      console.log("2 ｡˚ Cadastrar jogo eletrônico");
      console.log("3 ｡˚ Listar itens");
      console.log("4 ｡˚ Buscar item");
      console.log("5 ｡˚ Emprestar item");
      console.log("6 ｡˚ Devolver item");
      console.log("7 ｡˚ Calcular multa");
      console.log("8 ｡˚ Remover item");
      console.log("0 ｡˚ Sair");

      opcao = (await this.perguntar("\n⋆.˚Escolha uma opção: ")).trim();

      try {
        switch (opcao) {
          case "1":
            await this.cadastrarLivro();
            break;

          case "2":
            await this.cadastrarJogo();
            break;

          case "3":
            this.listarItens();
            break;

          case "4":
            await this.buscarItem();
            break;

          case "5":
            await this.emprestarItem();
            break;

          case "6":
            await this.devolverItem();
            break;

          case "7":
            await this.calcularMulta();
            break;

          case "8":
            await this.removerItem();
            break;

          case "0":
            console.log("\n⋆.˚Encerrando o sistema. Até logo!˚.⋆");
            break;

          default:
            console.log("\n⋆.˚Opção inválida. Tente novamente.˚.⋆");
        }
      } catch (erro) {
        if (erro instanceof Error) {
          console.log("\n⋆.˚Erro:", erro.message);
        } else {
          console.log("\n⋆.˚Ocorreu um erro inesperado.˚.⋆");
        }
      }
    }

    this.interfaceTerminal.close();
  }

  private perguntar(mensagem: string): Promise<string> {
    return this.interfaceTerminal.question(mensagem);
  }

  private async perguntarNumero(mensagem: string): Promise<number> {
    const resposta = await this.perguntar(mensagem);
    const numero = Number(resposta);

    if (!Number.isInteger(numero)) {
      throw new Error("⋆.˚Digite um número inteiro válido.˚.⋆");
    }

    return numero;
  }

  private async cadastrarLivro(): Promise<void> {
    console.log("\n★☆--- CADASTRAR LIVRO ---☆★");

    const titulo = await this.perguntar("⋆.˚Título: ");
    const autor = await this.perguntar("⋆.˚Autor: ");
    const ano = await this.perguntarNumero("⋆.˚Ano de publicação: ");

    const livro = new Livro(titulo, ano, autor);

    this.acervoService.cadastrar(livro);

    console.log("\n⋆.˚Livro cadastrado com sucesso!˚.⋆");
    console.log("⋆.˚Identificador:", livro.identificador);
  }

  private async cadastrarJogo(): Promise<void> {
    console.log("\n★☆--- CADASTRAR JOGO ELETRÔNICO ---☆★");

    const titulo = await this.perguntar("⋆.˚Título: ");
    const plataforma = await this.perguntar("⋆.˚Plataforma: ");
    const ano = await this.perguntarNumero("⋆.˚Ano de publicação: ");

    const jogo = new JogoEletronico(titulo, ano, plataforma);

    this.acervoService.cadastrar(jogo);

    console.log("\n⋆.˚Jogo cadastrado com sucesso!˚.⋆");
    console.log("⋆.˚Identificador:", jogo.identificador);
  }

  private listarItens(): void {
    console.log("\n★☆--- ITENS DO ACERVO ---☆★");

    const itens = this.acervoService.listar();

    if (itens.length === 0) {
      console.log("\n⋆.˚O acervo está vazio.˚.⋆");
      return;
    }

    for (const item of itens) {
      console.log("★☆----------------------------☆★");
      console.log("ID:", item.identificador);
      console.log("Título:", item.nome);
      console.log("Ano:", item.ano);
      console.log("Status:", item.statusDisponibilidade);
      console.log(
        "Tipo:",
        item instanceof Livro ? "Livro" : "Jogo eletrônico"
      );
    }
  }

  private async buscarItem(): Promise<void> {
    console.log("\n★☆--- BUSCAR ITEM ---☆★");

    const id = await this.perguntarNumero("⋆.˚Digite o ID: ");
    const item = this.acervoService.buscar(id);

    console.log("⋆.˚Título:", item.nome);
    console.log("⋆.˚Ano:", item.ano);
    console.log("⋆.˚Status:", item.statusDisponibilidade);
  }

  private async emprestarItem(): Promise<void> {
    console.log("\n★☆--- EMPRESTAR ITEM ---☆★");

    const id = await this.perguntarNumero("⋆.˚Digite o ID do item: ");

    this.acervoService.emprestar(id);

    console.log("⋆.˚Empréstimo realizado com sucesso!˚.⋆");
  }

  private async devolverItem(): Promise<void> {
    console.log("\n★☆--- DEVOLVER ITEM ---☆★");

    const id = await this.perguntarNumero("⋆.˚Digite o ID do item: ");

    this.acervoService.devolver(id);

    console.log("⋆.˚Devolução realizada com sucesso!˚.⋆");
  }

  private async calcularMulta(): Promise<void> {
    console.log("\n★☆--- CALCULAR MULTA ---☆★");

    const id = await this.perguntarNumero("⋆.˚Digite o ID do item: ");
    const dias = await this.perguntarNumero("⋆.˚Dias de atraso: ");

    if (dias < 0) {
      throw new Error("⋆.˚A quantidade de dias não pode ser negativa.˚.⋆");
    }

    const multa = this.acervoService.calcularMulta(id, dias);

    console.log("⋆.˚Valor da multa: R$", multa.toFixed(2));
  }

  private async removerItem(): Promise<void> {
    console.log("\n★☆--- REMOVER ITEM ---☆★");

    const id = await this.perguntarNumero("⋆.˚Digite o ID do item: ");

    this.acervoService.remover(id);

    console.log("⋆.˚Item removido com sucesso!˚.⋆");
  }
}
