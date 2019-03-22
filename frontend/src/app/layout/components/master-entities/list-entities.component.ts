import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { AlertService } from '../../../shared/alert.service';
import { Profile } from '../../../models/index';

@Component({
   selector: 'list-entities',
   templateUrl: 'list-entities.html'
})

export class ListEntitieComponent implements OnInit {
   listProfiles: Profile[] = [];
   loader: boolean = false;

   constructor(
      private profileService: ProfileService,
      private alertService: AlertService
   ) { }

   ngOnInit() { 
      this.getListProfiles();
   }

   /** get list of profiles */
   getListProfiles() {
      this.loader = true;
      this.profileService.getAll().subscribe(
         (data) => {
            this.listProfiles = data.data;
            this.loader = false;
         },
         (error) => {
            this.alertService.showMessageServer(error);
            this.loader = false;
         }
      );
   }
}