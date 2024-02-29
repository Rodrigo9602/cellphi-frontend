import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FontAwesomeModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{
  public items: Array<any> = [];
  public fields: Array<string> = [];
  public pagedItems: Array<any> = [];
  public pageSize: number = 5;
  public pageIndex: number = 0;
  
  public updateIcon = faEdit;
  public deleteIcon = faTrash;

  @Input()
  itemsInput!: Observable<any>;
  
  @Output() selectedItem = new EventEmitter<any>();  
  

  constructor() {  }

  ngOnInit(): void { 

    this.itemsInput.subscribe(items => {
      this.items = items;
      
      if(this.items.length !== 0) {
        this.fields = Object.keys(this.items[0]);   
      }
  
      this.handlePageEvent({
        pageIndex: 0,
        pageSize: this.pageSize,
      });
    })
    
    

    
  }

  handlePageEvent(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pagedItems = this.items.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }

  onUpdate(item:any) {
    this.selectedItem.emit({item, operation: 'update'});
   
  }

  onDelete(item:any) {
    this.selectedItem.emit({item, operation: 'delete'});
    
  }
}
