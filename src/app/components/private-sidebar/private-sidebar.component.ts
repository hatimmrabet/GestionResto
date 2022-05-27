import { Component, OnInit } from '@angular/core';
import { ERole } from 'src/app/models/ERole.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-private-sidebar',
  templateUrl: './private-sidebar.component.html',
  styleUrls: ['./private-sidebar.component.scss'],
})
export class PrivateSidebarComponent implements OnInit {

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut();
  }

  isAdmin() {
    this.tokenStorageService.getUserRole() === ERole.ROLE_ADMIN;
  }

  isClient() {
    this.tokenStorageService.getUserRole() === ERole.ROLE_CLIENT;
  }

  isWorker() {
    this.tokenStorageService.getUserRole() === ERole.ROLE_WORKER;
  }


}
