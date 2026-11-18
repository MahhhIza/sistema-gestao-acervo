
import { ItemJaEmprestadoError, ItemNaoEmprestadoError } from "../errors/ErrosAcervo";

export abstract class ItemAcervo {
    private static _contadorId: number = 0;

    private readonly id: number;
    private emprestado: boolean = false;

    constructor(
        private titulo: string,
        private anoPublicacao: number
    ) {
        ItemAcervo._contadorId++;
        this.id = ItemAcervo._contadorId;
    }

    get identificador(): number {
        return this.id;
    }

    get nome(): string {
        return this.titulo;
    }

    get ano(): number {
        return this.anoPublicacao;
    }

    get statusDisponibilidade(): string {
        return this.emprestado ? "Emprestado" : "Disponível";
    }

    emprestar(): void {
        if (this.emprestado) {
            throw new ItemJaEmprestadoError();
        }

        this.emprestado = true;
    }

    devolver(): void {
        if (!this.emprestado) {
            throw new ItemNaoEmprestadoError();
        }

        this.emprestado = false;
    }

    abstract calcularMulta(diasAtraso: number): number;
}
