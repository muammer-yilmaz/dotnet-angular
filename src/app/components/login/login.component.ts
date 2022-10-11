import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      console.log('this.loginForm.value :>> ', this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe({
        next: (response) => {
          console.log('response', response)
          this.toastrService.info(response.message, "" + response.success)
          localStorage.setItem("token", response.data.token)
        },
        error: (responseError) => {
          console.log('error :>> ', responseError);
          this.toastrService.error(responseError.error)
        }
      })
    }
  }

}
