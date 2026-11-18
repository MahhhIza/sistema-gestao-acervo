
export interface IRepositorio<T extends { identificador: number }> {
  adicionar(item: T): void;
  listar(): readonly T[];
  buscarPorId(id: number): T | undefined;
  remover(id: number): boolean;
}
