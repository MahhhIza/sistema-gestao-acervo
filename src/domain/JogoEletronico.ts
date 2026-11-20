
import { ItemAcervo } from "./ItemAcervo";
import { CampoObrigatorioError } from "../errors/ErrosAcervo";

export class JogoEletronico extends ItemAcervo {
  constructor(
    titulo: string,
    anoPublicacao: number,
    private plataforma: string
  ) {
    if (!plataforma.trim()) {
      throw new CampoObrigatorioError("plataforma");
    }

    super(titulo, anoPublicacao);

    this.plataforma = plataforma.trim();
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
