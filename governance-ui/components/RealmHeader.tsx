import React from 'react'
import useRealm from 'hooks/useRealm'
import { GlobeAltIcon } from '@heroicons/react/outline'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { TwitterIcon } from './icons'
import useQueryContext from 'hooks/useQueryContext'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { getRealmExplorerHost } from 'tools/routing'

const RealmHeader = () => {
	const { fmtUrlWithCluster } = useQueryContext()
	const { realmInfo, realmDisplayName } = useRealm()
	const { REALM } = process.env

	const isBackNavVisible = realmInfo?.symbol !== REALM // hide backnav for the default realm

	const explorerHost = getRealmExplorerHost(realmInfo)
	const realmUrl = `https://${explorerHost}/#/realm/${realmInfo?.realmId.toBase58()}?programId=${realmInfo?.programId.toBase58()}`

	return (
		<>
			{isBackNavVisible ? (
				<Link href={fmtUrlWithCluster('/realms')}>
					<a className="default-transition flex items-center mb-2 md:mb-6 text-fgd-3 text-sm transition-all hover:text-fgd-1">
						<ArrowLeftIcon className="h-4 w-4 mr-1 text-primary-light" />
						Back
					</a>
				</Link>
			) : null}
			<div className="pb-4">
				<a href={realmUrl} target="_blank" rel="noopener noreferrer">
					<span className="flex items-center cursor-pointer">
						<span className="flex flex-col md:flex-row items-center pb-3 md:pb-0">
							<span className="ml-3">{realmDisplayName}</span>
						</span>
					</span>
				</a>
			</div>
		</>
	)
}

export default RealmHeader
