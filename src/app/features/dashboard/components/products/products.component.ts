import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';
import { TableColumn } from '../../../../shared/components/table/table.component';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  createdDate: Date;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  searchTerm = '';

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true, width: '150px' },
    { key: 'price', label: 'Price', sortable: true, width: '120px', align: 'right' },
    { key: 'stock', label: 'Stock', sortable: true, width: '100px', align: 'center' },
    { key: 'status', label: 'Status', sortable: true, width: '120px' },
    { key: 'createdDate', label: 'Created Date', sortable: true, width: '150px' }
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.products = [
        { id: 1, name: 'Laptop Pro 15"', category: 'Electronics', price: 1299.99, stock: 45, status: 'In Stock', createdDate: new Date('2024-01-15') },
        { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 120, status: 'In Stock', createdDate: new Date('2024-02-20') },
        { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 59.99, stock: 0, status: 'Out of Stock', createdDate: new Date('2024-03-10') },
        { id: 4, name: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 23, status: 'In Stock', createdDate: new Date('2024-01-25') },
        { id: 5, name: 'Keyboard Mechanical', category: 'Accessories', price: 149.99, stock: 67, status: 'In Stock', createdDate: new Date('2024-04-05') },
        { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79.99, stock: 5, status: 'Low Stock', createdDate: new Date('2024-02-15') },
        { id: 7, name: 'Desk Lamp LED', category: 'Office', price: 34.99, stock: 0, status: 'Out of Stock', createdDate: new Date('2024-03-20') },
        { id: 8, name: 'Standing Desk', category: 'Furniture', price: 599.99, stock: 12, status: 'In Stock', createdDate: new Date('2024-01-30') },
        { id: 9, name: 'Office Chair', category: 'Furniture', price: 299.99, stock: 8, status: 'Low Stock', createdDate: new Date('2024-04-10') },
        { id: 10, name: 'Headphones Wireless', category: 'Electronics', price: 199.99, stock: 34, status: 'In Stock', createdDate: new Date('2024-02-28') }
      ];
      this.filteredProducts = [...this.products];
      this.loading = false;
    }, 1000);
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterProducts();
  }

  filterProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm) ||
        product.category.toLowerCase().includes(this.searchTerm) ||
        product.status.toLowerCase().includes(this.searchTerm) ||
        product.price.toString().includes(this.searchTerm)
      );
    }
  }

  onSort(event: any): void {
    const { column, direction } = event;
    this.filteredProducts.sort((a: any, b: any) => {
      const aVal = a[column];
      const bVal = b[column];

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onRowClick(product: Product): void {
    console.log('Product clicked:', product);
  }

  addProduct(): void {
    console.log('Add new product');
  }

  editProduct(product: Product): void {
    console.log('Edit product:', product);
  }

  deleteProduct(product: Product): void {
    console.log('Delete product:', product);
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Stock':
        return 'status-success';
      case 'Low Stock':
        return 'status-warning';
      case 'Out of Stock':
        return 'status-danger';
      default:
        return '';
    }
  }

  getInStockCount(): number {
    return this.products.filter(p => p.status === 'In Stock').length;
  }

  getLowStockCount(): number {
    return this.products.filter(p => p.status === 'Low Stock').length;
  }

  getOutOfStockCount(): number {
    return this.products.filter(p => p.status === 'Out of Stock').length;
  }
}