import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Illustration, Logo } from '../assets'
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/firebase';

import '../styles/auth.scss'

function NewRoom() {
  const { user } = useAuth()
  const [room, setRoom] = useState('')

  const history = useHistory()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (room.trim() === "") {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: room,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={Illustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo.</strong>
        <p>Tire dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={Logo} alt="Let me ask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Nome da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}

export default NewRoom