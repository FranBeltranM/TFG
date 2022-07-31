import Layout from '../components/Layout'
import { useRouter } from 'next/router'

import useFecthDataSearch from '../components/hooks/useFetchDataSearch'

import { NoResults } from '../components/Results/NoResults'
import { Loading } from '../components/Results/LoadingResults'
import { Error } from '../components/Results/ErrorResults'
import { ShowResults } from '../components/Results/showResults'

export default function Buscar() {
  const router = useRouter()

  const { datos, estado, transferencias } = useFecthDataSearch(
    router.query.bastidor
  )

  return (
    <>
      {estado === 'loading' && <Loading />}

      {estado === 'error' && <Error />}

      {estado === 'ok' && (
        <ShowResults
          data={datos}
          transfers={transferencias}
        />
      )}

      {estado === 'no_results' && <NoResults />}
    </>
  )
}

Buscar.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
