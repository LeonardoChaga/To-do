import { JsonObject } from 'typescript-json-serializer';

@JsonObject()
export class Usuario {
  constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }

  id?: string = undefined;
  nome?: string = undefined;
  email?: string = undefined;
  senha?: string = undefined;
}
