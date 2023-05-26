export class Reservation {
  carId: number;
  carName: string;
  carModel: string;
  numberOfDays: number;
  priceForDay: number;
  priceAll: number;
  pickUpLocation: string;
  returnLocation: string;
  startDate: string;
  endDate: string;


  constructor(carId: number, carName: string, carModel: string, numberOfDays: number, priceForDay: number, priceAll: number,
              pickUpLocation: string, returnLocation: string, startDate: string, endDate: string) {
    this.carId = carId;
    this.carName = carName;
    this.carModel = carModel;
    this.numberOfDays = numberOfDays;
    this.priceForDay = priceForDay;
    this.priceAll = priceAll;
    this.pickUpLocation = pickUpLocation;
    this.returnLocation = returnLocation;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
