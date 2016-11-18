import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selected: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then((heroes) => { this.heroes = heroes });
  }

  onSelect(hero: Hero) {
    this.selected = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selected.id]);
  }

  add(hero: Hero): void {
    hero.name = hero.name.trim();
    if (!hero.name && !hero.id) { return; }
    this.heroService.create(hero)
      .then(hero => {
        console.log('hero created! ' + hero);
        this.heroes.push(hero);
        this.selected = null;
      })
      .catch((response) => {
        alert(response.statusText);
      });
  }

}