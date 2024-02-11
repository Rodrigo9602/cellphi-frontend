import { Facility } from "./facility";

export class Order {
    constructor(  
        public _id:string,      
        public description: string,
        public clientId: string,
        public userId: string,
        public state: string,
        public facility: Facility
    ) { }
}