import Image from 'next/image'
import spinner from '../../public/preloader.gif'

export const Loading = () => {
  return (
    <section className='flex flex-col items-center justify-center p-4'>
      <Image
        src={spinner}
        alt='Loading'
        width={spinner.width / 2}
        height={spinner.height / 2}
      />
      <h1 className='mt-8 mb-8 text-xl font-bold'>
        Obteniendo datos, espere...
      </h1>
    </section>
  )
}
