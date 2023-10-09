import { Component } from '@angular/core';
import { Package } from '../../interfaces/package.interface';
import { PackagesService } from '../../services/packages.service';
import { CredentialsService } from 'src/app/modules/shared/services/credentials.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFieldComponent } from '../../components/edit-field/edit-field.component';
import { UpdateStatusComponent } from '../../components/update-status/update-status.component';
import { RegisterLocationComponent } from '../../components/register-location/register-location.component';

@Component({
  selector: 'app-deliveryman-packages-page',
  templateUrl: './deliveryman-packages-page.component.html',
  styles: [
  ]
})
export class DeliverymanPackagesPageComponent {
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
      data: packge ? packge : undefined
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.callService();
    });
  }
}
