
import { ItemAcervo } from "./ItemAcervo";
import { Reservavel } from "../interfaces/Reservavel";

export class Livro extends ItemAcervo implements Reservavel {
  private reservado: boolean = false;

  constructor(
    titulo: string,
    anoPublicacao: number,
    private autor: string
  ) {
    super(titulo, anoPublicacao);
  }

  get nomeAutor(): string {
    return this.autor;
  }

  get statusReserva(): string {
    return this.reservado ? "Reservado" : "Sem reserva";
  }

  reservar(): void {
    if (this.statusDisponibilidade === "Emprestado") {
      throw new Error("Não é possível reservar um livro emprestado.");
    }

    if (this.reservado) {
      throw new Error("Este livro já está reservado.");
    }

    this.reservado = true;
  }

  cancelarReserva(): void {
    if (!this.reservado) {
      throw new Error("Este livro não possui uma reserva.");
    }

    this.reservado = false;
  }

  override calcularMulta(diasAtraso: number): number {
    if (diasAtraso <= 0) {
      return 0;
    }

    return diasAtraso * 2;
  }
}
