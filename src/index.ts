
import { ItemAcervo } from "./domain/ItemAcervo";
import { RepositorioMemoria } from "./repositories/RepositorioMemoria";
import { AcervoService } from "./services/AcervoService";
import { MenuAcervo } from "./cli/MenuAcervo";

async function iniciarSistema(): Promise<void> {
  const repositorio = new RepositorioMemoria<ItemAcervo>();

  const acervoService = new AcervoService(repositorio);

  const menu = new MenuAcervo(acervoService);

  await menu.iniciar();
}

iniciarSistema().catch((erro: unknown) => {
  console.error("Erro ao iniciar o sistema:", erro);
});
