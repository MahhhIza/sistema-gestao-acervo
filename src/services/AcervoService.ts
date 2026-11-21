
import { ItemAcervo } from "../domain/ItemAcervo";
import { Livro } from "../domain/Livro";
import { JogoEletronico } from "../domain/JogoEletronico";
import { IRepositorio } from "../repositories/IRepositorio";
import { Reservavel } from "../interfaces/Reservavel";
import {
  CriarLivroDTO,
  CriarJogoEletronicoDTO,
  AtualizarItemDTO,
  ResumoItemDTO,
  ItemSemAnoDTO,
  ItemSomenteLeituraDTO
} from "../dtos/CriarItemDTO";
import {
  ItemNaoEncontradoError,
  ItemNaoReservavelError
} from "../errors/ErrosAcervo";

// Verifica se o item implementa a interface Reservavel.
function ehReservavel(
  item: ItemAcervo
): item is ItemAcervo & Reservavel {
  return (
    "reservar" in item &&
    typeof item.reservar === "function" &&
    "cancelarReserva" in item &&
    typeof item.cancelarReserva === "function"
  );
}

export class AcervoService {
  constructor(
    private readonly repositorio: IRepositorio<ItemAcervo>
  ) { }

  cadastrarLivro(dados: CriarLivroDTO): Livro {
    const livro = new Livro(
      dados.titulo,
      dados.anoPublicacao,
      dados.autor
    );

    this.repositorio.adicionar(livro);

    return livro;
  }

  cadastrarJogo(dados: CriarJogoEletronicoDTO): JogoEletronico {
    const jogo = new JogoEletronico(
      dados.titulo,
      dados.anoPublicacao,
      dados.plataforma
    );

    this.repositorio.adicionar(jogo);

    return jogo;
  }

  listar(): readonly ItemAcervo[] {
    return this.repositorio.listar();
  }

  buscar(id: number): ItemAcervo {
    const item = this.repositorio.buscarPorId(id);

    if (!item) {
      throw new ItemNaoEncontradoError(id);
    }

    return item;
  }

  atualizar(id: number, dados: AtualizarItemDTO): void {
    const item = this.buscar(id);
    item.atualizar(dados);
  }

  obterResumo(id: number): ResumoItemDTO {
    const item = this.buscar(id);

    return {
      titulo: item.nome
    };
  }

  obterDadosSomenteLeitura(id: number): ItemSomenteLeituraDTO {
    const item = this.buscar(id);

    return Object.freeze({
      titulo: item.nome,
      anoPublicacao: item.ano
    });
  }

  remover(id: number): void {
    this.buscar(id);
    this.repositorio.remover(id);
  }

  emprestar(id: number): void {
    this.buscar(id).emprestar();
  }

  devolver(id: number): void {
    this.buscar(id).devolver();
  }

  calcularMulta(id: number, diasAtraso: number): number {
    return this.buscar(id).calcularMulta(diasAtraso);
  }

  reservar(id: number): void {
    const item = this.buscar(id);

    if (!ehReservavel(item)) {
      throw new ItemNaoReservavelError();
    }

    item.reservar();
  }

  cancelarReserva(id: number): void {
    const item = this.buscar(id);

    if (!ehReservavel(item)) {
      throw new ItemNaoReservavelError();
    }

    item.cancelarReserva();
  }

  obterDadosSemAno(id: number): ItemSemAnoDTO {
    const item = this.buscar(id);

    return {
      titulo: item.nome
    };
  }
}
