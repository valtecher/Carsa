import './carousel.scss'
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2.4,
  slidesToScroll: 1,
  centerMode: true
};

interface ICarouselProps {
  images: Array<string>,
  infinite?:boolean,
  slidesToShow?: number,
}

const Carousel = (props:ICarouselProps) => {
  const  { images } = props;
  
  return(
    <div>
      <Slider {...settings}>
          { images.map((image:string, index: number) => {
            return (
              <div className='editCar-carousel' style={{ width: 400, height: 400 }} key={index} >
                <img style={{ height: '25vh', width: 'auto', borderRadius: 20 }} src={image} alt="car image" />
              </div>
              )})}
      </Slider>
    </div>
  )
}
export default Carousel;