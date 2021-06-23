import React from 'react';
import { useHistory } from 'react-router-dom';

import { GoogleIcon, Illustration, Logo } from '../assets'
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext';

import '../styles/auth.scss'

function Login() {
  const history = useHistory()

  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/create-room')
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={Illustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo.</strong>
        <p>Tire dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={Logo} alt="Let me ask" />
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={GoogleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login