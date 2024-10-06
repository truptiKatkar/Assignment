import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  stars = [1, 2, 3, 4, 5]
  cardContent = [
    {
      title: 'Graphic Design',
      image: 'Designer-rafiki.svg',
      content:
        'With lots of unique blocks, you can easily build a page without coding. Build your next landing page.',
    },
    {
      title: 'Web Development',
      image: 'Programming-rafiki.svg',
      content:
        'With lots of unique blocks, you can easily build a page without coding. Build your next landing page.',
    },
    {
      title: 'Content Writing',
      image: 'Notes-rafiki.svg',
      content:
        'With lots of unique blocks, you can easily build a page without coding. Build your next landing page.',
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
