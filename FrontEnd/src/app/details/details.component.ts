import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ShareDataService } from '../share-data.service';
import { ScrollToTopService } from '../scroll-to-top.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  Title : string = "";

  items : any[] = [];

  constructor(private route: ActivatedRoute,private aboj : AppComponent,private sobj : ShareDataService,
    private scroll : ScrollToTopService,private loading : LoadingService) 
  { 
  }

  ngOnInit(): void {
    this.loading.setLoadingState(true);
    this.scroll.scrollToTopOnRouterNavigation();
    
    this.sobj.ItemsData().subscribe((response)=>{
      this.items = response;

      this.loading.setLoadingState(false);
    })
    
    this.route.params.subscribe(params => {
      this.Title = params['title']
    })
  }

  Add(productId : any)
  {
    this.sobj.addToCart(productId).subscribe((response) => {
      //this.aboj.cartCount = response.length;
      console.log(true);
      //console.log("Data Saved Successfully",response);
    });
  }
}
