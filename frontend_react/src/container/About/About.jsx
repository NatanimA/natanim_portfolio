import React,{ useState,useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineClose, AiOutlineArrowRight } from 'react-icons/ai'
import { urlForm, client } from '../../client'
import { AppWrap,MotionWrap } from '../../wrapper'

import './About.scss'

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const query = `*[_type == "abouts"]`;
    client.fetch(query).then(data => {
      setAbouts(data)
    }).catch(err => err);
  }, [])

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <div className="app__about-header">
        <h4 className="head-text">
          Bringing <span>innovation</span><br/>
          to the forefront of <span>development</span>
        </h4>
        <div className="app__about-description">
          <p className="p-text">
            As a highly skilled <strong><span>Software engineer</span></strong> and <strong><span>Full-stack developer</span></strong> with over 5 years of experience in the field,
            I have dedicated myself to developing scalable applications for clients around the world.
          </p>
          
          <p className="p-text">
            I enjoy collaborating with clients and team members to deliver innovative solutions that exceed expectations.
            With expertise in a range of programming languages including <strong><span>Java, Python, and JavaScript,</span></strong>
            I have worked on projects spanning various industries from e-commerce to enterprise applications.
          </p>
          
          <div className="app__aws-specialization">
            <h5 className="app__aws-title">☁️ AWS Cloud Architecture Specialist</h5>
            <p className="p-text">
              With <strong><span>over 4+ years of hands-on AWS experience</span></strong>, I specialize in designing and implementing 
              comprehensive cloud solutions including <strong><span>EC2, S3, Lambda, CloudFront CDN, Auto Scaling, Load Balancers, 
              MediaConvert, Transcribe, Translate, and Route53</span></strong> infrastructure management. My cloud expertise enables 
              businesses to build robust, scalable, and cost-effective solutions that drive digital transformation.
            </p>
          </div>
          
          <p className="p-text">
            I am a strong believer in agile methodologies and the power of teamwork.
            My passion for coding and my commitment to delivering exceptional results have earned me an excellent reputation among clients and colleagues alike.
          </p>
          
          <p className="p-text">
            If you're looking for a driven individual who can work collaboratively
            while delivering results at a high level, look no further than me as your <strong><span>Software engineer</span></strong> and <strong><span>Full-stack developer.</span></strong>
          </p>
        </div>
      </div>

      <div className="app__about-services">
        <h4 className='head-text app__services-title'>
          <span>Services</span>
        </h4>
        
        <div className='app__profiles'>
          {abouts.map((about, index) => (
            <motion.div
              key={about._id}
              className="app__profile-item"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -15,
                transition: { duration: 0.3 }
              }}
              onClick={() => openModal(about)}
            >
              <div className="app__profile-img-wrapper">
                <img src={urlForm(about.imgUrl)} alt={about.title}/>
                <div className="app__profile-overlay">
                  <motion.div
                    className="app__profile-overlay-content"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AiOutlineArrowRight />
                    <span>Learn More</span>
                  </motion.div>
                </div>
                <div className="app__profile-shimmer"></div>
              </div>
              
              <div className="app__profile-content">
                <h2 className='bold-text app__profile-title'>{about.title}</h2>
                <p className='p-text app__profile-excerpt'>
                  {about.description ? about.description.substring(0, 80) + '...' : 'Click to learn more about this service'}
                </p>
                <div className="app__profile-cta">
                  <span>Click to explore</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className='app__about-modal-overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className='app__about-modal'
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="app__about-modal-rainbow"></div>
              
              <div className='app__about-modal-header'>
                <h3 className="app__modal-title">{selectedService.title}</h3>
                <button className='app__about-modal-close' onClick={closeModal}>
                  <AiOutlineClose />
                </button>
              </div>
              
              <div className='app__about-modal-content'>
                <div className='app__about-modal-image'>
                  <div className="app__modal-image-frame">
                    <img src={urlForm(selectedService.imgUrl)} alt={selectedService.title} />
                  </div>
                </div>
                
                <div className='app__about-modal-info'>
                  <div className='app__about-modal-description'>
                    <h4 className="app__modal-subtitle">Service Details</h4>
                    <p className="app__modal-text">{selectedService.description || 'Professional service tailored to your needs.'}</p>
                  </div>
                  
                  <div className='app__about-modal-features'>
                    <h4 className="app__modal-subtitle">What You Get</h4>
                    <div className='app__about-modal-feature-list'>
                      <div className="app__feature-item">
                        <span className="app__feature-icon">✨</span>
                        <span>Professional Quality</span>
                      </div>
                      <div className="app__feature-item">
                        <span className="app__feature-icon">⚡</span>
                        <span>Fast Delivery</span>
                      </div>
                      <div className="app__feature-item">
                        <span className="app__feature-icon">🎯</span>
                        <span>Targeted Solutions</span>
                      </div>
                      <div className="app__feature-item">
                        <span className="app__feature-icon">🚀</span>
                        <span>Scalable Architecture</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className='app__about-modal-actions'>
                    <motion.button
                      className='app__about-modal-btn primary'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        closeModal();
                        // Scroll to contact section
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <span>Learn More</span>
                      <AiOutlineArrowRight />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AppWrap(
  MotionWrap(About,'app__about'),
  'about',
  'app__whitebg')
