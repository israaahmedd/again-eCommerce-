import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
 
isModalOpen:boolean=true;

  
  private isModalVisibleSubject = new BehaviorSubject<boolean>(false);
  isModalVisible$ = this.isModalVisibleSubject.asObservable();

  toggleModal(): void {
    this.isModalVisibleSubject.next(!this.isModalVisibleSubject.value);
  }

 

 


}