
import { ItemAcervo } from "./ItemAcervo";

export class Livro extends ItemAcervo {
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

  override calcularMulta(diasAtraso: number): number {
    if (diasAtraso <= 0) {
      return 0;
    }

    return diasAtraso * 2;
  }
}
