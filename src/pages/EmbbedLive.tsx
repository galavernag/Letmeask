import { UserInfo } from "../components"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import '../styles/embbed-live.scss'
import useRoom from "../hooks/useRoom"


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
  const { questions } = useRoom({ roomId })

  const [question, setQuestion] = useState<Question | undefined>()

  useEffect(() => {
    const highlightedQuestion = questions.find((question: Question) => question.isHighlighted === true)
    setQuestion(highlightedQuestion)
  }, [questions])

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