import Image from 'next/image'
import meme from '../../public/homer-meme.gif'

export const NoResults = () => {
  return (
    <section className='flex flex-col items-center justify-center p-4'>
      <h1 className='mt-8 mb-8 text-2xl font-bold'>
        No disponemos de datos del vehículo.
      </h1>
      <Image
        src={meme}
        alt='Homer Simpson'
        width={meme.width / 2}
        height={meme.height / 2}
      />
    </section>
  )
}
