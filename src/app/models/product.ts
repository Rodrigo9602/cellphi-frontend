export class Product {
    constructor(
        public _id:string,
        public name: string,
        public stock: number,
        public userId: string,
        public availability: boolean,
        public category: string,
        public price: number,
        public registerDate: Date 
    ) { }
}