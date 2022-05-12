export class Patient {

    patientId: number=0;
    staffId: number=0;
    patientName: string='';
    patientNo: string='';
    mobile: string='';
    email: string='';
    genderId: number=0;
    bloodGroupId: number=0;
    dob: Date=new Date;
    address: string='';
    createdDate: Date=new Date;
    modifiedDate: Date=new Date;
    isActive: boolean=false;
}