import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'powertex';
  token: string;
  loginUserData: any;
  obj: any = {};
  location: Location;

  notificationCount: any;

  constructor(private router: Router) { // initiate it in your component constructor
    

      setTimeout(() => {
        //alert('dsfsdf');
      }, 3000);
 /*  constructor(private router: Router, public globalservive: GlobalServiceService, private dialog: MatDialog, private eventEmmit: ComponentCommunicationService) { // initiate it in your component constructor
  }
 */
  }
  // @HostListener('contextmenu', ['$event'])
  // onRightClick(event) {
  //   event.preventDefault();
  // }

  // @HostListener('window:keydown', ['$event'])
  // handleKeyDown(event: KeyboardEvent) {
  //   if(event.key =="F12"){
  //     event.preventDefault();
  //   }
  // }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    //   this.ItemsCount();


    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }
}
