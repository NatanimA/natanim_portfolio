import React, { useState,useEffect} from 'react'
import { AiFillEye,AiFillGithub, AiOutlineClose } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'

import { AppWrap,MotionWrap } from '../../wrapper'
import { client,urlForm } from '../../client'

import './Work.scss'

const Work = () => {

  const [activeFilter, setActiveFilter] = useState('All')
  const [animateCard, setAnimateCard] = useState({y:0,opacity:1})
  const [tags, setTags] = useState([])
  const [works, setWorks] = useState([])
  const [filterWorks, setFilterWorks] = useState([])
  const [selectedWork, setSelectedWork] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then( data => {
      setWorks(data);
      let tag = []
      data.forEach( item => {
        let prevTag = tag
        tag = [...prevTag,...item.tags]
      });

      function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
      }
      tag = removeDuplicates(tag)
      setTags(tag)
      setFilterWorks(data);
    })
  }, [])

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{y:100,opacity:0}])

    setTimeout(() => {
        setAnimateCard([{y:0,opacity:1}])
        if( item === 'All'){
          setFilterWorks(works);
        }else {
          setFilterWorks(works.filter((work) => work.tags.includes(item)))
        }
    },500)
  }

  const openModal = (work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <h2 className='head-text'>My Creative <span>Portfolio</span><br/><span>Section</span></h2>
      
      <div className='app__work-filter'>
        {[...tags,'All'].map((item,index) => (
          <motion.div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{duration:0.5,delayChildren:0.5}}
        className='app__work-portfolio'
      >
          {filterWorks.map((work,index) => (
            <motion.div 
              className='app__work-item app__flex' 
              key={index}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onClick={() => openModal(work)}
            >
                <div className='app__work-img app__flex'>
                    <img src={urlForm(work.imgUrl)} alt={work.title}/>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className='app__work-overlay app__flex'
                    >
                      <motion.div
                        className='app__work-overlay-content'
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>Click to view details</p>
                      </motion.div>
                    </motion.div>
                </div>
                <div className='app__work-content app__flex'>
                    <h4 className='bold-text'>{work.title}</h4>
                    <div className="app__work-tags app__flex">
                        {work.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className='app__work-tag'>{tag}</span>
                        ))}
                        {work.tags.length > 2 && (
                          <span className='app__work-tag-more'>+{work.tags.length - 2}</span>
                        )}
                    </div>
                </div>
            </motion.div>
          ))}
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {isModalOpen && selectedWork && (
          <motion.div
            className='app__work-modal-overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className='app__work-modal'
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='app__work-modal-header'>
                <h3>{selectedWork.title}</h3>
                <button className='app__work-modal-close' onClick={closeModal}>
                  <AiOutlineClose />
                </button>
              </div>
              
              <div className='app__work-modal-content'>
                <div className='app__work-modal-image'>
                  <img src={urlForm(selectedWork.imgUrl)} alt={selectedWork.title} />
                </div>
                
                <div className='app__work-modal-info'>
                  <div className='app__work-modal-description'>
                    <h4>Description</h4>
                    <p>{selectedWork.description}</p>
                  </div>
                  
                  <div className='app__work-modal-tags'>
                    <h4>Technologies</h4>
                    <div className='app__work-modal-tags-list'>
                      {selectedWork.tags.map((tag, index) => (
                        <span key={index} className='app__work-modal-tag'>{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className='app__work-modal-actions'>
                    {selectedWork.projectLink && (
                      <motion.a
                        href={selectedWork.projectLink}
                        target="_blank"
                        rel='noreferrer'
                        className='app__work-modal-btn primary'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AiFillEye />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    
                    {selectedWork.codeLink && (
                      <motion.a
                        href={selectedWork.codeLink}
                        target="_blank"
                        rel='noreferrer'
                        className='app__work-modal-btn secondary'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AiFillGithub />
                        <span>Source Code</span>
                      </motion.a>
                    )}
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
  MotionWrap(Work,'app__work'),
  'work',
  'app_primarybg')
