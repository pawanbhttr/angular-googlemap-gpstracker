export interface GPSLocation {
    GPSDeviceMapInfoID: number;
    DeviceType: number;
    ClientCode: string;
    IMEI: string;
    MobileNo: string;
    VehicleNo: string;
    DriverName: string;
    Latitude: number;
    Longitude: number;
    Speed: number;
    ReceivedDate: Date;
}