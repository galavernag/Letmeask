import React, { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOutlined?: boolean
}

function Button({ isOutlined = false, ...rest }: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...rest}
    />
  )
}

export default Button