﻿import { Component, OnInit } from '@angular/core';

import { Param_SourceName_PascalService } from './Param_SourceName_Kebab.service';
import { IParam_SourceName_PascalItem } from './Param_SourceName_Kebab.model';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './Param_SourceName_Kebab.component.html',
  styleUrls: ['./Param_SourceName_Kebab.component.css']
})
export class Param_SourceName_PascalComponent implements OnInit {
  listItems$: Observable<IParam_SourceName_PascalItem[]> = new Observable();
  private dataSource: Subject<IParam_SourceName_PascalItem[]> = new Subject();
  warningMessageText = '';
  warningMessageOpen = false;

  constructor(private listService: Param_SourceName_PascalService) {}

  ngOnInit(): void {
    this.listItems$ = this.dataSource.asObservable();
    this.loadItems();
  }

  loadItems(): void {
    this.listService.getListItems().subscribe(
      (listItem: IParam_SourceName_PascalItem[]) => this.dataSource.next(listItem),
      error => this.handleError(`Request to get list items failed: ${error}`)
    );
  }

  addItem(inputText: string): void {
    this.listService.addListItem(inputText).subscribe(
      () => this.loadItems(), error => this.handleError(`Request to add item failed: ${error}`)
    );
  }

  deleteItem(id: string): void {
    this.listService.deleteListItem(id).subscribe(
      () => this.loadItems(), error => this.handleError(`Request to delete item failed: ${error}`)
    );
  }

  handleWarningClose(open: boolean): void {
    this.warningMessageOpen = open;
    this.warningMessageText = '';
  }

  private handleError(warningMessageText: string): void {
    this.warningMessageOpen = true;
    this.warningMessageText = warningMessageText;
  }
}
