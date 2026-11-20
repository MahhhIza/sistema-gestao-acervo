
export class ItemJaEmprestadoError extends Error {
  constructor() {
    super("Este item já está emprestado.");
    this.name = "ItemJaEmprestadoError";
  }
}

export class ItemNaoEmprestadoError extends Error {
  constructor() {
    super("Este item não está emprestado.");
    this.name = "ItemNaoEmprestadoError";
  }
}

export class ItemJaReservadoError extends Error {
  constructor() {
    super("Este livro já está reservado.");
    this.name = "ItemJaReservadoError";
  }
}

export class ItemNaoReservadoError extends Error {
  constructor() {
    super("Este livro não possui uma reserva.");
    this.name = "ItemNaoReservadoError";
  }
}

export class ItemIndisponivelError extends Error {
  constructor() {
    super("Não é possível reservar um item emprestado.");
    this.name = "ItemIndisponivelError";
  }
}

export class ItemJaCadastradoError extends Error {
  constructor() {
    super("Já existe um item com esse identificador.");
    this.name = "ItemJaCadastradoError";
  }
}

export class ItemNaoEncontradoError extends Error {
  constructor(id: number) {
    super(`Não foi encontrado um item com o identificador ${id}.`);
    this.name = "ItemNaoEncontradoError";
  }
}

export class ItemNaoReservavelError extends Error {
  constructor() {
    super("Este tipo de item não permite reservas.");
    this.name = "ItemNaoReservavelError";
  }
}

export class ItemReservadoError extends Error {
  constructor() {
    super("Este livro possui uma reserva ativa e não pode ser emprestado.");
    this.name = "ItemReservadoError";
  }
}

export class CampoObrigatorioError extends Error {
  constructor(campo: string) {
    super(`O campo ${campo} é obrigatório.`);
    this.name = "CampoObrigatorioError";
  }
}

export class AnoPublicacaoInvalidoError extends Error {
  constructor() {
    super("O ano de publicação deve ser um número inteiro positivo e não pode ser futuro.");
    this.name = "AnoPublicacaoInvalidoError";
  }
}

export class DiasAtrasoInvalidoError extends Error {
  constructor() {
    super("Os dias de atraso devem ser um número inteiro igual ou maior que zero.");
    this.name = "DiasAtrasoInvalidoError";
  }
}