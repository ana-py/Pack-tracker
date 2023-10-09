import { Component } from '@angular/core';
import { Package } from '../../interfaces/package.interface';
import { PackagesService } from '../../services/packages.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddPackageComponent } from '../../components/add-package/add-package.component';

@Component({
  selector: 'app-packages-page',
  templateUrl: './admin-packages-page.component.html',
  styleUrls: ['./admin-packages-page.component.css']
})
export class AdminPackagesPageComponent {
  packages: Package[] = []
  constructor(
    private packagesService: PackagesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.callService();
  }

  callService(): void {
    this.packagesService.get_packages().
    subscribe((packages) => {
      console.log("packages", packages)
      this.packages = packages;
    });
  } 

  newPackage(pack?:Package): void {
    const dialogRef = this.dialog.open(AddPackageComponent, {
      width: '500px',
      data: pack ? pack : undefined
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.callService();
    });
  }
}
