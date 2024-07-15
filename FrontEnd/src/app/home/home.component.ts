import { Component, OnInit } from '@angular/core';
import { ScrollToTopService } from '../scroll-to-top.service';
import { ShareDataService } from '../share-data.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [
    { image: 'assets/slide1.jpg', title: '"Nourish Your Body, Mind, And Soul With Ayurvedic Goodness."'},
    { image: 'assets/slide2.jpg', title: '"Discover Ancient Wisdom For Modern Wellness."'},
  ];

  items : any[] = [];
  constructor(private loadingService: LoadingService,private scroll : ScrollToTopService,private data : ShareDataService) { }

  ngOnInit(): void {
    this.loadingService.setLoadingState(true);
    this.scroll.scrollToTopOnRouterNavigation();
    
    this.data.ItemsData().subscribe((response)=> {
      this.items = response;

      this.loadingService.setLoadingState(false);
    })
  }

}
