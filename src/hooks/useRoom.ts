import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { database } from "../services/firebase"

interface QuestionProps {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  hasLiked: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean
  isHighlighted: boolean
  likes: Record<string, {
    authorId: string
  }>
}>

interface HookProps {
  roomId: string
}

function useRoom({ roomId }: HookProps) {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionProps[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', (room) => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.isAnswered,
          isHighlighted: value.isHighlighted,
          likeCount: Object.values(value.likes ?? {}).length,
          hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return {
    questions,
    title
  }
}

export default useRoom