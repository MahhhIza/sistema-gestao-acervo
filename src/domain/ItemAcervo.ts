
import { ItemJaEmprestadoError, ItemNaoEmprestadoError, CampoObrigatorioError, AnoPublicacaoInvalidoError, DiasAtrasoInvalidoError } from "../errors/ErrosAcervo";

export abstract class ItemAcervo {
    private static _contadorId: number = 0;

    private readonly id: number;
    private emprestado: boolean = false;

    constructor(
        private titulo: string,
        private anoPublicacao: number
    ) {
        if (!titulo.trim()) {
            throw new CampoObrigatorioError("título");
        }

        const anoAtual = new Date().getFullYear();

        if (
            !Number.isInteger(anoPublicacao) ||
            anoPublicacao <= 0 ||
            anoPublicacao > anoAtual
        ) {
            throw new AnoPublicacaoInvalidoError();
        }

        this.titulo = titulo.trim();

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

    protected validarEmprestimo(): void {
        // Regra padrão: nenhum impedimento adicional.
    }

    emprestar(): void {
        if (this.emprestado) {
            throw new ItemJaEmprestadoError();
        }

        this.validarEmprestimo();

        this.emprestado = true;
    }

    devolver(): void {
        if (!this.emprestado) {
            throw new ItemNaoEmprestadoError();
        }

        this.emprestado = false;
    }

    abstract calcularMulta(diasAtraso: number): number;

    protected validarDiasAtraso(diasAtraso: number): void {
        if (!Number.isInteger(diasAtraso) || diasAtraso < 0) {
            throw new DiasAtrasoInvalidoError();
        }
    }
}
