import React, { useState } from 'react'

const Modal = () => {

  const [data, setData] = useState({
    
  })

  const mode = 'creaate'; 

  const handleChange = () => {
    console.log('changing')
  }


  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-title-container'>
          <h3>
            Let's {mode} your task
          </h3>
          <button>X</button>
        </div>
        <form>
          <input
          required
          maxLength={30}
          placeholder=' Your task goes here'
          name='title'
          value={''}
          onChange={handleChange}
           /> 
           <br/>
          <label for='range'>Drag to select your current progress</label>
          <input
          required
          type='range'
          min='0'
          max='100'
          id='range'
          name='progress'
          value={''}
          onChange={handleChange}
          /> 
          <input 
          type='submit'
          className={mode}
          /> 
        </form>


      </div>
    </div>
  )
}

export default Modal
