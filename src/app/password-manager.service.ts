import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
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
}
