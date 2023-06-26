import { TestBed } from '@angular/core/testing';

import { PasswordEncryptDecryptService } from './password-encrypt-decrypt.service';

describe('PasswordEncryptDecryptService', () => {
  let service: PasswordEncryptDecryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordEncryptDecryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
