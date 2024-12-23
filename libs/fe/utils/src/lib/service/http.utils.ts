// done
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { EndpointEnum } from '../enum/endpoint.enum';

@Injectable({ providedIn: 'root' })
export class HttpUtils {
  constructor(private readonly http: HttpClient) {}

  post<TInput, TOutput>(
    input: TInput,
    endpoint: EndpointEnum,
    callback: (response: TOutput) => void
  ) {
    this.http
      .post<TOutput>(`http://localhost:3002/${endpoint}`, input)
      .pipe(take(1))
      .subscribe((response) => callback(response));
  }
}
