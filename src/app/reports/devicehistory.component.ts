import {
  Component,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  NgZone,
} from "@angular/core";
import { DatePipe } from "@angular/common";
import { first } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";

@Component({
  templateUrl: "devicehistory.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./pdf-styles.css", "./page-template.css"],
})
export class DeviceHistoryComponent implements OnInit {
  currentUser: User;
  devices: any = [];
  deviceDetails: any = [];
  selectedDevice: number = 0;
  selectedDeviceName: string = "";

  startDate: Date = null;
  endDate: Date = null;

  sensorsList: Array<{ Sensor: string; ID: number }> = [];
  selectedSensors: any = [];

  hasBOD: boolean = false;
  hasCOD: boolean = false;
  haspH: boolean = false;
  hasTSS: boolean = false;
  hasNO3: boolean = false;
  hasFLRate: boolean = false;
  hasTFLRate: boolean = false;
  hasORP: boolean = false;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private zone: NgZone
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.userService
      .getAllDevices(this.currentUser.Client_ID)
      .subscribe((data) => {
        this.devices = data;
      });
  }

  onDeviceSelected(deviceID: number) {
    this.selectedDevice = deviceID;
    this.getDeviceSensors(deviceID);
    this.selectedDeviceName = this.devices.filter(
      (i) => i.DeviceID === deviceID
    )[0].DeviceName;
    this.clearDataOnDeviceSelect();
  }
  clearDataOnDeviceSelect() {
    this.selectedSensors = [];
    this.deviceDetails = [];

    this.hasBOD = false;
    this.hasCOD = false;
    this.haspH = false;
    this.hasTSS = false;
    this.hasNO3 = false;
    this.hasFLRate = false;
    this.hasTFLRate = false;
    this.hasORP = false;
  }

  getDeviceSensors(deviceID: number) {
    this.userService.getDeviceParams(deviceID).subscribe((data) => {
      this.sensorsList = data;
      this.selectedSensors = [];
    });
  }

  onApply() {
    if (
      this.selectedDevice > 0 &&
      this.sensorsList.length > 0 &&
      this.startDate &&
      this.endDate
    ) {
      if (this.startDate <= this.endDate) {
        this.toastr.info("Fetching Data. Please wait...");
        this.userService
          .getDeviceDetailsByDateRange(
            this.selectedDevice,
            this.datePipe.transform(this.startDate, "yyyy-MM-dd"),
            this.datePipe.transform(this.endDate, "yyyy-MM-dd")
          )
          .subscribe((data) => {
            if (data) {
              this.deviceDetails = data;
            } else this.toastr.info("No records found.");
          });
      } else this.toastr.info("Start Date cannot be greater than End date.");
    } else this.toastr.info("Please select Device name and Dates.");
  }

  onSensorsChange(value) {
    if (this.selectedSensors.length > 5) {
      this.selectedSensors = this.selectedSensors.slice(0, 5);
    }

    this.hasBOD = this.selectedSensors.some((i) => i.ID === 6);
    this.hasCOD = this.selectedSensors.some((i) => i.ID === 7);
    this.hasNO3 = this.selectedSensors.some((i) => i.ID === 9);
    this.haspH = this.selectedSensors.some((i) => i.ID === 4);
    this.hasTSS = this.selectedSensors.some((i) => i.ID === 8);
    this.hasFLRate = this.selectedSensors.some((i) => i.ID === 11);
    this.hasTFLRate = this.selectedSensors.some((i) => i.ID === 10);
    this.hasORP = this.selectedSensors.some((i) => i.ID === 12);
  }
}
