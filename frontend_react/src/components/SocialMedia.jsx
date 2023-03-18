import React from 'react'
import { BsTwitter } from 'react-icons/bs'
import { FaGithub,FaLinkedin,FaHackerrank } from 'react-icons/fa'
const SocialMedia = () => {
  return (
    <div className='app__social'>
        <div>
            <a href='https://twitter.com/Natanim_' target='_blank' rel="noreferrer">
                <BsTwitter />
            </a>
        </div>
        <div>
            <a href='https://github.com/natanima' target='_blank' rel="noreferrer">
                <FaGithub />
            </a>
        </div>
        <div>
            <a href='https://www.linkedin.com/in/natanim-abesha/' target='_blank' rel="noreferrer">
                <FaLinkedin />
            </a>
        </div>
        <div>
            <a href='https://www.hackerrank.com/natanimabesha' target='_blank' rel="noreferrer">
                <FaHackerrank />
            </a>
        </div>
    </div>
  )
}

export default SocialMedia
