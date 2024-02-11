export class Facility {
    constructor(
        public _id:string,
        public userId: string,
        public orderId: string,
        public description: string,
        public price: number,
        public deliveryDate: Date
    ) { }
}