
import { ItemAcervo } from "./ItemAcervo";

export class JogoEletronico extends ItemAcervo {
  constructor(
    titulo: string,
    anoPublicacao: number,
    private plataforma: string
  ) {
    super(titulo, anoPublicacao);
  }

  get nomePlataforma(): string {
    return this.plataforma;
  }

  override calcularMulta(diasAtraso: number): number {
    if (diasAtraso <= 0) {
      return 0;
    }

    return diasAtraso * 5;
  }
}
