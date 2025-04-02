import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss']
})
export class MissionlistComponent implements OnInit {
  launches: Launch[] = [];
  year: string = '';
  launchSuccess: string = '';
  landSuccess: string = '';
  showFilter: boolean = false;
  isLoading: boolean = false; // Added loading state property

  constructor(private spacexService: SpacexService, private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.isLoading = true;
    this.spacexService.getAllLaunches()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(data => this.launches = data);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/mission', id]);
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  applyFilters(): void {
    this.isLoading = true;
    this.spacexService
      .getFilteredLaunches(this.year, this.launchSuccess, this.landSuccess)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(data => this.launches = data);
  }

  clearFilters(): void {
    this.year = '';
    this.launchSuccess = '';
    this.landSuccess = '';
    this.getAll();
  }
}