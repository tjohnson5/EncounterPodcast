import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {EventsPage} from '../events/events';
import {PodcastPage} from '../podcast/podcast';
import {EventRegPage} from '../register/register';
import {GivePage} from '../give/give';



@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = EventsPage;
  tab3Root: any = PodcastPage;
  tab4Root: any = EventRegPage;
  tab5Root: any = GivePage;

  // openURL(url){
  //     window.open(url,'_system');
  //     console.log(url);
  // }
}
