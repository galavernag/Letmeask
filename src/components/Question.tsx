import UserInfo from "./UserInfo";
import cx from 'classnames'
import '../styles/question.scss'

interface QuestionProps {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: React.ReactNode
  isAnswered?: boolean
  isHighlighted?: boolean
}

function Question({ 
  author, 
  content, 
  children, 
  isAnswered = false, 
  isHighlighted = false 
}: QuestionProps) {
  return (
    <div 
      className={cx('question', { answered: isAnswered, highlighted: isHighlighted && !isAnswered })}
    >
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