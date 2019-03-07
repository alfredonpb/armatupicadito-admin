import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertService } from 'src/app/shared/alert.service';
import { Profile } from 'src/app/models';

@Component({
   selector: 'list-users',
   templateUrl: 'list-users.html'
})

export class ListUserComponent implements OnInit {
   cmbProfiles: Profile[] = [];
   constructor(
      private profileService: ProfileService,
      private alertService: AlertService
   ) { }

   ngOnInit() { 
      this.getCmbProfiles();
   }

   /** get cmb of profiles */
   getCmbProfiles() {
      this.profileService.getAll().subscribe(
         (data) => {
            this.cmbProfiles = data.data;
         },
         (error) => {
            this.alertService.showMessageServer(error);
         }
      );
   }

}