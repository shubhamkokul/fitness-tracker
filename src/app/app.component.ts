import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.initAuthListener();
  }

}
