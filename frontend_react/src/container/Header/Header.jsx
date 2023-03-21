import React from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants'
import { AppWrap } from '../../wrapper';

import './Header.scss'

const scaleVariants = {
  whileInView: {
    scale: [0,1],
    opacity:[0,1],
    transition: {
      duration:1,
      ease:'easeInOut'
    }
  }
}

const Header = () => {
  return (
    <div className='app__header app__flex'>
        <motion.div
          whileInView={{x:[-10,0],opacity:[0,1]}}
          transition={{ duration:2}}
          className='app__header-info'
        >
            <div className='app__header-badge'>
                <div className='badge-cmp app__flex'>
                    <span>👋</span>
                    <div style={{marginLeft:20}}>
                        <p className='p-text'>Hello, I am</p>
                        <h1 className='head-text'>Natanim</h1>
                        <p className='p-text'>Full-stack Developer</p>
                        <p className='p-text'>Freelancer</p>
                    </div>
                </div>
                <a href='https://drive.google.com/file/d/1lfGurtzl-vEsxNsA6fZtmaSJlNrhWv7d/view?usp=sharing' target='_blank' rel='noreferrer'>
                    <motion.div
                      whileInView={{opacity:1}}
                      whileHover={{scale:1.1}}
                      transition={{duration:0.5,type:'tween'}}
                      className="app__profile-item"
                    >
                    <div className='tag-cmp app__flex resume-cmp'>
                      <h4 className='head-text'>RESUME</h4>
                    </div>
                </motion.div>
                </a>
            </div>

        </motion.div>
        <motion.div
          whileInView={{opacity:[0,1]}}
          transition={{ duration:2,delayChildren:0.5}}
          className='app__header-img'
        >
          <img className='app__header-profile' src={images.profile} alt="profile"/>
          <motion.img
            whileInView={{scale:[0,1]}}
            transition={{ duration:1, ease:'easeInOut'}}
            src={images.circle}
            alt="profile_circle"
            className='overlay_circle'
          />
        </motion.div>

        <motion.div
          variants={scaleVariants}
          whileInView= {scaleVariants.whileInView}
          className='app__header-circles'
        >
          {[images.spring,images.angular,images.rails,images.next,images.graphql].map((circle,index) => (
            <div className='circle-cmp app__flex' key={`circle-${index}`}>
                <img src={circle} alt="circle"/>
            </div>
          ))}

        </motion.div>
    </div>
  )
}

export default AppWrap(Header, 'home')
