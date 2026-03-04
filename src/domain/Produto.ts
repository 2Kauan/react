/**
 * Classe de Domínio: Produto
 * 
 * Responsabilidade: Encapsular a lógica de negócio de um produto do mercado.
 * Esta classe NÃO conhece React, estados ou interface — apenas regras de negócio.
 * 
 * Princípio: Separação de Responsabilidades (Separation of Concerns)
 */
export class Produto {
  public id: string;
  public nome: string;
  public preco: number;
  public quantidade: number;

  constructor(nome: string, preco: number, quantidade: number = 10) {
    this.id = crypto.randomUUID();
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }

  /**
   * Valida os dados do produto.
   * Lança um erro se o nome estiver vazio ou contiver apenas espaços.
   */
  validar(): void {
    if (!this.nome || this.nome.trim() === "") {
      throw new Error("O nome do produto não pode estar vazio.");
    }
    if (this.preco < 0) {
      throw new Error("O preço não pode ser negativo.");
    }
  }

  /**
   * Realiza a venda de 1 unidade do produto.
   * Garante que a quantidade nunca fique negativa.
   */
  vender(): void {
    if (this.quantidade <= 0) {
      throw new Error("Produto esgotado! Não é possível vender.");
    }
    this.quantidade -= 1;
  }
}

/*
 * ============================================================
 * SIMULAÇÃO DE TESTE UNITÁRIO
 * ============================================================
 * 
 * Este bloco simula como seria um teste unitário para a classe Produto.
 * Em um projeto real, usaríamos frameworks como Vitest ou Jest.
 * 
 * // teste-produto.test.ts
 * 
 * import { Produto } from "./Produto";
 * 
 * describe("Classe Produto", () => {
 *   test("deve lançar erro ao validar produto com nome vazio", () => {
 *     const produto = new Produto("", 10);
 *     expect(() => produto.validar()).toThrow("O nome do produto não pode estar vazio.");
 *   });
 * 
 *   test("deve lançar erro ao validar produto com nome apenas de espaços", () => {
 *     const produto = new Produto("   ", 10);
 *     expect(() => produto.validar()).toThrow("O nome do produto não pode estar vazio.");
 *   });
 * 
 *   test("deve validar produto com nome correto sem erros", () => {
 *     const produto = new Produto("Arroz", 5.99);
 *     expect(() => produto.validar()).not.toThrow();
 *   });
 * 
 *   test("deve subtrair 1 da quantidade ao vender", () => {
 *     const produto = new Produto("Feijão", 7.50, 5);
 *     produto.vender();
 *     expect(produto.quantidade).toBe(4);
 *   });
 * 
 *   test("deve lançar erro ao tentar vender produto esgotado", () => {
 *     const produto = new Produto("Leite", 4.00, 0);
 *     expect(() => produto.vender()).toThrow("Produto esgotado!");
 *   });
 * });
 */
