import { Injectable } from '@angular/core';
import { AES } from 'crypto-js';

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

  }
}
