import { BasketModel } from "./basket.model"

export interface OrderModel {

    Id?: string,
    userId: string,
    orderNumber: string,
    date: Date,
    fullName: string,
    phoneNumber: string,
    city: string,
    district: string,
    fullAdress: string,
    cardNumber: string,
    cardOwnerName: string,
    expireDate: string,
    ccv: number,
    installmentOptions: string,
    orderStatus: string,
    basket: BasketModel[]

}

export const initialOrder: OrderModel = {

    userId: "",
    fullName: "",
    orderNumber: "",
    date: new Date(),
    phoneNumber: "",
    city:"",
    district: "",
    fullAdress: "",
    cardNumber: "",
    cardOwnerName: "",
    expireDate: "",
    ccv: 0,
    installmentOptions: "Tek Çekim",
    orderStatus: "Siparişiniz Hazırlanıyor.",
    basket: []

}