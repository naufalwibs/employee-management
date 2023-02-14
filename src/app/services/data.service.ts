import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  public lastSearch;
  public updatedEmployeeList;
  private _addEmployee = new BehaviorSubject<any>(null);
  private _editEmployee = new BehaviorSubject<any>(null);

  set setAddEmployee(bool: any) {
    this._addEmployee.next(bool);
  }

  get addEmployee() {
    return this._addEmployee.asObservable();
  }

  set setEditEmployee(bool: any) {
    this._editEmployee.next(bool);
  }

  get editEmployee() {
    return this._editEmployee.asObservable();
  }
}
