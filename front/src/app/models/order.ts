export interface Order {
    id?: number; // int(11) AI PK
    clientid?: number; // int(9) UN zerofill
    cartid?: number; // int(11)
    price?: number; // decimal(11,2)
    shippingcity?: string; // varchar(45)
    shippingstreet?: string; // varchar(45)
    shippingdate?: Date; // date
    datecreated?: Date; // timestamp
    ccnumber?: number; // int(16) UN zerofill
};