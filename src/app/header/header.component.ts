import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  menuAberto: boolean = false;

  constructor(
    public carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
    // Previne scroll da página quando menu está aberto
    if (this.menuAberto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  fecharMenu() {
    this.menuAberto = false;
    document.body.style.overflow = '';
  }
}