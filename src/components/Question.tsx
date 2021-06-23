import UserInfo from "./UserInfo";
import '../styles/question.scss'

interface QuestionProps {
  content: string
  author: {
    name: string
    avatar: string
  }
}

function Question({ author, content }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <UserInfo user={author} />
        <div></div>
      </footer>
    </div>
  )
}

export default Question