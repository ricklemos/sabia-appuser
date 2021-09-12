import { Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ClNavDrawerService } from 'collact-components';
import { UrlService } from '../../services/url.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() barTitle: string;
  @Input() hasLinkBack: boolean;
  @Input() disableNavigation: boolean;
  @Input() disableNavDrawer = false;

  subscriptions = [];
  isOpen = false;
  menuList: any = [];
  showTitleForce: boolean;





  constructor(
    private title: Title,
    private navDrawerService: ClNavDrawerService,
    private urlService: UrlService,
  ) {
    this.isOpen = false;
    const subNavDrawer = this.navDrawerService
      .getMessage()
      .subscribe(result => {
        if (result) {
          this.isOpen = result.open;
        }
      });
    this.subscriptions.push(subNavDrawer);
    this.menuList.push({
      icon: 'cl-home',
      label: 'Início',
      url: this.urlService.getHome(),
      external: false,
    });
    this.menuList.push({
      icon: 'cl-univerity',
      label: 'Meus cursos',
      url: this.urlService.getCourses(),
      external: false,
    });
    this.menuList.push({
      icon: 'cl-crown',
      label: 'Rankings',
      url: this.urlService.getRankings(),
      external: false,
    });
    this.menuList.push({
      icon: 'cl-user',
      label: 'Perfil',
      url: this.urlService.getProfileUrl(),
      external: false,
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.hasLinkBack = false;
    this.subscriptions.map(u => u.unsubscribe);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.barTitle) {
      this.title.setTitle(`${this.barTitle} | Sabiá`);
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll(): void {
    const scrollTopValue = document.documentElement.scrollTop;
    this.showTitleForce = scrollTopValue > 145;
  }

  openNavDrawer(): void {
    this.navDrawerService.openNavDrawer();
  }

  logout(): void {
    console.log('logout()');
  }
}
