import { describe, test, expect } from "vitest";
import { Produto } from "./Produto";

describe("Classe Produto", () => {
  test("deve lançar erro ao validar produto com nome vazio", () => {
    const produto = new Produto("", 10);
    expect(() => produto.validar()).toThrow("O nome do produto não pode estar vazio.");
  });

  test("deve lançar erro ao validar produto com nome apenas de espaços", () => {
    const produto = new Produto("   ", 10);
    expect(() => produto.validar()).toThrow("O nome do produto não pode estar vazio.");
  });

  test("deve validar produto com nome correto sem erros", () => {
    const produto = new Produto("Arroz", 5.99);
    expect(() => produto.validar()).not.toThrow();
  });

  test("deve subtrair 1 da quantidade ao vender", () => {
    const produto = new Produto("Feijão", 7.50, 5);
    produto.vender();
    expect(produto.quantidade).toBe(4);
  });

  test("deve lançar erro ao tentar vender produto esgotado", () => {
    const produto = new Produto("Leite", 4.00, 0);
    expect(() => produto.vender()).toThrow("Produto esgotado!");
  });

  test("quantidade inicial padrão deve ser 10", () => {
    const produto = new Produto("Café", 12.00);
    expect(produto.quantidade).toBe(10);
  });
});
