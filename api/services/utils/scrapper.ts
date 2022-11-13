import { StatusCodes } from 'http-status-codes';
import { convertScrappedDataToCar } from './carConvertor'
import { findCarName, findEngineByCharacteristics  } from '../helpers/carHelpers'
const puppeteer = require('puppeteer');


export const scrapOtoCar = async (link:string) => {
  const result:any = {}
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  if(link){
      await page.goto(link);
      try{
        // await page.click('#onetrust-accept-btn-handler');
      } catch(err){
        console.log('no such btn')      
      }
      

      const labels:any = await page.evaluate(() => {
          return Array.from(document.getElementsByClassName('offer-params__label')).map((el:any) => {
              return el.textContent;
          });
      });

    //   console.log(labels);

      const photos:any =  await page.evaluate(() => {
          let images = Array.from(document.querySelectorAll('.offer-photos-thumbs__item img')).map((el:any) => {
              return el.src
          });
          return images;
      })

    
      const values:any = await page.evaluate(() => {
          return Array.from(document.getElementsByClassName('offer-params__value')).map((el:any) => {
              return el.textContent;
          });
      });

    //   console.log(values)

      const location = await page.evaluate(() => {
          return Array.from(document.getElementsByClassName('seller-card__links__link--address')).map((el:any) => {
              return el.textContent
          })
      })

      const price = await page.evaluate(() => {
          return Array.from(document.getElementsByClassName('offer-price__number')).map((el:any) => {
              return el.textContent
          });
      })

    //   console.log(price)

      const equipment = await page.evaluate(() => {
        return Array.from(document.getElementsByClassName('offer-features__item')).map((el:any) => {
          return el.textContent.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, '');
        });
    })


      for( let i = 0; i < values.length; i++){
          result[labels[i]] = values[i].replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, '');
      }

      await browser.close();
      console.log('res: ', result)
      
      if(Object.entries(result).length === 0){
          return { Error: 'Something went wrong' }
      }

      result['location'] = location[0].replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, '');
      result['price'] = price[0]?.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, '');
      result['images'] = photos.map((image:string)=>{
          return image?.split(';')?.[0]
      });

      const bracketsRegExp = /\((.*)\)/; 

      console.log('RESULT : ------ : ---- :', result);
      let car = convertScrappedDataToCar(result, link);
      const generationPeriod = (result['Generacja'] || '').match(bracketsRegExp)?.[1];

      const engine = await findEngineByCharacteristics(result['Moc'], result['Pojemność skokowa'], result['Rodzaj paliwa'], result['Wersja'])
      const carGeneration = await findCarName(result['Marka pojazdu'], result['Model pojazdu'], result['Generacja'], generationPeriod?.split('-')?.[0], generationPeriod?.split('-')?.[1])
     


      car!['engine_id'] = engine.id
      car!['CarGeneration'] = carGeneration;

      console.log('CAR: ------ : - -: ', car);
      return car
  } else {
      return { Error: 'No link found' }
  }
}

