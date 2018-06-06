import { ProgressService } from './../../services/progress.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../../services/vehicle.service';
import { PhotoService } from '../../services/photo.service';
import { SaveVehicle, Vehicle } from '../../models/vehicle';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgress } from '../../services/progress.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
  providers: [
      { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
       ProgressService    
  ]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any  = {
    id: 0,
    make: {
      id: 0,
      name:''
    },
    model:  {
      id: 0,
      name:''
    },
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };
  vehicleId: number; 
  tab: string = 'vehicles';
  photos: any[];
  progress: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private photoService: PhotoService,
    private vehicleService: VehicleService,
    private progressService: ProgressService,
    private auth: AuthService) { 

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return; 
      }
    });

  }

  ngOnInit() { 
    this.photoService.getPhotos(this.vehicleId) 
      .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => {
          this.vehicle = v;
          // console.log(this.vehicle);
        },
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto(){
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file =nativeElement.files[0];
    nativeElement.value = '';

    this.progressService.startTracking()
      .subscribe(progress => {
        //console.log(progress);
        this.zone.run(()=>{
          this.progress=progress;
        });
    },
    null,
    ()=> this.progress=null
    );
    this.photoService.upload(this.vehicleId, file)
      .subscribe(x=>{
        //console.log(x);
        this.photos.push(x);
      },
      err => {
          this.toasty.error({
            title: 'Error',
            msg: err.text(),
            theme:'bootstrap',
            showClose: true,
            timeout:5000
          });
      });

  }

  showTab(tabname: string){
    this.tab = tabname;
  }
}