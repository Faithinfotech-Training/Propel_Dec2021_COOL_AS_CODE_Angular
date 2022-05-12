

export class Appointment {

    appointmentId: number=0;
    patientId: number=0;
    departmentId: number=0;
    doctorId: number=0;
	consultationFees:number=0;
    appointmentDate: Date=new Date;
    tokenNo: string='';
    status: boolean=false;
    patientName :string='';
    staffId :number=0;
}