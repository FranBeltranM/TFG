import { Logo } from './Logo'

// const getLastInsertBBDD = () => {
//   return moment().format('YYYY-MM-DD')
// }

export function Header ({ date }) {
  return (
    <header className='grid grid-cols-2 items-center gap-2 p-8 justify-items-center'>
      <Logo />
      <small>
        Proyecto de Fin de Grado - Francisco Jesús Beltrán Moreno ©
      </small>
      <small>
        Fecha de la BBDD: { date }
      </small>
    </header>
  )
}
