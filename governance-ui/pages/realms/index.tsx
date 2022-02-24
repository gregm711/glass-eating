import React, { useMemo, useState } from 'react'

import { getCertifiedRealmInfos, getUnchartedRealmInfos, RealmInfo } from '../../models/registry/api'

import useWalletStore from '../../stores/useWalletStore'

import RealmsDashboard from './components/RealmsDashboard'
import { LinkButton } from '@components/Button'

const NavOption = ({ number, href, title, children, onClick, ...props }) => {
	return <>
		<li>
			<LinkButton onClick={ onClick } href={ href } title={ title } className="w-full flex items-start py-2 hover:text-primary-dark focus:outline-none" hideDefaults={ true }>
				<span className="flex-shrink-0 pr-2">
					&lt; { number || " "} &gt;
				</span>
				<span dangerouslySetInnerHTML={{__html: (children || "Lorem ipsum") }}/>
			</LinkButton>
		</li>
	</>
}

const Realms = () => {
	const [isLoadingCertified, setIsLoadingCertified] = useState(true)
	const [certifiedRealms, setCertifiedRealms] = useState<ReadonlyArray<RealmInfo>>([])

	const [unchartedRealms, setUnchartedRealms] = useState<ReadonlyArray<RealmInfo>>([])
	const [isLoadingUncharted, setIsLoadingUncharted] = useState(true)

	const { actions, selectedRealm, connection } = useWalletStore((s) => s)

	useMemo(async () => {
		// console.log('CURRENT CONNECTION IS ')
		// console.log(connection)
		if (connection) {
			const data = await getCertifiedRealmInfos(connection)
			setCertifiedRealms(data)
			setIsLoadingCertified(false)
		}
		if (selectedRealm.realm) {
			actions.deselectRealm()
		}
	}, [connection])

	useMemo(async () => {
		if (connection) {
			const data = await getUnchartedRealmInfos(connection)
			setUnchartedRealms(data)
			setIsLoadingUncharted(false)
		}
		if (selectedRealm.realm) {
			actions.deselectRealm()
		}
	}, [connection])

	return (
		<div>
			<div className="flex flex-col justify-center items-center min-h-screen">
				<div className="pt-8">
					************************************
					<div className="pt-4">
						Tokr_
					</div>
					<div className="py-2">
						Tokenize Real Estate v0.1.0 Beta
					</div>
					<div className="pb-4">
						Open Source Software
					</div>
					************************************
				</div>
				<div className="py-8">
					<div className="py-2">
						Choose one of the following options:
					</div>
					<ul className="">
						<NavOption number={1} onClick={ e  => {
							alert("Connect my wallet :)");
							e.preventDefault();
						}} >
							Connect your wallet
						</NavOption>
						<NavOption number={2} onClick={ e  => {
							alert("Show me DAOs");
							e.preventDefault();
						}} target="_blank">
							Browse DAOs
						</NavOption>
						<NavOption number={3} href="https://github.com" target="_blank">
							Read docs
						</NavOption>
						<NavOption number={4} href="https://rhove.com" target="_blank">
							Download white paper
						</NavOption>
						<NavOption number={5} href="https://discord.com" target="_blank">
							Join discord
						</NavOption>
					</ul>
				</div>
			</div>

			<div className="Xhidden">
				<RealmsDashboard realms={certifiedRealms} isLoading={isLoadingCertified} showNewButton></RealmsDashboard>
				<div className="mt-20">
					<RealmsDashboard realms={unchartedRealms} isLoading={isLoadingUncharted} header={'Uncharted Organisations'}></RealmsDashboard>
				</div>
			</div>
		</div>
	)
}

export default Realms
