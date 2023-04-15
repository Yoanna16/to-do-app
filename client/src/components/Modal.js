import React, { useState } from 'react'

const Modal = () => {
  const mode = 'create'; 
  const editMode = mode === 'edit' ? true : false; 

  const [data, setData] = useState({
    user_email: '',
    title: '',
    progress: '',
    date: editMode ? '' : new Date(),
  })


  // do we have to put it in useEffect or only do it when clicking on the submit button
  const handleChange = (e) => {
    const {name, value} = e.target;

    setData(data => ({
      ...data,
      [name]: value
    }))
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
          value={data.title}
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
          value={data.progress}
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
