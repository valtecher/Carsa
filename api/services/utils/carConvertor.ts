export const convertScrappedDataToCar = (scrappedCar:any, link:string): any => {

  console.log('Scrapped car: ', scrappedCar);

  let drive; 
  let transmission;
  let type = scrappedCar['Typ nadwozia']; 
  if(scrappedCar['Napęd'].toString().toLowerCase() === 'Naprzedniakola'.toLowerCase()) {
    drive = 'Front'
  } if (scrappedCar['Napęd'].toString().toLowerCase() === 'Natylnekola'.toLowerCase()) {
    drive = 'Rear'
  } else {
    drive = 'All'
  }

  if (scrappedCar['Skrzynia biegów'] === 'Manualna') {
    transmission = 'Manual'
  } else {
    transmission = 'Auto'
  } 
  
  const car: any = {

    color: scrappedCar.Kolor,
    mileage: scrappedCar.Przebieg,
    year: scrappedCar['Rok produkcji'],
    drive,
    transmission,
    market_name: "Otomoto",
    marketplace_link: link,
    price: scrappedCar.price,
    type,
    generation_id: "",
    engine_id: "",
    location_id: scrappedCar.location,
    registrationPlate: scrappedCar['Numer rejestracyjny pojazdu'],
    images: scrappedCar.images,

  }

  return car;
}