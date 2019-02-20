import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { ClientStateService } from '../service/client-state.service';
import {Observable, of} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {ClientRepository} from '../../repository/client-repository';

export class ClientDetailsResolver implements Resolve<any> {

    route: ActivatedRouteSnapshot;

    constructor(private clientStateService: ClientStateService, private clientsRepository: ClientRepository) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.clientStateService.getClient(this.getCLientId()).pipe(
            switchMap(client => {
                if (client) {
                    return of(client);
                } else {
                    this.clientsRepository.getClient({})
                }
            })
            })

        )
  }

  private getCLientId() {
      return this.route.queryParamMap.get('clientId');
  }
}
