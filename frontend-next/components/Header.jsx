import useDateLastInsert from './hooks/useDateLastInsert'
import { Logo } from './Logo'

export function Header() {
  const fecha = useDateLastInsert()

  return (
    <header className='grid grid-cols-2 items-center justify-items-center gap-2 p-8'>
      <Logo />
      <small>Proyecto de Fin de Grado - Francisco Jesús Beltrán Moreno ©</small>
      <small>Fecha de la BBDD: {fecha}</small>
    </header>
  )
}
