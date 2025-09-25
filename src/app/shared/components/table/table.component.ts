import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<any>;
}

export interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() striped: boolean = true;
  @Input() bordered: boolean = true;
  @Input() hoverable: boolean = true;
  @Input() responsive: boolean = true;
  @Input() emptyMessage: string = 'No data available';

  @Input() paginate: boolean = false;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() showFirstLastButtons: boolean = true;

  @Output() rowClick = new EventEmitter<any>();
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() page = new EventEmitter<PageEvent>();

  currentPage: number = 0;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Expose Math to template
  Math = Math;

  get paginatedData(): any[] {
    if (!this.paginate) {
      return this.data;
    }
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.data.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 0; i < this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sort.emit({
      column: this.sortColumn,
      direction: this.sortDirection
    });
  }

  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.page.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      length: this.data.length
    });
  }

  onPageSizeChange(event: any): void {
    this.pageSize = parseInt(event.target.value, 10);
    this.currentPage = 0;
    this.page.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
      length: this.data.length
    });
  }

  getCellValue(row: any, column: TableColumn): any {
    const keys = column.key.split('.');
    let value = row;
    for (const key of keys) {
      value = value[key];
    }
    return value;
  }

  getSortIcon(column: TableColumn): string {
    if (!column.sortable) return '';
    if (this.sortColumn !== column.key) return 'sort-neutral';
    return this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc';
  }

  trackByIndex(index: number): number {
    return index;
  }
}