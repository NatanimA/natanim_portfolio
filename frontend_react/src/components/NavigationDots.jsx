import React from 'react'


const NavigationDots = ({ active }) => {
  return (

    <div className='app__navigation'>
        {['home','about','work','skills','testimonials','contact'].map((item,index) => (
          // eslint-disable-next-line
            <a
            key={item + index}
            href={`#${item}`}
            className='app__navigation-dot'
            style={active === item ? {backgroundColor:'#313BAC'} : {}}
            />

        ))}
    </div>
  )
}

export default NavigationDots
