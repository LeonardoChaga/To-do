import { JsonObject } from 'typescript-json-serializer';

@JsonObject()
export class Auth {
  constructor(init?: Partial<Auth>) {
    Object.assign(this, init);
  }

  id?: string = undefined;
  email?: string = undefined;
  nome?: string = undefined;
  tipoConta?: string = undefined;
  img?: string = undefined;
  refreshToken?: string = undefined;
  accessToken?: string = undefined;
}
