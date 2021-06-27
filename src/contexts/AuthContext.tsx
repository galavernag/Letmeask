import firebase from 'firebase';
import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../services/firebase';

import { UserProps } from '../../@types/User'

interface ProviderProps {
  children: React.ReactNode
}

interface ContextData {
  user: UserProps | undefined
  signInWithGoogle: () => Promise<void>
}

const Context = createContext({} as ContextData)

export function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<UserProps>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Googal Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Googal Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }

  }

  return (
    <Context.Provider value={{
      signInWithGoogle,
      user
    }}>
      {children}
    </Context.Provider>
  )
}

export function useAuth() {
  return useContext(Context)
}