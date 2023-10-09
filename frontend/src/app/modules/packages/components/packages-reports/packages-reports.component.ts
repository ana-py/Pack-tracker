import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PackagesService } from '../../services/packages.service';
import { Package } from '../../interfaces/package.interface';
import * as moment from 'moment';

@Component({
  selector: 'packages-reports',
  templateUrl: './packages-reports.component.html',
  styles: [
  ]
})
export class PackagesReportsComponent implements OnInit{
  selectedDate: FormControl = new FormControl()
  packages: Package[] = []
  loading: boolean = false;

  constructor( private packagesService: PackagesService) { }

  ngOnInit(): void {
    this.selectedDate.valueChanges.subscribe(() => {
      this.requestPackages();
    })
  }
  

  requestPackages(){
    const date = moment(this.selectedDate.value).format('YYYY-MM-DD');
    this.packagesService.get_packages_by_date(date)
    .subscribe((packages) => {
      this.packages = packages;
      this.loading = false;
    })
  }

}
