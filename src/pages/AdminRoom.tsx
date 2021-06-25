import { FormEvent, useState } from "react"
import { useParams } from "react-router-dom"
import { Logo } from "../assets"
import { Button, Question, RoomCode, UserInfo } from "../components"
import { useAuth } from "../contexts/AuthContext"
import { database } from "../services/firebase"
import toast, { Toaster } from 'react-hot-toast'

import '../styles/room.scss'
import useRoom from "../hooks/useRoom"

interface RoomParams {
  id: string
}


function AdminRoom() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id
  const { questions, title } = useRoom({ roomId })

  const [newQuestion, setNewQuestion] = useState('')
 
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      toast.error('Tente escrever algo')
      return
    }

    if (!user) {
      toast.error('Lembre-se de se autenticar no Letmeask')
      return
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

    try {
      await database.ref(`rooms/${roomId}/questions`).push(question)
      setNewQuestion('')
      toast.success('Pergunta enviada')
    } catch (err) {
      toast.error('Houve algum erro durante o envio')
    }
  }

  return (
    <div id="page-room">
      <Toaster position='top-left'/>
      <header>
        <div className="content">
          <img src={Logo} alt="Letmeask" />
          <div>
          <RoomCode roomCode={roomId} />
          <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala - {title}</h1>
          {questions.length > 0 && (
            <>
              {questions.length > 1 ? (
                <span>{questions.length} perguntas</span>
              ) : (
                <span>{questions.length} pergunta</span>
              )}
            </>
          )}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question key={question.id} author={question.author} content={question.content}/>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default AdminRoom