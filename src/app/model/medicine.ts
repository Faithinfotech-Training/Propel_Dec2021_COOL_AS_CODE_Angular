export class Medicine {

    medicineId: number=0;
    medicineCode: string='';
    medicineName: string='';
    genericName: string='';
    companyName: string='';
    quantity: number=0;
    unit: string='';
    unitPrice:number=0;
    createdDate: Date=new Date;
    modifiedDate: Date=new Date;
    isActive: boolean=false;
}