import { Component } from '@angular/core';
import { Package } from '../../interfaces/package.interface';
import { PackagesService } from '../../services/packages.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPackageComponent } from '../add-package/add-package.component';

@Component({
  selector: 'packages-package-table',
  templateUrl: './package-table.component.html',
  styleUrls: []
})
export class PackageTableComponent {
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

  newPackage(): void {
    const dialogRef = this.dialog.open(AddPackageComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.callService();
    });
  }
}
