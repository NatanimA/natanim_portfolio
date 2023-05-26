import React,{ useState } from 'react'

import { images } from '../../constants';
import { AppWrap,MotionWrap } from '../../wrapper'
import { client } from '../../client'

import './Footer.scss'
const Footer = () => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    message:''
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {name,email,message} = formData;

  const handleChangeInput = (event) => {
      const {name,value} = event.target
      setFormData({
        ...formData,
        [name]: value
      })
  }

  const isEmail  = (str) => {
    return emailRegex.test(str); // Use the "test" method to check if the string matches the email regex
  }
  const handleSubmit = (e) => {
    const {name,message,email} =formData
    if(name.length < 1 || message.length < 1) return
    if(!isEmail(email)) return
    setLoading(true)

    const contact = {
      _type:'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact).then(() => {
      setLoading(false)
      setIsFormSubmitted(true)
    })
    
    e.preventDefault()

  }
  return (
    <>
      <h2 className='head-text'>
        Take a <span>coffee</span> & <span>chat</span> with me.
      </h2>
      <div className='app__footer-cards'>
          <div className='app__footer-card'>
              <img src={images.email} alt="email" />
              <a href='mailto:natanimabesha@gmail.com' className='p-text'>Natanimabesha@gmail.com</a>
          </div>
          <div className='app__footer-card'>
              <img src={images.mobile} alt="email" />
              <a href='tel:+25192352697' className='p-text'>+25192352697</a>
          </div>
      </div>
      {!isFormSubmitted ?
      <form className='app__footer-form app__flex'>
          <div className='app__flex'>
              <input className='p-text' type='text' name='name' placeholder='Your Name' value={name} onChange={handleChangeInput} required/>
          </div>
          <div className='app__flex'>
              <input className='p-text' type='email' name="email" placeholder='Your Email' value={email} onChange={handleChangeInput} required/>
          </div>
          <div>
            <textarea
              className='p-text'
              placeholder='Your Message'
              value={message}
              name="message"
              onChange={handleChangeInput}
              required
             />
          </div>
          <button type='submit' className='p-text' onClick={handleSubmit}>{loading ? "Sending Message" : "Send Message"}</button>
      </form>:
      <div>
        <h3 className='head-text'>Thank you for <span>getting in touch.</span></h3><br></br>
        <h4 className='head-text'>I will get back to you <span>SOON.</span></h4>
      </div>
      }
    </>
  )
}

export default AppWrap(MotionWrap(Footer,'app__footer'),'contact','app__whitebg')
