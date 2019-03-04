export interface CartItem {
    id?: number; // int(11) AI PK 
    cartid?: number; // int(11) 
    productid?: number; // int(11) 
    quantity?: number; // int(3) 
    unitprice?: number; // decimal(11,2) 
    totalprice?: number; // decimal(11,2)
};