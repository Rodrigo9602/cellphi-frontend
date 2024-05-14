import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() options:Array<any> = [];
  @Output() selectedOptionChange = new EventEmitter<any>();

  isDropdownOpen = false;
  selectedOption:any | null = null;

  
 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option:any) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(option);
    this.isDropdownOpen = false;
  }
}
