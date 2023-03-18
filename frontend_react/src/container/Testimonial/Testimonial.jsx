import React, { useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import { client,urlForm} from '../../client'
import { AppWrap,MotionWrap} from '../../wrapper'
import './Testimonial.scss'

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials,setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const queryTestimonials = '*[_type == "testimonials"]';
    const queryBrands ='*[_type == "brands"]';

    client.fetch(queryTestimonials).then(data => {
      setTestimonials(data)
    }).catch(err => err)

    client.fetch(queryBrands).then(data => {
      setBrands(data)
    }).catch(err => err)
  }, [])

  const test = testimonials[currentIndex]

  const handleClick = (index) => {
    setCurrentIndex(index);
  }

  return (
    <>
      <div style={{marginBottom:20}}>
        <h2 className='head-text'><span>Testimonials</span></h2>
        <p className='p-text'>WHAT MY PREVIOUS CLIENTS SAY ABOUT MY WORK</p>
      </div>
      {testimonials.length && (
        <>
          <div className='app__testimonial-item app__flex' key={testimonials[currentIndex]._id}>
              <img src={urlForm(test.imageurl).url()} alt="testimonials" />
              <div className="app__testimonial-content">
                <p className="p-text" style={{fontSize:18}}>{test.feedback}</p>
                <div>
                  <h4 className="bold-text">{test.name}</h4>
                  <h5 className="p-text">{test.company}</h5>
                </div>
              </div>
          </div>
          <div className="app__testimonials-btns app__flex">
              <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length-1 : currentIndex - 1)}>
                  <HiChevronLeft />
              </div>
              <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length-1 ? 0 : currentIndex + 1)}>
                  <HiChevronRight />
              </div>
          </div>
        </>
      )}

      <div className="app__testimonials-brands app__flex">
          {brands.map((brand) => (
            <motion.div
              whileInView={{opacity:[0,1]}}
              transition= {{duration:0.5,type:'tween'}}
              key={brand._id}
            >
                <img src= {urlForm(brand.imgUrl).url()} alt={brand.name} />
            </motion.div>
          ))}
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Testimonial,'app__testimonial'),'testimonials','app__primarybg')
