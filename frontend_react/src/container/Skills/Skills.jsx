import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineTrophy, AiOutlineRocket } from 'react-icons/ai'
import { FiMapPin, FiStar, FiTrendingUp } from 'react-icons/fi'

import { AppWrap, MotionWrap } from '../../wrapper'
import { client, urlForm } from '../../client'

import './Skills.scss'

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]'
    const skillsQuery = '*[_type == "skills"]'
    
    client.fetch(query).then(data => {
      // Custom sorting function to handle dates properly
      const sortedExperiences = data.sort((a, b) => {
        // Extract year from strings like "Dec 2020", "Jun 2022", etc.
        const getYear = (yearStr) => {
          const match = yearStr.match(/(\d{4})/);
          return match ? parseInt(match[1]) : 0;
        };
        
        const yearA = getYear(a.year);
        const yearB = getYear(b.year);
        
        // Sort in descending order (most recent first)
        return yearB - yearA;
      });
      
      setExperiences(sortedExperiences);
    }).catch(err => console.error('Experience fetch error:', err));

    client.fetch(skillsQuery).then(data => {
      setSkills(data);
    }).catch(err => console.error('Skills fetch error:', err))
  }, [])

  const skillVariants = {
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

  const cardVariants = {
    hiddenLeft: { 
      opacity: 0, 
      x: -100, 
      y: 50,
      scale: 0.8 
    },
    hiddenRight: { 
      opacity: 0, 
      x: 100, 
      y: 50,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const milestoneVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  // Calculate global index for alternating pattern
  let globalWorkIndex = 0;

  return (
    <div className="app__skills-journey">
      {/* Header Section */}
      <motion.div 
        className="app__skills-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='head-text'>My Professional <span>Journey</span></h2>
        <p className="app__skills-subtitle">
          🚀 Follow my path through technology and experience
        </p>
      </motion.div>

      {/* Skills Constellation */}
      <motion.div 
        className="app__skills-constellation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <h3 className="app__constellation-title">
          <FiStar className="title-icon" />
          Technology Arsenal
        </h3>
        <div className='app__skills-grid'>
          {skills?.map((skill, index) => (
            <motion.div
              key={skill.name}
              className='app__skill-orbit'
              variants={skillVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.15,
                rotate: 360,
                transition: { duration: 0.6 }
              }}
            >
              <div 
                className='app__skill-planet'
                style={{
                  background: `linear-gradient(135deg, ${skill.bgColor || '#667eea'}, ${skill.bgColor ? skill.bgColor + '80' : '#764ba2'})`
                }}
              >
                <img src={urlForm(skill.icon).url()} alt={skill.name} />
                <div className="app__skill-ring"></div>
              </div>
              <p className='app__skill-name'>{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div 
        className="app__experience-timeline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <h3 className="app__timeline-title">
          <FiMapPin className="title-icon" />
          Professional Journey
        </h3>
        
        <div className="app__timeline-container">
          <div className="app__timeline-items">
            {experiences?.map((exp, expIndex) => (
              <motion.div 
                key={exp.year}
                className="app__timeline-year-group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: expIndex * 0.2, duration: 0.8 }}
              >
                {/* Year Milestone */}
                <motion.div 
                  className="app__timeline-milestone"
                  variants={milestoneVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + expIndex * 0.2 }}
                >
                  <motion.div 
                    className="app__milestone-marker"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <AiOutlineCalendar />
                  </motion.div>
                  <motion.div 
                    className="app__milestone-year"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {exp.year}
                  </motion.div>
                </motion.div>

                {/* Experience Cards */}
                <div className="app__timeline-experiences">
                  {exp.works?.map((work, workIndex) => {
                    // Use global index for true alternating pattern
                    const isEven = globalWorkIndex % 2 === 1;
                    globalWorkIndex++; // Increment global counter
                    
                    return (
                      <motion.div
                        key={`${work.name}-${globalWorkIndex}`}
                        className={`app__experience-card ${isEven ? 'card-right' : 'card-left'}`}
                        variants={cardVariants}
                        initial={isEven ? "hiddenRight" : "hiddenLeft"}
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                          delay: 0.6 + workIndex * 0.2,
                          duration: 0.8,
                          ease: "easeOut"
                        }}
                        whileHover={{ 
                          scale: 1.03,
                          y: -12,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className="app__experience-header">
                          <motion.div 
                            className="app__experience-icon"
                            whileHover={{ 
                              rotate: 5,
                              scale: 1.1,
                              transition: { duration: 0.3 }
                            }}
                          >
                            <AiOutlineRocket />
                          </motion.div>
                          <div className="app__experience-title">
                            <h4>{work.name}</h4>
                            <p className="app__experience-company">
                              <AiOutlineEnvironment />
                              {work.company}
                            </p>
                          </div>
                          <motion.div 
                            className="app__experience-badge"
                            whileHover={{ 
                              rotate: -5,
                              scale: 1.1,
                              transition: { duration: 0.3 }
                            }}
                          >
                            <AiOutlineTrophy />
                          </motion.div>
                        </div>
                        
                        <div className="app__experience-content">
                          <ul className="app__experience-achievements">
                            {work?.desc?.length > 0 && work.desc.slice(0, 3).map((desc, descIndex) => (
                              <motion.li 
                                key={desc._key || descIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1 + descIndex * 0.1 }}
                              >
                                <FiTrendingUp className="achievement-icon" />
                                {desc.children?.[0]?.text || desc}
                              </motion.li>
                            ))}
                          </ul>
                          
                          {work?.desc?.length > 3 && (
                            <motion.button 
                              className="app__show-more-btn"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              +{work.desc.length - 3} more achievements
                            </motion.button>
                          )}
                        </div>
                        
                        <div className="app__experience-glow"></div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Journey Stats */}
      <motion.div 
        className="app__journey-stats"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="app__stat-card"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="app__stat-number">{experiences.length}+</div>
          <div className="app__stat-label">Years of Experience</div>
        </motion.div>
        <motion.div 
          className="app__stat-card"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="app__stat-number">{skills.length}+</div>
          <div className="app__stat-label">Technologies Mastered</div>
        </motion.div>
        <motion.div 
          className="app__stat-card"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="app__stat-number">13+</div>
          <div className="app__stat-label">Projects Completed</div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AppWrap(MotionWrap(Skills, 'app__skills'), 'skills', 'app__whitebg')
