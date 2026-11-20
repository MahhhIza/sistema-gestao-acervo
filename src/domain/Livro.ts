
import { ItemAcervo } from "./ItemAcervo";
import { Reservavel } from "../interfaces/Reservavel";
import { ItemJaReservadoError, ItemNaoReservadoError, ItemIndisponivelError, ItemReservadoError } from "../errors/ErrosAcervo";

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

    protected override validarEmprestimo(): void {
        if (this.reservado) {
            throw new ItemReservadoError();
        }
    }

    reservar(): void {
        if (this.statusDisponibilidade === "Emprestado") {
            throw new ItemIndisponivelError();
        }

        if (this.reservado) {
            throw new ItemJaReservadoError();
        }

        this.reservado = true;
    }

    cancelarReserva(): void {
        if (!this.reservado) {
            throw new ItemNaoReservadoError();
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
