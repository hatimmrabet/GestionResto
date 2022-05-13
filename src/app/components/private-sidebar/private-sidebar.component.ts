import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-private-sidebar',
  templateUrl: './private-sidebar.component.html',
  styleUrls: ['./private-sidebar.component.scss'],
})
export class PrivateSidebarComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
  }
}
