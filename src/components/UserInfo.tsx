import { UserProps } from "../../@types/User"
import { Avatar } from "../assets"
import '../styles/user-info.scss'

interface UserInfoProps {
  user: UserProps
}

function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="user-info">
      <img src={!user.avatar ? Avatar : user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  )
}

export default UserInfo