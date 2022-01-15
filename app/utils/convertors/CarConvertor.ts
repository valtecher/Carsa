import { CarType } from "../../../types/car"


export const convertScrappedDataToCar = (scrappedCar:any, link:string):CarType | null | any => {

  const car: CarType = {

    color: scrappedCar.Kolor,
    mileage: scrappedCar.Przebieg,
    year: scrappedCar['Rok produkcji'],
    drive: scrappedCar['Napęd'],
    transmission: scrappedCar['Skrzynia biegów'],
    market_name: "Otomoto",
    marketplace_link: link,
    price: scrappedCar.price,
    type: scrappedCar['Typ nadwozia'],
    generation_id: "",
    engine_id: "",
    location_id: scrappedCar.location,
    registrationPlate: scrappedCar['Numer rejestracyjny pojazdu'],
    images: scrappedCar.images,

  }

  return car;
}