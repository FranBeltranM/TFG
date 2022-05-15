import Layout from '../components/Layout'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const submitBastidor = async event => {
    event.preventDefault()
    const bastidor = event.target.input_bastidor.value
    router.push({ pathname: `/buscar`, query: { bastidor } })
  }

  return (
    <>
      <div className='w-100 flex flex-col items-center justify-center rounded-lg py-4 px-8 text-black'>
        <h1 className='text-3xl font-bold'>
          ¿Estás buscando cambiar de vehículo?
        </h1>
        <h1 className='text-3xl font-bold'>
          ¿Quieres saber cuántas transferencias tiene tu vehículo?
        </h1>
      </div>
      <form
        className='flex w-full flex-col items-center justify-center'
        onSubmit={submitBastidor}
      >
        <input
          id='input_bastidor'
          className='my-8 h-16 w-96 rounded-lg border-4 text-center font-light shadow-lg shadow-gray-300'
          type='text'
          placeholder='Indique el bastidor del vehículo'
          required
        />
        <button
          className='w-36 rounded-lg bg-violet-300 p-3 text-white hover:bg-violet-500'
          type='submit'
        >
          Consultar
        </button>
      </form>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
