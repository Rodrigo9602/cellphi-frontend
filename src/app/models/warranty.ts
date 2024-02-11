import { Client } from "./client";
import { Product } from "./product";

export class Warranty {
    constructor(  
        public _id:string,      
        public userId: string,
        public productId: Product,
        public clientId: Client,
        public days: number,
        public emitionDate: Date
    ) { }
}