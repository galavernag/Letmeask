import { FormEvent, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Delete, Logo } from "../assets"
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
  const history = useHistory()

  const [newQuestion, setNewQuestion] = useState('')

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja apagar essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  useEffect(() => {
    async function run() {
      const roomRef = database.ref(`rooms/${roomId}`)

      const { authorId } = (await roomRef.get()).val()

      console.log(authorId)
      console.log(user?.id)

      if (!user?.id === authorId) {
        window.alert('Você não tem permisões para acessar essa página')

        history.push(`/rooms/${roomId}`)
      }
    }

    run()
  }, [history, roomId, user?.id])

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
              <Question 
                key={question.id} 
                author={question.author} 
                content={question.content}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={Delete} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default AdminRoom