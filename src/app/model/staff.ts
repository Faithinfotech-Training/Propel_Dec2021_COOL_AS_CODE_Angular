import { Doctor } from "./doctor";
import { User } from "./user";

export class Staff {

    staffId : number =0;
    staffNo : string ="";
	staffName : string ="";
	mobile : string ="";
	email : string ="";
	genderId :number =0;
	address : string ="";
	education : string ="";
	dob :Date =new Date;
	dateOfJoining :Date =new Date;
	createdDate :Date =new Date;
	modifiedDate :Date =new Date;
	isActive:boolean=false;

	userId :number =0;
	userName : string ="";
	password : string ="";
	roleId :number =0;

	doctorId:number=0;
	departmentId:number=0;
	consultationFees:number=0;
	specializationId:number=0;
	user:User[];
	doctor:Doctor[];
}
