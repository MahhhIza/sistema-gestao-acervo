
import { Livro } from "./domain/Livro";
import { JogoEletronico } from "./domain/JogoEletronico";

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
