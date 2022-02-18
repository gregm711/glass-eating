import useQueryContext from '@hooks/useQueryContext'
import { RealmInfo } from '@models/registry/api'
import { useRouter } from 'next/router'
import React from 'react'
import Loading from '@components/Loading'
import useWalletStore from 'stores/useWalletStore'
import Button from '@components/Button'
import { notify } from '@utils/notifications'

export default function RealmsDashboard({
  realms,
  isLoading,
  showNewButton,
  header = 'Organisations',
}: {
  realms: readonly RealmInfo[]
  isLoading: boolean
  showNewButton?: boolean
  header?: string
}) {
  const router = useRouter()
  const { fmtUrlWithCluster } = useQueryContext()
  const { connected, current: wallet } = useWalletStore((s) => s)

  const goToRealm = () => {
    const symbol = '4E9YVvZxdXH91j41BeYiekWWqPoJBV4ED4mbxUpXsvQd'
    const url = fmtUrlWithCluster(`/dao/${symbol}`)
    router.push(url)
  }

  const handleCreateRealmButtonClick = async () => {
    if (!connected) {
      try {
        if (wallet) await wallet.connect()
      } catch (error) {
        const err = error as Error
        return notify({
          type: 'error',
          message: err.message,
        })
      }
    }
    router.push(fmtUrlWithCluster(`/realms/new`))
  }

  return (
    <div>
      {/* Re-instate when there are enough REALMs for this to be useful. Maybe > 25 */}
      {/* <div className="mb-10 flex">
            <Input
              value={search}
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search here...`}
            />
            <div className="flex flex-row ml-10">
              <Button className="mr-3" onClick={() => setViewType(COL)}>
                List
              </Button>
              <Button onClick={() => setViewType(ROW)}>Columns</Button>
            </div>
          </div> */}

      <div
        className={`grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4`}
      >
        {showNewButton && (
          <Button onClick={handleCreateRealmButtonClick}>Create DAO</Button>
        )}

        {showNewButton && <Button onClick={goToRealm}>Go to DAO</Button>}
      </div>
    </div>
  )
}
