import React, { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss'

function Button({ ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className='button' {...rest}></button>
  )
}

export default Button