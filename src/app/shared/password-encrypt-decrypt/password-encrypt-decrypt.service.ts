import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordEncryptDecryptService {
  secret = 'secret_key'
  constructor() { }

  encrypt(val: string) {
    return AES.encrypt(val, this.secret).toString()
  }

  decrypt(val: string) {
    return AES.decrypt(val, this.secret).toString(enc.Utf8)
  }
}
