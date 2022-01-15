import { CarType as Car, CarDashboardPresentationType as CarDash } from "../interfaces/models/car"
import { reportTypes } from '../interfaces/enums/ReportTypes';

export const carToFlatCar = (car:Car) => {
  const carEngine = car.Engine
  const flattenEngine = {
    EngineName: carEngine?.name || '',
    EngineVolume: carEngine?.volume || '', 
    EnginePetrol: carEngine?.fuel_type || '',
    EnginePower: carEngine?.power || '',
  }
  const carNaming = {
    brand: car.CarGeneration.CarModel.CarBrand.name,
    model: car.CarGeneration.CarModel.name,
    generation: car.CarGeneration.name,
  };

  const flattenCar = {...car, ...flattenEngine, ...carNaming }
  console.log(flattenCar, ' flattenCar')
  return flattenCar;
}

export const carToFlatNaming = (car:Car)  => {
  const carNaming = {
    brand: car.CarGeneration.CarModel.CarBrand.name,
    model: car.CarGeneration.CarModel.name,
    generation: car.CarGeneration.name,
  };

  const flattenCar = {...car, ...carNaming }
  console.log(flattenCar, ' flatten to name Car')
  return flattenCar;
}
export const cartodasboardview =  (car: Car) => {
  const finalReports = {
      interior: -1,
      outside: -1,
      engine: -1,
      suspension: -1,
  }

  const reports = [...car?.ReportOverviews?.[0]?.Reports || []];

  reports.forEach((report)=>{
    if(report?.ReportType?.name === reportTypes?.Engine) {
      finalReports.engine =  report?.condition
    } else if(report?.ReportType?.name === reportTypes?.Inside){
      finalReports.interior =  report.condition
    } else if(report.ReportType?.name === reportTypes?.Outside) {
      finalReports.outside = report?.condition
    } else if (report?.ReportType?.name === 'Suspension') {
      finalReports.suspension =  report?.condition
    }
  })

  // console.log('fin', finalReports)

  let carDashboard:CarDash = {
    ...car, brand: car?.CarGeneration?.CarModel?.CarBrand?.name, model: car?.CarGeneration?.CarModel?.name, generation: car?.CarGeneration?.name,
    vin: car?.vin || '',
    numberPlate: "",
    owner: car?.ReportOverviews?.[0]?.Technician?.Employee?.Person?.first_name + ' ' + car?.ReportOverviews?.[0]?.Technician?.Employee?.Person?.last_name,
    report: finalReports
  }
  return carDashboard
}
