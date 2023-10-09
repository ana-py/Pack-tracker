import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Package } from '../../interfaces/package.interface';
import { PackagesService } from '../../services/packages.service';
import * as moment from 'moment';

@Component({
  selector: 'app-packages-reports-page',
  templateUrl: './packages-reports-page.component.html',
  styles: [],
})
export class PackagesReportsPageComponent {
  selectedDate: FormControl = new FormControl();
  packages: Package[] = [];
  loading: boolean = false;

  constructor(private packagesService: PackagesService) {}

  ngOnInit(): void {
    this.selectedDate.valueChanges.subscribe(() => {
      this.requestPackages();
    });
  }

  requestPackages() {
    const date = moment(this.selectedDate.value).format('YYYY-MM-DD');
    this.packagesService.get_packages_by_date(date).subscribe((packages) => {
      this.packages = packages;
      this.loading = false;
    });
  }
}
