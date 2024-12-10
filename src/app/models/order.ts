/**
 * Order Class
 * Represents the data structure for an order in the system.
 * 
 * Author: Enkh-Amgalan G.
 */

export class Order {
    id: number | undefined;
    orderDetails: string[] = [];
    email: String | undefined;
    city: String | undefined;
    name: String | undefined;
    lastname: String | undefined;
    address: String | undefined;
    apartment: String | undefined;
    postalCode: String | undefined;
    country: String | undefined;
}
  