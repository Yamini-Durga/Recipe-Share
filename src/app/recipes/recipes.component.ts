import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  sortOptions = [
    { name: 'A - Z', value: 'asc' },
    { name: 'Z - A', value: 'desc' }
  ];
  recipes = [1,2,3,4,5,6,7,8];
  @ViewChild('search') searchRef: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  onSortSelected(event: MatSelectChange){
    console.log("Sort direction", event.value);
  }
  onSearch() {
    console.log('Search parameter', this.searchRef.nativeElement.value);
  }
  onReset() {
    this.searchRef.nativeElement.value = '';
    console.log('Reset parameter', this.searchRef.nativeElement.value);
  }
}
