// https://stackoverflow.com/questions/68590184/tailwind-css-make-footer-always-stay-at-bottom-of-page

export function Footer() {
  return (
    <>
      <footer className='flex items-center justify-center p-8 text-xs decoration-gray-100'>
        <a
          className='px-2 underline decoration-dashed decoration-1 underline-offset-4 hover:decoration-violet-400'
          href='https://www.linkedin.com/in/franbelm'
          target='_blank'
          rel='noreferrer'
        >
          Desarrollado por Fco. Jesús Beltrán Moreno
        </a>
        <span className='px-2'>•</span>
        <a
          className='px-2 underline decoration-dashed decoration-1 underline-offset-4 hover:decoration-violet-400'
          href='./'
          target='_blank'
          rel='noreferrer'
        >
          GitHub
        </a>
      </footer>
    </>
  )
}
