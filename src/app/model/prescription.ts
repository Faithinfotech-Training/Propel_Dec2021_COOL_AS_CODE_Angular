
import { Testprescription } from "./testprescription";
import { Medicineprescription } from "./medicineprescription";
export class Prescription {

    prescriptionId: number=0;
    appointmentId: number=0;
    diagnosis:string='';
    createdDate: Date=new Date;
    modifiedDate: Date=new Date;
    Testprescription:Testprescription[];
    Medicineprescription:Medicineprescription[];
}
