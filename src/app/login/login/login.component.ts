import { Component } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { IUser } from '../shared/models/user';
import { AuthService } from 'app/login/auth.service';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  getErrorMessageForEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Please enter valid email' :
        '';
  }

  hide = true;

  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService, private loginService: LoginService,
    private router: Router) { }
    getUser(){
      this.loginService.getUser().subscribe(
        res => {
          console.log('we got all the users');
          console.log(res);
        }
      );
    }
  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      let email = this.email.value;
      let password = this.password.value;
      this.authService.login(email, password);
      this.loginService.login(email, password).subscribe(
        res => {
          if (res.status) {
            //store user details in local storage
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
              if (res.data.userType == 'admin') {
                this.router.navigate(['/admin']);
              }
              else {
                this.router.navigate(['/user']);
              }
            }
          }
          else {
            this.errorMessage = res.message;
          }
        });
    } else {
      this.errorMessage = 'Please enter email and password.';
    };
  }

  RedirectToSignUp(): void {
    //this.router.navigateByUrl(this.authService.redirectUrl);
    this.router.navigateByUrl('/signup');
  }
}

