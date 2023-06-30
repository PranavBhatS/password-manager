import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, updateDoc, where, } from '@angular/fire/firestore';
import { Site } from '../../models/site';
import { Observable, map } from 'rxjs';
import { Password } from '../../models/password';
import { PasswordEncryptDecryptService } from '../password-encrypt-decrypt/password-encrypt-decrypt.service';
import { setPersistence } from '@firebase/auth'
import { Auth, NextOrObserver, UserCredential, browserSessionPersistence, signInWithEmailAndPassword } from '@angular/fire/auth';

type Credentails = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {
  currentUser = ''
  constructor(private fireStore: Firestore,
    private auth: Auth, private encryptDecryptService: PasswordEncryptDecryptService) {
    console.log(this.currentUser)
  }

  addUser(user: any) {
    const dbInstance = collection(this.fireStore, 'users')
    return addDoc(dbInstance, user)
  }

  async getUserById(user: string) {
    const dbInstance = collection(this.fireStore, 'users')
    const q = query(dbInstance, where("username", '==', user))
    return (await getDocs(q))
  }

  addSite(data: Site) {
    let dataUrlForSite = `users/${this.currentUser}/sites`
    const dbInstance = collection(this.fireStore, dataUrlForSite)
    return addDoc(dbInstance, data)
  }

  loadSites(): Observable<Site[]> {
    let dataUrlForSite = `users/${this.currentUser}/sites`
    const dbInstance = collection(this.fireStore, dataUrlForSite)
    return collectionData(dbInstance, { idField: 'id' }) as Observable<Site[]>
  }

  updateSite(site: Site): Promise<void> {
    if (!site.id) throw Error("ID not exist")
    let dataUrlForSite = `users/${this.currentUser}/sites`
    const docInstance = doc(this.fireStore, dataUrlForSite, site.id)
    delete site.id;
    return updateDoc(docInstance, site as any)
  }

  deleteSite(id: string | undefined) {
    if (!id) throw Error("ID not exist")
    let dataUrlForSite = `users/${this.currentUser}/sites`
    const docInstance = doc(this.fireStore, dataUrlForSite, id)
    return deleteDoc(docInstance)
  }


  /*
  Password Queries
  */
  addPassword(pass: Password, siteId: string) {
    let dataUrlForPassword = `users/${this.currentUser}/sites/${siteId}/passwords`
    const dbInstance = collection(this.fireStore, dataUrlForPassword)
    return addDoc(dbInstance, pass)
  }

  loadPasswords(siteId?: string): Observable<Password[]> {
    let dataUrlForPassword = `users/${this.currentUser}/sites/${siteId}/passwords`
    const dbInstance = collection(this.fireStore, dataUrlForPassword)
    let passwordList = collectionData(dbInstance, { idField: 'id' }) as Observable<Password[]>
    return passwordList.pipe(map(passList => passList.map(pass => {
      pass.password = this.encryptDecryptService.decrypt(pass.password)
      return pass;
    })))
  }

  updatePassword(pass: Password, siteId: string) {
    if (!pass.id) throw Error("Id not exist")
    let dataUrlForPassword = `users/${this.currentUser}/sites/${siteId}/passwords`
    const docInstance = doc(this.fireStore, dataUrlForPassword, pass.id)
    return updateDoc(docInstance, pass as any)
  }

  deletePassword(passId: string, siteId: string) {
    if (!passId || !siteId) throw Error("Id not exist")
    let dataUrlForPassword = `users/${this.currentUser}/sites/${siteId}/passwords`
    const docInstance = doc(this.fireStore, dataUrlForPassword, passId)
    return deleteDoc(docInstance)
  }


  /*
  Login Queries
  */
  async login(cred: Credentails): Promise<UserCredential> {

    await setPersistence(this.auth, browserSessionPersistence);
    return await signInWithEmailAndPassword(this.auth, cred.email, cred.password);
  }

  logout() {
    this.auth.signOut()
  }

  validateIdToken(fn: NextOrObserver<any>) {
    return this.auth.onAuthStateChanged(fn)
  }



}
