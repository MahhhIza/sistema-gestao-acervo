
import { ItemAcervo } from "../domain/ItemAcervo";
import { IRepositorio } from "../repositories/IRepositorio";
import { Reservavel } from "../interfaces/Reservavel";
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
  ) {}

  cadastrar(item: ItemAcervo): void {
    this.repositorio.adicionar(item);
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
}
