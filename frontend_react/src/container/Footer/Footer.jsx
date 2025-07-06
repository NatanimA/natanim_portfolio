import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineMail, AiOutlinePhone, AiOutlineSend, AiOutlineCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FiCoffee, FiMessageSquare, FiUser, FiMail } from 'react-icons/fi'
import { BsChat, BsHeart } from 'react-icons/bs'

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'

import './Footer.scss'

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')

  const { name, email, message } = formData;

  const handleChangeInput = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const isEmail = (str) => {
    return emailRegex.test(str);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, message, email } = formData
    if (name.length < 1 || message.length < 1) return
    if (!isEmail(email)) return
    setLoading(true)

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact).then(() => {
      setLoading(false)
      setIsFormSubmitted(true)
    }).catch(err => {
      setLoading(false)
      console.error('Error submitting form:', err)
    })
  }

  const contactInfo = [
    {
      icon: <AiOutlineMail />,
      title: 'Email',
      value: 'Natanimabesha@gmail.com',
      link: 'mailto:natanimabesha@gmail.com',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      img: images.email
    },
    {
      icon: <AiOutlinePhone />,
      title: 'Phone',
      value: '+25192352697',
      link: 'tel:+25192352697',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      img: images.mobile
    }
  ]

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.3 }
    }
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  }

  return (
    <div className="app__footer-enhanced">
      {/* Floating Background Elements */}
      <div className="app__footer-bg-elements">
        <motion.div 
          className="app__footer-floating-coffee"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <FiCoffee />
        </motion.div>
        <motion.div 
          className="app__footer-floating-chat"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <BsChat />
        </motion.div>
      </div>

      {/* Header Section */}
      <motion.div 
        className="app__footer-header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="app__footer-title-wrapper"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="app__footer-coffee-icon"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <FiCoffee />
          </motion.div>
          <h2 className='head-text'>
            Take a <span>coffee</span> & <span>chat</span> with me.
          </h2>
        </motion.div>
        <p className="app__footer-subtitle">
          ☕ Let's discuss your next amazing project
        </p>
      </motion.div>

      {/* Contact Cards */}
      <motion.div 
        className='app__footer-cards'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {contactInfo.map((contact, index) => (
          <motion.div
            key={contact.title}
            className='app__footer-card'
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 + index * 0.2 }}
            whileHover={{ 
              y: -10,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <div className="app__footer-card-inner">
              <motion.div 
                className="app__footer-card-icon"
                style={{ background: contact.gradient }}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.6 }
                }}
              >
                {contact.icon}
              </motion.div>
              
              <div className="app__footer-card-content">
                <h4>{contact.title}</h4>
                <motion.a 
                  href={contact.link} 
                  className='p-text'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {contact.value}
                </motion.a>
              </div>
              
              <motion.div 
                className="app__footer-card-bg-icon"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <img src={contact.img} alt={contact.title} />
              </motion.div>
              
              <div className="app__footer-card-glow"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Form or Success Message */}
      <AnimatePresence mode="wait">
        {!isFormSubmitted ? (
          <motion.form 
            className='app__footer-form'
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onSubmit={handleSubmit}
          >
            <div className="app__form-header">
              <motion.div 
                className="app__form-icon"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <FiMessageSquare />
              </motion.div>
              <h3>Let's Start a Conversation</h3>
              <p>I'd love to hear about your project</p>
            </div>

            <div className="app__form-fields">
              <motion.div 
                className={`app__form-field ${focusedField === 'name' ? 'focused' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="app__form-field-icon">
                  <FiUser />
                </div>
                <input 
                  className='p-text' 
                  type='text' 
                  name='name' 
                  placeholder='Your Name' 
                  value={name} 
                  onChange={handleChangeInput}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <div className="app__form-field-border"></div>
              </motion.div>

              <motion.div 
                className={`app__form-field ${focusedField === 'email' ? 'focused' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="app__form-field-icon">
                  <FiMail />
                </div>
                <input 
                  className='p-text' 
                  type='email' 
                  name="email" 
                  placeholder='Your Email' 
                  value={email} 
                  onChange={handleChangeInput}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <div className="app__form-field-border"></div>
              </motion.div>

              <motion.div 
                className={`app__form-field app__form-field-textarea ${focusedField === 'message' ? 'focused' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="app__form-field-icon">
                  <FiMessageSquare />
                </div>
                <textarea
                  className='p-text'
                  placeholder='Your Message'
                  value={message}
                  name="message"
                  onChange={handleChangeInput}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField('')}
                  required
                />
                <div className="app__form-field-border"></div>
              </motion.div>
            </div>

            <motion.button 
              type='submit' 
              className='app__form-submit-btn'
              disabled={loading}
              whileHover={{ 
                scale: loading ? 1 : 1.05,
                y: loading ? 0 : -2
              }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="app__btn-content"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <AiOutlineLoading3Quarters />
                    </motion.div>
                    <span>Sending Message...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="app__btn-content"
                  >
                    <AiOutlineSend />
                    <span>Send Message</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        ) : (
          <motion.div 
            className="app__footer-success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div 
              className="app__success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.6 }}
            >
              <AiOutlineCheckCircle />
            </motion.div>
            
            <motion.div 
              className="app__success-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className='head-text'>
                Thank you for <span>getting in touch!</span>
              </h3>
              <p className="app__success-message">
                Your message has been sent successfully. I'll get back to you <span>soon</span>! ☕
              </p>
              
              <motion.div 
                className="app__success-heart"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <BsHeart />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AppWrap(MotionWrap(Footer, 'app__footer'), 'contact', 'app__whitebg')
