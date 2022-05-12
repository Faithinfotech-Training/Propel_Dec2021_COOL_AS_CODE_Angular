export class Medicineprescription {

    medicineprescriptionId: number=0;
    prescriptionId: number=0;
    medicineId: number=0;
    medidcineName:string;
    medicineInterval:number=0;
    course:string='';
    createdDate: Date=new Date;
    modifiedDate: Date=new Date;
    status: boolean=false;
}
