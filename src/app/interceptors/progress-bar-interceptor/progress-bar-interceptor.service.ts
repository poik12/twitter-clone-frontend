import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressBarService } from 'src/app/services/progress-bar/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarInterceptorService implements HttpInterceptor {

  constructor(
    public progressBarService: ProgressBarService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Set progress bar as visible
    this.progressBarService.isLoading.next(true);
    // Update progress bar value
    return next
      .handle(request)
      .pipe(finalize(
        () => {
          this.progressBarService.isLoading.next(false);
        }
      ));
  }

}
