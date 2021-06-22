import React from 'react';

import { GoogleIcon, Illustration, Logo } from '../assets'
import { Button } from '../components';

import '../styles/auth.scss'

function Home() {
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
          <button className='create-room'>
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

export default Home