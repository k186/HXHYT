export interface AppointmentData {
    appointmentType: string;
    channelCode: string;
    hospitalAreaCode: string;
    deptCode: string;
    doctorId: string;
    appCode: string;
    hospitalCode: string;
    tabAreaCode: string;
    deptCategoryCode: string;
}

export interface DoctorData {
    docName: string,
    docHeadImage: string
}
/*医生排班信息*/
export interface DoctorScheduleRowData {
    scheduleDate: string,
    availableCount: number,
    price: number,
    sysScheduleId:string,
    scheduleRange:number
}

/*预约抢号数据*/
export interface ConfirmAppointmentData {
    "hospitalCode": string,
    "sysTimeArrangeId": string,
    "type": string,
    "channelCode": string,
    "appCode": string,
    "hospitalAreaCode": string,
    "verifyCode": string,
    "sysScheduleId": string,
    "imageId": string,
    "cardId": string,
    "encrypt": string,
    "appointmentType": number
}

export interface ImageData{
    "bizSeq": string,
    "imageData": string
}
