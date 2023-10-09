import { Component } from '@angular/core';
import { Package } from '../../interfaces/package.interface';
import { PackagesService } from '../../services/packages.service';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from 'src/app/modules/shared/services/credentials.service';
import { UpdateStatusComponent } from '../update-status/update-status.component';
import { RegisterLocationComponent } from '../register-location/register-location.component';

@Component({
  selector: 'delivery-package-table',
  templateUrl: './delivery-package-table.component.html',
  styles: [
  ]
})
export class DeliveryPkgTableComponent {

  packages: Package[] = []
  constructor(
    private packagesService: PackagesService,
    private credentialsService: CredentialsService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.callService();
  }

  callService(): void {
    const user_id: string = this.credentialsService.user_credentials._id;
    
    this.packagesService.get_active_packages(user_id).subscribe(
      {
        next: (response) => {
          this.packages = response;
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  updateStatus(pack?:Package): void {
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
      width: '500px',
      data: pack ? pack : undefined
    });

    dialogRef.afterClosed().subscribe((result) => {
      
      if (result) this.callService();
    });
  }
 
  registerLocation(packge: Package): void {
    const dialogRef = this.dialog.open(RegisterLocationComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.callService();
    });
  }
}

