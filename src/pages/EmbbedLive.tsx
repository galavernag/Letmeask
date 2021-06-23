import { UserInfo } from "../components"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import '../styles/embbed-live.scss'


interface RoomParams {
  id: string
}

interface Question {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

function EmmbedLive() {
  const params = useParams<RoomParams>()
  const roomId = params.id

  const [question, setQuestion] = useState<Question | undefined>()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', (room) => {
      const { questions } = room.val()

      const question: Question = questions

      const parsedQuestions = Object.entries(question).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted
        }
      })

      const highlightedQuestion = parsedQuestions.find(question => question.isHighlighted === true)

      setQuestion(highlightedQuestion)
    })
  }, [roomId])

  return (
    <>
      {question ? (
        <div id="embbed-main">
          <span>
            Pergunta atual
          </span>
          <p>
            {question.content}
          </p>
          <UserInfo user={question.author} />
        </div>
      ) : null}
    </>
  )
}

export default EmmbedLive