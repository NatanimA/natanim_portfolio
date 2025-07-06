import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { AiFillStar } from 'react-icons/ai'
import { BsQuote, BsCheckCircle } from 'react-icons/bs'

import { client, urlForm } from '../../client'
import { AppWrap, MotionWrap } from '../../wrapper'
import './Testimonial.scss'

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const queryTestimonials = '*[_type == "testimonials"]';
    const queryBrands = '*[_type == "brands"]';

    client.fetch(queryTestimonials).then(data => {
      setTestimonials(data)
    }).catch(err => console.error('Testimonials fetch error:', err))

    client.fetch(queryBrands).then(data => {
      setBrands(data)
    }).catch(err => console.error('Brands fetch error:', err))
  }, [])

  // Auto-play testimonials
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000); // Increased from 5000ms to 8000ms (8 seconds)

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const handleClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  }

  const nextTestimonial = () => {
    const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    handleClick(nextIndex);
  }

  const prevTestimonial = () => {
    const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    handleClick(prevIndex);
  }

  const testimonialVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.8 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      x: -100, 
      scale: 0.8,
      transition: { 
        duration: 0.4 
      }
    }
  }

  const brandVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="app__testimonial-journey">
      {/* Header Section */}
      <motion.div 
        className="app__testimonial-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="app__testimonial-title-wrapper">
          <motion.div 
            className="app__testimonial-icon"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <BsQuote />
          </motion.div>
          <h2 className='head-text'>
            Client <span>Testimonials</span>
          </h2>
        </div>
        <p className='app__testimonial-subtitle'>
          🌟 What my clients say about working with me
        </p>
      </motion.div>

      {/* Main Testimonial Display */}
      {testimonials.length > 0 && (
        <div 
          className="app__testimonial-showcase"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="app__testimonial-card"
              variants={testimonialVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="app__testimonial-card-inner">
                <div className="app__testimonial-quote-icon">
                  <BsQuote />
                </div>
                
                <div className="app__testimonial-content">
                  <div className="app__testimonial-text">
                    <p>"{currentTestimonial?.feedback}"</p>
                  </div>
                  
                  <div className="app__testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        <AiFillStar className="star-filled" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="app__testimonial-author">
                  <div className="app__testimonial-avatar">
                    <img 
                      src={urlForm(currentTestimonial?.imageurl).url()} 
                      alt={currentTestimonial?.name}
                    />
                    <div className="app__testimonial-avatar-ring"></div>
                  </div>
                  
                  <div className="app__testimonial-author-info">
                    <h4 className="app__testimonial-name">
                      {currentTestimonial?.name}
                      <BsCheckCircle className="verified-icon" />
                    </h4>
                    <p className="app__testimonial-company">
                      {currentTestimonial?.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="app__testimonial-navigation">
            <motion.button
              className="app__testimonial-nav-btn prev"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <HiChevronLeft />
            </motion.button>

            <div className="app__testimonial-dots">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`app__testimonial-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleClick(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>

            <motion.button
              className="app__testimonial-nav-btn next"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <HiChevronRight />
            </motion.button>
          </div>
        </div>
      )}

      {/* Trusted Brands Section */}
      <motion.div 
        className="app__testimonial-brands"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="app__brands-header">
          <h3 className="app__brands-title">
            🤝 Trusted by Many
          </h3>
        </div>
        
        <div className="app__brands-showcase">
          <div className="app__brands-grid">
            {brands.map((brand, index) => (
              <motion.div
                key={brand._id}
                className="app__brand-item"
                variants={brandVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="app__brand-logo">
                  <img 
                    src={urlForm(brand.imgUrl).url()} 
                    alt={brand.name} 
                  />
                </div>
                <div className="app__brand-glow"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="app__testimonial-stats"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="app__stats-grid">
          <motion.div 
            className="app__stat-item"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="app__stat-number">10+</div>
            <div className="app__stat-label">Happy Clients</div>
          </motion.div>
          <motion.div 
            className="app__stat-item"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="app__stat-number">13+</div>
            <div className="app__stat-label">Projects Delivered</div>
          </motion.div>
          <motion.div 
            className="app__stat-item"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="app__stat-number">5⭐</div>
            <div className="app__stat-label">Average Rating</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default AppWrap(MotionWrap(Testimonial, 'app__testimonial'), 'testimonials', 'app__primarybg')
