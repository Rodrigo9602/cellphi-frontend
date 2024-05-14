import { Order } from "./order";

export class Client {
    constructor( 
        public _id:string,       
        public name: string,
        public ci: string,
        public userId: string,        
        public orders: Array<Order>
    ) { }
}