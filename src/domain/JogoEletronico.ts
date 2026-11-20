
import { ItemAcervo } from "./ItemAcervo";
import { CampoObrigatorioError, DiasAtrasoInvalidoError } from "../errors/ErrosAcervo";

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
    this.validarDiasAtraso(diasAtraso);

    return diasAtraso * 5;
  }
}
