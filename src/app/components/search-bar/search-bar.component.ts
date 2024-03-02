import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { search_bar } from '../../types/search-bar';

import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() filters: Array<string> = [];
  @Output() data = new EventEmitter<search_bar>();

  public searchData: search_bar;
  public filterMenuHide:boolean = true;

  public filtersIcon = faFilter;
  public searchIcon = faSearch;

  public searchForm = new FormGroup({    
    content: new FormControl('', Validators.pattern(/^[0-9a-zA-Záéíóúñ/-_\s]*$/)),    
    selectedFilter: new FormControl('')
  });

  constructor() {
    this.searchData = {
      content: '',
      selectedFilter: ''
    };
  }

  showFiltersMenu() {
    this.filterMenuHide = !this.filterMenuHide;
  }

  onFilterChange(event:any) {
    this.filterMenuHide = true;
    this.searchForm.get('selectedFilter')!.setValue(event.target.value);
  }

  onSubmit() {
    this.searchData.content = this.searchForm.value.content!;
    this.searchData.selectedFilter = this.searchForm.value.selectedFilter!;
    this.data.emit(this.searchData);
    
    this.searchForm.reset();
  }
}
