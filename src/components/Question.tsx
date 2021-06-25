import UserInfo from "./UserInfo";
import '../styles/question.scss'

interface QuestionProps {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: React.ReactNode
}

function Question({ author, content, children }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <UserInfo user={author} />
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}

export default Question