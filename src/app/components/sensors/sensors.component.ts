import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnvironmentData } from '../../models/environment.model';
import { EnvironmentService } from '../../services/sensor.service';

@Component({
  selector: 'app-environment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {
  bedroomId!: number;
  environmentData: EnvironmentData[] = [];

  // For new entry inputs
  newTemperature!: number;
  newHumidity!: number;

  editingEnvId: number | null = null;
  editedData: Partial<EnvironmentData> = {};

  constructor(private route: ActivatedRoute, private environmentService: EnvironmentService) {}

  ngOnInit() {
    this.bedroomId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEnvironmentData();
  }

  loadEnvironmentData() {
    this.environmentService.getAll(this.bedroomId).subscribe(data => {
      this.environmentData = data;
    });
  }

  async addEnvironmentData() {
    if (this.newTemperature == null || this.newHumidity == null) {
      alert('Please provide temperature and humidity values.');
      return;
    }
    this.environmentService.create(this.bedroomId, {
      temperature: this.newTemperature,
      humidity: this.newHumidity
    }).subscribe(() => {
      this.loadEnvironmentData();
      this.newTemperature = this.newHumidity = undefined!;
    });

  }

  deleteEnvironmentData(envId: number) {
    this.environmentService.delete(this.bedroomId, envId).subscribe(() => {
      this.loadEnvironmentData();
    });
  }

  startEdit(env: EnvironmentData) {
    this.editingEnvId = env.id;
    this.editedData = { temperature: env.temperature, humidity: env.humidity };
  }

  cancelEdit() {
    this.editingEnvId = null;
    this.editedData = {};
  }

  saveEdit() {
    if (this.editingEnvId !== null) {
      this.environmentService.update(this.bedroomId, this.editingEnvId, this.editedData).subscribe(() => {
        this.loadEnvironmentData();
        this.cancelEdit();
      });
    }
  }
}
