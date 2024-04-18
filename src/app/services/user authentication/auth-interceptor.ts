import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserAuthenticationService } from "./user-authentication.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor( private userAuthService: UserAuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.userAuthService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)
        })

        return next.handle(authRequest)
    }
    
}