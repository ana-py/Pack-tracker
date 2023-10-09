import { Component } from '@angular/core';
import { Package } from '../../interfaces/package.interface';
import { ActivatedRoute } from '@angular/router';
import { PackagesService } from '../../services/packages.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent {
  package!:Package;
  
  constructor(private activatedRoute:ActivatedRoute, private packageService:PackagesService) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(params=>this.packageService.get_package(params['id'])),
    )
    .subscribe(pack =>{
      this.package = pack;
    })
  }

  confirmDelivery():void{
    this.packageService.confirm_delivery(this.package._id!)
    .subscribe(pack =>{
      this.package = Object.assign(this.package, pack);
    })
  }
}
