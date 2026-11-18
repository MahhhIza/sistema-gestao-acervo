
import { Livro } from "./domain/Livro";
import { JogoEletronico } from "./domain/JogoEletronico";
import { RepositorioMemoria } from "./repositories/RepositorioMemoria";
import { AtualizarItemDTO, ResumoItemDTO, ItemSomenteLeituraDTO } from "./dtos/CriarItemDTO";
import { ItemJaEmprestadoError } from "./errors/ErrosAcervo";

const livro = new Livro(
  "Dom Casmurro",
  1899,
  "Machado de Assis"
);

const jogo = new JogoEletronico(
  "Minecraft",
  2011,
  "PC"
);

console.log("=== SISTEMA DE GESTÃO DE ACERVO ===");

console.log("\n--- LIVRO ---");
console.log("ID:", livro.identificador);
console.log("Título:", livro.nome);
console.log("Autor:", livro.nomeAutor);
console.log("Ano:", livro.ano);
console.log("Status:", livro.statusDisponibilidade);
console.log("Multa por 3 dias:", livro.calcularMulta(3));

console.log("\n--- JOGO ELETRÔNICO ---");
console.log("ID:", jogo.identificador);
console.log("Título:", jogo.nome);
console.log("Plataforma:", jogo.nomePlataforma);
console.log("Ano:", jogo.ano);
console.log("Status:", jogo.statusDisponibilidade);
console.log("Multa por 3 dias:", jogo.calcularMulta(3));

console.log("\n--- EMPRÉSTIMO ---");
livro.emprestar();
console.log("Status do livro:", livro.statusDisponibilidade);

livro.devolver();
console.log("Status após devolução:", livro.statusDisponibilidade);

console.log("\n--- RESERVA ---");

livro.reservar();
console.log("Status da reserva:", livro.statusReserva);

livro.cancelarReserva();
console.log("Status após cancelamento:", livro.statusReserva);


console.log("\n--- REPOSITÓRIO GENÉRICO ---");

const repositorio = new RepositorioMemoria<typeof livro | typeof jogo>();

repositorio.adicionar(livro);
repositorio.adicionar(jogo);

console.log("Quantidade de itens:", repositorio.listar().length);

const itemEncontrado = repositorio.buscarPorId(livro.identificador);
console.log("Item encontrado:", itemEncontrado?.nome);

console.log("Remoção realizada:", repositorio.remover(jogo.identificador));
console.log("Quantidade após remoção:", repositorio.listar().length);

console.log("\n--- UTILITY TYPES ---");

const atualizacao: AtualizarItemDTO = {
  titulo: "Dom Casmurro - Edição especial"
};

const resumo: ResumoItemDTO = {
  titulo: "Dom Casmurro"
};

const itemLeitura: ItemSomenteLeituraDTO = {
  titulo: "Dom Casmurro",
  anoPublicacao: 1899
};

console.log("Atualização:", atualizacao);
console.log("Resumo:", resumo);
console.log("Somente leitura:", itemLeitura);

console.log("\n--- TRATAMENTO DE EXCEÇÕES ---");

livro.emprestar();

try {
  livro.emprestar();
} catch (erro) {
  if (erro instanceof ItemJaEmprestadoError) {
    console.log("Erro identificado:", erro.message);
  } else {
    console.log("Erro inesperado:", erro);
  }
} finally {
  livro.devolver();
  console.log("Estado do livro restaurado.");
}