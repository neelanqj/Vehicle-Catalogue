import { KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { Vehicle } from '../../models/vehicle';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3; 
  allVehicles: any[];
  queryResult: any = {};
  makes: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true }
  ];

  constructor(
    private vehicleService: VehicleService, 
    private toastyService: ToastyService,
    private auth: AuthService
  ) { 
  }

  ngOnInit() {
    this.vehicleService.getVehicles(this.query).subscribe(
     // vehicles => this.vehicles = this.allVehicles = vehicles
     vehicles => this.queryResult = vehicles
    );
    this.vehicleService.getMakes().subscribe(
      makes => this.makes = makes
    );

    this.populateVehicles();
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query).subscribe(
     result => this.queryResult = result
    )
  }

  sortBy(colName) {
    if(this.query.sortBy === colName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = colName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onFilterChange(){
    /*
    var vehicles = this.allVehicles;

    if(this.filter.makeId)
      vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    if(this.filter.modelId)
      vehicles = vehicles.filter(v => v.model.id == this.filter.model.id);

    this.vehicles = vehicles;
    */
    this.query.page = 1;
    this.query.pageSize = this.PAGE_SIZE;
    this.populateVehicles();

  }

  resetFilter(){
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  onPageChange(page){
    this.query.page = page;
    this.populateVehicles();
  }
}
