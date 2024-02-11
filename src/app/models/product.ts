export class Product {
    constructor(
        public _id:string,
        public name: String,
        public stock: Number,
        public userId: String,
        public availability: Boolean,
        public category: String,
        public price: Number,
        public registerDate: Date 
    ) { }
}