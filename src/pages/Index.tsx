import { useState } from "react";
import { Produto } from "../domain/Produto";
import { toast } from "sonner";
import { Package, Plus, ShoppingCart, TrendingDown } from "lucide-react";

const Index = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const handleAdicionar = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const produto = new Produto(nome, parseFloat(preco) || 0);
      produto.validar();
      setProdutos((prev) => [...prev, produto]);
      setNome("");
      setPreco("");
      toast.success(`"${produto.nome}" adicionado ao estoque!`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleVender = (id: string) => {
    setProdutos((prev) => {
      return prev
        .map((p) => {
          if (p.id === id) {
            const clone = new Produto(p.nome, p.preco, p.quantidade);
            clone.id = p.id;
            clone.vender();
            return clone;
          }
          return p;
        })
        .filter((p) => p.quantidade > 0);
    });
    toast.success("Venda realizada!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-3 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-card-foreground">
              Gestão de Estoque
            </h1>
            <p className="text-sm text-muted-foreground">
              Sistema de controle de mercado
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-secondary-foreground">
              {produtos.length} produto{produtos.length !== 1 && "s"}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Formulário */}
        <section className="mb-10 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
            <Plus className="h-5 w-5 text-primary" />
            Cadastrar Produto
          </h2>
          <form onSubmit={handleAdicionar} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                Nome do Produto
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Arroz, Feijão..."
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div className="w-full sm:w-40">
              <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="0,00"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Adicionar
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            Quantidade inicial padrão: 10 unidades
          </p>
        </section>

        {/* Grid de Produtos */}
        {produtos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-medium text-muted-foreground">
              Nenhum produto no estoque
            </p>
            <p className="text-sm text-muted-foreground/70">
              Cadastre seu primeiro produto acima.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <h3 className="text-base font-semibold text-card-foreground">
                    {produto.nome}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      produto.quantidade <= 3
                        ? "bg-destructive/10 text-destructive"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {produto.quantidade} un.
                  </span>
                </div>
                <p className="mb-4 text-2xl font-bold text-primary">
                  R$ {produto.preco.toFixed(2)}
                </p>
                <button
                  onClick={() => handleVender(produto.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                >
                  <TrendingDown className="h-4 w-4" />
                  Vender 1 unidade
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
