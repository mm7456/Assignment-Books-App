import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { map, tap, take, distinctUntilChanged } from 'rxjs/operators';
import { isObject } from 'util';
import {
  faLightbulb as faSolidLightbulb,
  faDollarSign,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {
  faLightbulb as faRegularLightbulb
} from "@fortawesome/free-solid-svg-icons";

import { ThemeService } from "src/app/theme/theme.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = "Guest"
  isLoggedIn = false;

  faLightbulb: IconDefinition;
  faDollarSign = faDollarSign;


  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.setLightbulb();
    this.themeService.setLightTheme();
    this.authService.user.asObservable().pipe(distinctUntilChanged((prev, curr) => {

      return false;

    }))
      .subscribe(user => {
        console.log("in subscribe", user);

        const isAuth = !!user;
        if (isAuth) {

          console.log("In Header", user);
          this.isLoggedIn = true;
          this.name = user.email;

        }
        else {
          this.isLoggedIn = false;
          this.name = "Guest";
        }
      })

    const obj = JSON.parse(localStorage.getItem('userData'));
    if (obj != null) {
      const user = new User(obj.email, obj.id);
      this.authService.user.next(user);
    }

  }

  onLogout() {

    this.authService.logout();

  }


  setLightbulb() {
    if (this.themeService.isDarkTheme()) {
      this.faLightbulb = faRegularLightbulb;
    } else {
      this.faLightbulb = faSolidLightbulb;
    }
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }

    this.setLightbulb();
  }

}
