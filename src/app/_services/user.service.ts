import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Device } from '../_models/device';
import { DeviceDetails } from '../_models/deviceDetails';
import { DeviceParams } from '../_models/deviceParams';
import { DeviceData } from '../_models/deviceData';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAllDevices(clientID: number) {
        return this.http.get<Device[]>(`http://www.reyocto.info/reyocto/ConnectPlusOp/` + clientID.toString() + `/1/2/3/4/`);
    }

    getDeviceDetails(deviceID: number) {
        return this.http.get<DeviceDetails[]>(`http://www.reyocto.info/reyocto/ConnectPlusOp/` + deviceID.toString() + `/1/2/3/`);
    }

    getDeviceParams(deviceID: number) {
        return this.http.get<DeviceParams[]>(`http://www.reyocto.info/reyocto/ConnPlus/` + deviceID.toString());
    }

    getDeviceDetailsByDateRange(deviceID: number, startDate: string, endDate: string) {
        return this.http.get<DeviceData[]>(`http://www.reyocto.info/reyocto/ReportData/`
            + deviceID.toString() + '/' + startDate + '/' + endDate + '/');
    }
}