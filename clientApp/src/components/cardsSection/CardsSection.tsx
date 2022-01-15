import React from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import styles from './cardsSection.module.scss'
import CarCard from '../carCard/CarCard'
import {CarType} from '../../interfaces/models/car'

Aos.init({
    offset: 200,
    duration: 800,
    easing: 'ease-in-sine',
    delay: 1200,
})

let car: CarType = {
    id: 'hub',
    mainImage: '/images/home/audi-a4-to-c7b33837cde1c592379b2.jpg.webp',
    description: 'description',
    brand: 'Audi',
    model: 'A5',
    generation: 'V',
    price: 12000,
    type: 'type',
    market: 'OtoMoto',
    mileage: 200000,
    color: 'red',
    drive: 'drive',
    year: '2019',
    gearBox: 'gearBox',
    Engine: {name: 'engine', volume: '3.0', power: 279, fuel_type: 'diesel'},
    CarGeneration: {
        id: '82fe67f9-8e66-425e-a853-520d8669be41',
        model_id: '82fe67f9-8e66-425e-a853-520d8669be41',
        name: 'generationName',
        start_year: '2018',
        end_year: '2019',
        CarModel: {
            id: '82fe67f9-8e66-425e-a853-520d8669be41',
            name: 'modelName',
            brand_id: '82fe67f9-8e66-425e-a853-520d8669be41',
            CarBrand: {
                id: '82fe67f9-8e66-425e-a853-520d8669be41',
                name: 'brandName'
            },
        },
    },
    images: [],
    equipment: [],
}

const CardsSection = () => {
    return (
        <div data-aos='fade-in' className={styles.wrapper}>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
            <CarCard data-aos='fade-up' offeredCar={car}/>
        </div>
    )
}

export default CardsSection
