import React,{ useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import { urlForm, client } from '../../client'
import { AppWrap,MotionWrap } from '../../wrapper'

import './About.scss'



const About = () => {
  const [abouts, setAbouts] = useState([]);
  useEffect(() => {
    const query = `*[_type == "abouts"]`;
    client.fetch(query).then(data => {
      setAbouts(data)
    }).catch(err => err);
  }, [])

  return (
    <>
      <h4 class="head-text">Bringing <span>innovation</span><br></br> to the forefront of <span>development</span></h4>
      <p class="p-text" style={{fontSize:18,marginTop:25}}>
          As a highly skilled <strong><span>Software engineer</span></strong> and <strong><span>Full-stack developer</span></strong> with over 2 years of experience in the field,
          I have dedicated myself to developing scalable applications for clients around the world.
          I enjoy collaborating with clients and team members to deliver innovative solutions that exceed expectations.
          With expertise in a range of programming languages including <strong><span>Java, Python, and JavaScript,</span></strong>
          <br></br>I have worked on projects spanning various industries from e-commerce to enterprise applications.
          <br></br>
          I am a strong believer in agile methodologies and the power of teamwork.
          My passion for coding and my commitment to delivering exceptional results have earned me an excellent reputation among clients and colleagues alike.
          If you're looking for a driven individual who can work collaboratively
          while delivering results at a high level, look no further than me as your <strong><span>Software engineer</span></strong> and <strong><span>Full-stack developer.</span></strong>
      </p>
      <h4 className='head-text' style={{marginTop:20}}><span>Services</span></h4>
      <div id='about' className='app__profiles'>
          {abouts.map((about) => (
            <motion.div
              whileInView={{opacity:1}}
              whileHover={{scale:1.1}}
              transition={{duration:0.5,type:'tween'}}
              className="app__profile-item"
              key={about._id}
            >
                <img src={urlForm(about.imgUrl)} alt={about.title}/>
                <h2 className='bold-text' style={{marginTop:20}}>{about.title}</h2>
                <p className='p-text' style={{marginTop:10}}>{about.description}</p>
            </motion.div>
          ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About,'app__about'),
  'about',
  'app__whitebg')
