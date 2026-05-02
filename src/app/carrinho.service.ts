import { Injectable } from '@angular/core';
import { IProdutoCarrinho } from './produtos/produtos';
import { produtos } from 'Arquivos_das_aulas/Aula 6E - Criando a página de produtos-20260205/produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itens: IProdutoCarrinho[] = [];

  constructor() { }

  obterCarrinho() {
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho) {
    this.itens.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
    return this.itens;
  }

  removerProdutoCarrinho(produtoId: number) {
    this.itens = this.itens.filter(item => item.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
    
  }

  limparCarrinho() {
    this.itens = [];
    localStorage.clear();
  }

}
