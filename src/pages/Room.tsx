import { FormEvent, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Avatar, Logo } from "../assets"
import { Button, RoomCode } from "../components"
import { useAuth } from "../contexts/AuthContext"
import { database } from "../services/firebase"

import '../styles/room.scss'

interface RoomParams {
  id: string
}

function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id

  const [newQuestion, setNewQuestion] = useState('')

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('Por favor, faça a autenticação')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={Logo} alt="Letmeask" />
          <RoomCode roomCode={roomId} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>
        <form>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />

          <div className="form-footer">
            {!user ? (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            ) : (
              <div className="user-info">
                <img src={ !user.avatar ? Avatar : user.avatar } alt={user.name} />
                <span>{user.name}</span>
              </div>
            )}
            <Button
              type="submit"
              onClick={handleSendQuestion}
              disabled={!user}
            >
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Room