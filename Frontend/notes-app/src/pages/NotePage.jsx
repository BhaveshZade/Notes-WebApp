import React, {useEffect, useState} from 'react'
// import notes from '../assets/data'

import { useParams, Link, useNavigate } from 'react-router-dom'
import {ReactComponent as   ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = (props) => {
  let [note, setNote] = useState()
  let navigate = useNavigate()
  let noteId = useParams().id

  useEffect(() => {
    getNote()
  },[noteId])

  let getNote = async() => {
    if(noteId === 'new') return
    let response = await fetch(`http://127.0.0.1:8000/base/note/${noteId}`)
    let data = await response.json()
    setNote(data)
  }

  let createNote = async() => {
    await fetch(`http://127.0.0.1:8000/base/create/`,{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({...note, 'updated' : new Date()})
    }
    )
  }

  let updateNote = async() => {
    await fetch(`http://127.0.0.1:8000/base/update/${noteId}`,{
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({...note, 'updated' : new Date()})
    }
    )
  }

  let deleteNote = async() => {
    await fetch(`http://127.0.0.1:8000/base/delete/${noteId}`,{
      method : 'DELETE',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(note)
    }
    )
    navigate('/')
  }

  let handleSubmit = () => {
    if(noteId !== 'new' && !note.body){
      deleteNote()
    }
    else if(noteId !== 'new'){
      updateNote()
    }
    else if(noteId === 'new' && note !== null){
      createNote()
    }
    navigate('/')
  }

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to= "/">
            <ArrowLeft onClick = {handleSubmit}/>
          </Link>
        </h3>
        {noteId !== 'new' ? (
          <button onClick = {deleteNote } style={{'font-size' : '30px', 'padding-right' : '10px'}}>&#128465;</button>
        ) : (
          <button onClick = {handleSubmit } style={{'font-size' : '40px', 'padding-right' : '10px'}}>&#10003;</button>
        )}
        
      </div>
       <textarea onChange = {(e) => {setNote({...note, 'body' : e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage