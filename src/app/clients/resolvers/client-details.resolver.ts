import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ClientStateService } from '../../services/state/client-state.service';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Host, Injectable, Injector, Optional } from '@angular/core';

@Injectable()
export class ClientDetailsResolver implements Resolve<any> {
  route: ActivatedRouteSnapshot;
  private clientStateService: ClientStateService;
  constructor(@Host() @Optional() private injector: Injector) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const clientId = this.getClientId(route);
    this.clientStateService = this.injector.get(ClientStateService);
    return this.clientStateService.getClient(clientId).pipe(
      tap((client) => {
        if (!client) {
          this.clientStateService.loadClient({ clientId });
          this.clientStateService.fetchClientEvents({ clientId });
          this.clientStateService.setSelectedClient({ clientId });
        }
      }),
      first(),
    ); // pipe 1
  }

  private getClientId(route: ActivatedRouteSnapshot) {
    return route.paramMap.get('clientId');
  }
}
