import React, { useState,useEffect} from 'react'
import { motion } from 'framer-motion'

import { AppWrap,MotionWrap } from '../../wrapper'
import { client,urlForm } from '../../client'

import './Skills.scss'
const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
      const query = '*[_type == "experiences"]'
      const skillsQuery = '*[_type == "skills"]'
      client.fetch(query).then(data => {
        setExperiences(data);
      }).catch(err => err);

      client.fetch(skillsQuery).then(data => {
        setSkills(data);
      }).catch(err => err)

  }, [])

  return (
    <>
      <h2 className='head-text'>Skills & Experience</h2>
      <div className='app__skills-container'>
          <motion.div className='app__skills-list'>
              {skills?.map((skill) => (
                <motion.div
                  whileInView={{opacity:[0,1]}}
                  transition={{duration:0.5}}
                  className='app__skills-item app__flex'
                  key={skill.name}
                >
                    <div className='app__flex' style={{backgroundColor: skill.bgColor}}>
                        <img src={urlForm(skill.icon).url()} alt={skill.name} />
                    </div>
                    <p className='p-text'>{skill.name}</p>

                </motion.div>
              ))}
          </motion.div>
          <motion.div className='app__skills-exp'>
                { experiences?.map((exp) => (
                  <motion.div
                    key={exp.year}
                    className="app__skills-exp-item"
                  >
                      <div className='app__skills-exp-year'>
                          <p className='bold-text'>{exp.year}</p>
                      </div>
                      <motion.div
                        className='app__skills-exp-works'>
                            {exp.works?.map((work) => (

                                <div key={work.name}><motion.div
                                whileInView={{ opacity: [0, 1] }}
                                transition={{ duration: 0.5 }}
                                className="app__skills-exp-work"
                                data-tip
                                data-for={work.name}

                              >
                                <h4 className='bold-text'>{work.name}</h4>
                                <p className='p-text'>{work.company}</p>
                                <p className='p-text'>{work.desc}</p>
                              </motion.div>
                              </div>

                            ))}
                      </motion.div>
                  </motion.div>
                ))}
          </motion.div>
      </div>
    </>
  )
}

export default AppWrap(MotionWrap(Skills,'app__skills'),'skills','app__whitebg')
