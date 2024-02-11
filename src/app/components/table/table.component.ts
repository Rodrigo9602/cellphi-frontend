import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{
  public fields: Array<string> = [];
  public pagedItems: Array<any> = [];
  public pageSize: number = 5;
  public pageIndex: number = 0;
  
  
  @Input() items: Array<any> = [];
  

  constructor() {
    if(this.items.length !== 0) {
      this.fields = Object.keys(this.items[0]);   
    }
    
  }

  ngOnInit(): void {
    this.handlePageEvent({
      pageIndex: 0,
      pageSize: this.pageSize,
    });

    
  }

  handlePageEvent(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pagedItems = this.items.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }
}
