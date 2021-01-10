import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({templateUrl: 'dashboard.component.html'})
export class DashboardComponent implements OnInit {
    currentUser: User;
    devices: any = [];
    deviceDetails: any = [];
    selectedDevice: number = 0;

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.userService.getAllDevices(this.currentUser.Client_ID)
            .subscribe(data=> {
                this.devices = data;
                this.GetDeviceDetails(data[0].DeviceID)
            });
    }

    GetDeviceDetails(DeviceID: number) {
        this.selectedDevice = DeviceID;
        this.userService.getDeviceDetails(DeviceID)
        .subscribe(data => { 
            this.deviceDetails = data[0]; 
        });
    }
}