import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <h2>My Heroes</h2>
        <ul class="heroes">
          <li *ngFor="let hero of heroes"
            [class.selected]="hero === selected" 
            (click)="onSelect(hero)">
            <span class="badge">{{hero.id}}</span> {{hero.name}}
          </li>
        </ul>
        <my-hero-detail [hero]="selected"></my-hero-detail>
    `,
    styleUrls: ['app.component.css'],
    providers: [HeroService]
})
export class AppComponent implements OnInit {
  
    title = 'Tour of Heroes';
    heroes: Hero[];
    selected: Hero;

    constructor(private heroService: HeroService) {}

    ngOnInit(): void {
      this.getHeroes();
    }

    getHeroes(): void {
      this.heroService.getHeroes().then((heroes) => {this.heroes = heroes});
    }

    onSelect(hero: Hero) {
      this.selected = hero;
    }

}