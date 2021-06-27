import { Copy } from "../assets"
import '../styles/room-code.scss'

interface RoomCodeProps {
  roomCode: string
}

function RoomCode({ roomCode }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(roomCode)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={Copy} alt="Copiar código da sala" />
      </div>
      <span>Sala {roomCode}</span>
    </button>
  )
}

export default RoomCode