import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';
import { MissionlistComponent } from '../missionlist/missionlist.component';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MissionlistComponent
  ],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.scss']
})
export class MissionfilterComponent {
  year: string = '';
  launchSuccess: string = '';
  landSuccess: string = '';
  filteredMissions: Launch[] = [];

  constructor(private spacexService: SpacexService) {}

  filterMissions(): void {
    this.spacexService
      .getFilteredLaunches(this.year, this.launchSuccess, this.landSuccess)
      .subscribe(data => this.filteredMissions = data);
  }

  clearFilters(): void {
    this.year = '';
    this.launchSuccess = '';
    this.landSuccess = '';
    this.filteredMissions = [];
  }
}
