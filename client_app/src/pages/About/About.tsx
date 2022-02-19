import './About.scss'
import AstonPhoto from '../../images/HomePage/aston_martin_PNG9.png'
import Header from '../../components/header/Header';

const About = () => {
  return(
    <div className='about'>
      <Header/>
      <div className='about-header'>
          About Us
      </div>
      <div className='about-body'>
         <p>CARSA introduces experiences of mobile valeting services where you can recieve an entire package of full or mini valets, whether it's to protect, polish or wash your car.</p>
          <p>Business began to thrive in April 2021, and has not stopped since. With the dedication, passion and motivation for cars we take pride in every single job we carry out.</p>
          <p>We aim to help car lovers and enthusiasts to keep their cars up to standards and well maintained. If you feel like you have the same passion about looking after your car, you are in the right place.</p>
          <p>A lot of people make big investments in their cars, so why not keep it squeaky clean and treat your car to an occasional valet with Auto Freak Ltd to keep up the good quality of your car.</p>
      </div>
      <div className='about-image'>
        <img src={AstonPhoto}></img>
      </div>
    </div>
  )  
}

export default About;