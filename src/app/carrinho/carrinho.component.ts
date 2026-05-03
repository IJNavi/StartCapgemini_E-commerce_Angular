import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos/produtos';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IProdutoCarrinho[] = [];
  total = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
    this.calculaTotal();
  }

  calculaTotal() {
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0)
  }

  /* Essa versão é a mais simples, sem confirmação. Se quiser adicionar a confirmação, use a versão abaixo.

  removerProdutoCarrinho(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calculaTotal();
  }
*/

/* Versão com confirmação de remoção simples.
removerProdutoCarrinho(produtoId: number, produtoNome?: string){
  // Cria a mensagem de confirmação
  const nomeProduto = produtoNome ? produtoNome : 'este produto';
  const mensagem = `Tem certeza que deseja remover "${nomeProduto}" do carrinho?`;
  
  // Exibe o diálogo de confirmação
  if (confirm(mensagem)) {
    // Se o usuário confirmar, remove o produto
    this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
    this.carrinhoService.removerProdutoCarrinho(produtoId);
    this.calculaTotal();
    
    // Opcional: mensagem de feedback
    alert(`"${nomeProduto}" foi removido do carrinho.`);
  }
  // Se o usuário cancelar, não faz nada
}
*/


// Versão com confirmação usando SweetAlert2
removerProdutoCarrinho(produtoId: number, produtoNome?: string){
  const nomeProduto = produtoNome ? produtoNome : 'este produto';
  
  Swal.fire({
    title: 'Tem certeza?',
    text: `Deseja remover "${nomeProduto}" do carrinho?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, remover!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.itensCarrinho = this.itensCarrinho.filter(item => item.id !== produtoId);
      this.carrinhoService.removerProdutoCarrinho(produtoId);
      this.calculaTotal();
      
      Swal.fire(
        'Removido!',
        `${nomeProduto} foi removido do carrinho.`,
        'success'
      );
    }
  });
}

  comprar() {
    alert("Parabéns! Você finalizou a sua compra!");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"]);
  }

}
