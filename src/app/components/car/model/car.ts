import {CarFuelType} from "../enums/carFuelType";
import {CarGearboxType} from "../enums/carGearboxType";
import {CarDriveType} from "../enums/carDriveType";

export interface Car{
  id: number;
  name: string;
  model: string;
  category: string;
  priceShortTerm: number;
  priceLongTerm: number;
  manufactureYear: number;
  numberOfPeople: number;
  airCon: boolean;
  fuel: CarFuelType;
  gearbox: CarGearboxType;
  numberOfDoor: number;
  engineSize: number;
  driveType:  CarDriveType;
  imageUrl: string;
  isAvailable: boolean;
}
