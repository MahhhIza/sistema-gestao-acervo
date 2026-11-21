
export interface ItemDTO {
  titulo: string;
  anoPublicacao: number;
}

export type CriarItemDTO = ItemDTO;

export interface CriarLivroDTO extends CriarItemDTO {
  autor: string;
}

export interface CriarJogoEletronicoDTO extends CriarItemDTO {
  plataforma: string;
}

export type AtualizarItemDTO = Partial<ItemDTO>;

export type ResumoItemDTO = Pick<ItemDTO, "titulo">;

export type ItemSemAnoDTO = Omit<ItemDTO, "anoPublicacao">;

export type ItemSomenteLeituraDTO = Readonly<ItemDTO>;
