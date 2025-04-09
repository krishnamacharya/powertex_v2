import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Broadcaster } from '../app/app.broadcaster';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

  constructor(private broadcaster:Broadcaster) {
  }

  fire(data: any): void {
    this.broadcaster.broadcast(MessageEvent, data);
  }

  on(): Observable<any> {
    return this.broadcaster.on<any>(MessageEvent);
  }
}
