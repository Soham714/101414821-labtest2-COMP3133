import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SpacexService } from '../../services/spacex.service';
import { Launch } from '../../models/launch.model';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './missiondetails.component.html',
 styleUrls: ['./missiondetails.component.scss']
})
export class MissiondetailsComponent implements OnInit {
  mission: Launch | undefined;

  constructor(private route: ActivatedRoute, private spacexService: SpacexService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.spacexService.getLaunchById(id).subscribe(data => this.mission = data);
  }
  getLandingStatus(): boolean {
    return this.mission?.rocket?.first_stage?.cores[0]?.land_success ?? false;
  }
  
  getStatusColor(success: boolean): string {
    return success ? 'green' : 'red';
  }
  
}
