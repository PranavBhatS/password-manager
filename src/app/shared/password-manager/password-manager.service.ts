import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Site } from '../../models/site';
import { Observable, map } from 'rxjs';
import { Password } from '../../models/password';
import { PasswordEncryptDecryptService } from '../password-encrypt-decrypt/password-encrypt-decrypt.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private fireStore: Firestore, private encryptDecryptService: PasswordEncryptDecryptService) { }

  addSite(data: Site) {
    const dbInstance = collection(this.fireStore, 'sites')
    return addDoc(dbInstance, data)
  }

  loadSites(): Observable<Site[]> {
    const dbInstance = collection(this.fireStore, 'sites')
    return collectionData(dbInstance, { idField: 'id' }) as Observable<Site[]>
  }

  updateSite(site: Site): Promise<void> {
    if (!site.id) throw Error("ID not exist")
    const docInstance = doc(this.fireStore, 'sites', site.id)
    delete site.id;
    return updateDoc(docInstance, site as any)
  }

  deleteSite(id: string | undefined) {
    if (!id) throw Error("ID not exist")
    const docInstance = doc(this.fireStore, 'sites', id)
    return deleteDoc(docInstance)
  }


  /*
  Password Queries
  */
  addPassword(pass: Password, siteId: string) {
    const dbInstance = collection(this.fireStore, `sites/${siteId}/passwords`)
    return addDoc(dbInstance, pass)
  }

  loadPasswords(siteId?: string): Observable<Password[]> {
    const dbInstance = collection(this.fireStore, `sites/${siteId}/passwords`)
    let passwordList = collectionData(dbInstance, { idField: 'id' }) as Observable<Password[]>
    return passwordList.pipe(map(passList => passList.map(pass => {
      pass.password = this.encryptDecryptService.decrypt(pass.password)
      return pass;
    })))
  }

  updatePassword(pass: Password, siteId: string) {
    if (!pass.id) throw Error("Id not exist")
    const docInstance = doc(this.fireStore, `sites/${siteId}/passwords`, pass.id)
    return updateDoc(docInstance, pass as any)
  }

  deletePassword(passId: string, siteId: string) {
    if (!passId || !siteId) throw Error("Id not exist")
    const docInstance = doc(this.fireStore, `sites/${siteId}/passwords`, passId)
    return deleteDoc(docInstance)
  }


}
