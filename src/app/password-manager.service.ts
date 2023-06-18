import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Site } from './models/site';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private fireStore: Firestore) { }

  addSite(data: Site) {
    const dbInstance = collection(this.fireStore, 'sites')
    return addDoc(dbInstance, data)
  }

  loadSites(): Observable<Site[]> {
    const dbInstance = collection(this.fireStore, 'sites')
    return collectionData(dbInstance, { idField: 'id' }) as Observable<Site[]>
  }
}
