import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthenticationService} from "../_services";


@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const authToken = this.authService.getToken();
        
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken, 
            }
        });
        return next.handle(req);
    }
}