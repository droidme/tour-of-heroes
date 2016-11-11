import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  template: `
        <h2>My Heroes</h2>
        <ul class="heroes">
          <li *ngFor="let hero of heroes"
            [class.selected]="hero === selected" 
            (click)="onSelect(hero)">
            <span class="badge">{{hero.id}}</span> {{hero.name}}
          </li>
        </ul>
        <div *ngIf="selected">
          <h2>
            {{selected.name | uppercase}} is my hero
          </h2>
          <button (click)="gotoDetail()">View Details</button>
        </div>
    `,
  styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selected: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then((heroes) => { this.heroes = heroes });
  }

  onSelect(hero: Hero) {
    this.selected = hero;
  }

}