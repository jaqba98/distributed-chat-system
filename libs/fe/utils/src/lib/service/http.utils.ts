// done
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { EndpointEnum } from '@distributed-chat-system/shared-utils';

@Injectable({ providedIn: 'root' })
export class HttpUtils {
  constructor(private readonly http: HttpClient) {}

  async get<TOutput, TReturn>(
    endpoint: EndpointEnum,
    callback: (response: TOutput) => TReturn
  ) {
    const response = await firstValueFrom(
      this.http.get<TOutput>(`http://localhost:3002/${endpoint}`)
    );
    return callback(response);
  }

  async post<TInput, TOutput, TReturn>(
    input: TInput,
    endpoint: EndpointEnum,
    callback: (response: TOutput) => TReturn
  ) {
    const response = await firstValueFrom(
      this.http.post<TOutput>(`http://localhost:3002/${endpoint}`, input)
    );
    return callback(response);
  }
}
