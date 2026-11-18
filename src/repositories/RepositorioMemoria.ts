
import { ItemJaCadastradoError } from "../errors/ErrosAcervo";
import { IRepositorio } from "./IRepositorio";

export class RepositorioMemoria<T extends { identificador: number }>
    implements IRepositorio<T> {
    private itens: T[] = [];

    adicionar(item: T): void {
        const existente = this.buscarPorId(item.identificador);

        if (existente) {
            throw new ItemJaCadastradoError();
        }

        this.itens.push(item);
    }

    listar(): readonly T[] {
        return [...this.itens];
    }

    buscarPorId(id: number): T | undefined {
        return this.itens.find(
            (item) => item.identificador === id
        );
    }

    remover(id: number): boolean {
        const indice = this.itens.findIndex(
            (item) => item.identificador === id
        );

        if (indice === -1) {
            return false;
        }

        this.itens.splice(indice, 1);
        return true;
    }
}
