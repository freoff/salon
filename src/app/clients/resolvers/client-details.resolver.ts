import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ClientStateService } from '../service/client-state.service';
import { from, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Host, Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import { ClientsModule } from '../clients.module';

@Injectable()
export class ClientDetailsResolver implements Resolve<any> {
  route: ActivatedRouteSnapshot;
  private clientStateService: ClientStateService;
  constructor(@Host() @Optional() private injector: Injector) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const clientId = this.getCLientId(route);
    this.clientStateService = this.injector.get(ClientStateService);
    console.log(this.clientStateService, 'stateService');

    return this.clientStateService.getClient(clientId).pipe(
      tap((client) => {
        if (!client) {
          this.clientStateService.loadClient({ clientId });
          this.clientStateService.setSelectedClient({ clientId });
        }
      }),
      first(),
    ); // pipe 1
  }

  private getCLientId(route: ActivatedRouteSnapshot) {
    return route.paramMap.get('clientId');
  }
}
