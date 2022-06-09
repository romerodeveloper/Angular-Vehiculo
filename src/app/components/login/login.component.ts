import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  user = null;
  

  constructor(
    private apps : AppComponent,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
  }


  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      sessionStorage.setItem("usuario", this.username);
      alert(sessionStorage.getItem("usuario"))
      this.apps.isLoggedIn = true
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/list']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }
}