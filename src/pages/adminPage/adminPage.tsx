import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import './admin.css'

type NavElementProps = {
  name: string;
}

const NavElement = (props: NavElementProps) => {
  return (
    <div className='navElement'>{props.name}</div>
  )
}

export function Admin() {
  return (
    <div className='container'>
      <div className='header'>
        <div className='header-left'>
          <img className='logo' src="src\assets\Pizza (1).svg" alt="" />
          <div className='nav'>
            <NavElement name='Пиццы'/>
            <NavElement name='Комбо'/>
            <NavElement name='Напитки'/>
            <NavElement name='Закуски'/>
          </div>
        </div>
        <div className='addButton'>Добавить</div>
      </div>
    </div>
  )
}
