import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel = () => {
  return (
    <div className='max-w-[800px]'>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
      >
        <div>
          <img src={require('../../assets/slider/1.jpg')} alt='' />
        </div>
        <div>
          <img src={require('../../assets/slider/2.jpg')} alt='' />
        </div>
        <div>
          <img src={require('../../assets/slider/3.jpg')} alt='' />
        </div>
        <div>
          <img src={require('../../assets/slider/4.jpg')} alt='' />
        </div>
        <div>
          <img src={require('../../assets/slider/5.jpg')} alt='' />
        </div>
      </Carousel>
    </div>
  );
};
export default ImageCarousel;
