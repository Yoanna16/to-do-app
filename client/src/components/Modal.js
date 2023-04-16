import React, { useState } from 'react'

const Modal = ({ mode, setShowModal, getData, task }) => {
  const editMode = mode === 'edit' ? true : false; 

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : 'yoanna.text.com',
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  })

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
      })
      console.log('worked')
      if (response.status === 200) {
        console.log('WORKED');
        setShowModal(false);
        getData();
      }
    } catch(err) {
      console.error(err);
    }
  }

  const editData = async (e) => {
    e.preventDefault();
    try {
     const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(data)
      })
      console.log('worked')
      if (response.status === 200) {
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  }




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
          <button onClick={() => setShowModal(false)}>X</button>
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
          onClick={editMode ? editData : postData}
          /> 
        </form>


      </div>
    </div>
  )
}

export default Modal
