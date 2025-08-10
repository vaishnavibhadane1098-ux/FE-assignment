import { Component, OnInit } from '@angular/core';
import { Bedroom } from '../../models/bedroom.model';
import { BedroomService } from '../../services/bedroom.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bedrooms',

  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bedrooms.component.html',
  styleUrls: ['./bedrooms.component.scss']
})
export class BedroomsComponent implements OnInit {
  bedrooms: Bedroom[] = [];
  bedroomForm: Partial<Bedroom> = {};
  isEditing = false;
  editingId: number | null = null;

  constructor(private bedroomService: BedroomService,private router: Router) {}

  ngOnInit() {
    this.loadBedrooms();
  }
  
  goToSensors(id: number) {
    this.router.navigate(['/bedrooms', id, 'sensors']);
  }
  loadBedrooms() {
    this.bedroomService.getAll().subscribe(data => {
      this.bedrooms = data;
    });
  }

  onSubmit() {
    if (this.isEditing && this.editingId !== null) {
      this.bedroomService.update(this.editingId, this.bedroomForm).subscribe(() => {
        this.loadBedrooms();
        this.cancelEdit();
      });
    } else {
      this.bedroomService.create(this.bedroomForm).subscribe(() => {
        this.loadBedrooms();
        this.bedroomForm = {};
      });
    }
  }

  editBedroom(bedroom: Bedroom) {
    this.bedroomForm = { name: bedroom.name };
    this.editingId = bedroom.id;
    this.isEditing = true;
  }

  cancelEdit() {
    this.bedroomForm = {};
    this.editingId = null;
    this.isEditing = false;
  }

  deleteBedroom(id: number) {
    this.bedroomService.delete(id).subscribe(() => {
      this.loadBedrooms();
    });
  }
}
