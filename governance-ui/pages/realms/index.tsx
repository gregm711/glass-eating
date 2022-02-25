import React, { useMemo, useState } from 'react'

import { getCertifiedRealmInfos, getUnchartedRealmInfos, RealmInfo } from '../../models/registry/api'

import useWalletStore from '../../stores/useWalletStore'

import RealmsDashboard from './components/RealmsDashboard'
import { LinkButton, NavButton } from '@components/Button'

import { ConnectWalletSimple } from '@components/ConnectWalletButton'
import { useEffect } from 'react'

const NavOption = ({ selectionkey, href, title, children, onClick, target, ...props }) => {
	return <>
		<li>
			<NavButton selectionkey={ selectionkey } onClick={ onClick } href={ href } target={ target } title={ title }>
				{ children }
			</NavButton>
		</li>
	</>
}

const Realms = () => {
	// const { connected, current, providerUrl, provider, handleConnectDisconnect, walletAddressFormatted } = ConnectWalletSimple()
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

	const [connectingWallet, setConnectingWallet] = useState(false);
	const [connected, setConnected] = useState(false);


	return (
		<div>
			<div className="flex flex-col justify-center items-center min-h-screen">
				<div className="pt-8 w-full flex flex-col items-center pb-8">
					<div>
						************************************
					</div>
					<div className="pt-4">
						Tokr_
					</div>
					<div className="py-2">
						Tokenize Real Estate v0.1.0 Beta
					</div>
					<div className="pb-4">
						Open Source Software
					</div>
					<div>
						************************************
					</div>
				</div>
				<div className="py-8 w-full px-16">
					<div className="py-2">
						Choose one of the following options:
					</div>
					<ul className="">
						<NavOption selectionkey={1} onClick={ e  => {
							// alert("Connect my wallet :)");
							setConnectingWallet( connectingWallet === false ? true : false )
							e.preventDefault();
						}} >
							Connect your wallet
						</NavOption>

						{ connectingWallet ? <>
							<li className="pt-4">
								Connect your wallet, make a selection below:
							</li>
							<li>
								<ConnectWalletSimple setConnected={setConnected} />
							</li>
							{ connected && <li>
								<RealmsDashboard realms={certifiedRealms} isLoading={isLoadingCertified} showNewButton></RealmsDashboard>
							</li> }
							<li>
								------------------------------------
								<br />
								<NavOption selectionkey="ESC" onClick={ e => {
									setConnectingWallet(false);
									e.preventDefault();
								}}>
									To Cancel
								</NavOption>
							</li>
							<li>
								<RealmsDashboard realms={unchartedRealms} isLoading={isLoadingUncharted} header={'Uncharted Organisations'}></RealmsDashboard>
							</li>
						</> : <>
							<NavOption selectionkey={2} onClick={ e  => {
								// alert("Show me DAOs");
								console.log("connection", "connected");
								e.preventDefault();
							}} target="_blank">
								Browse DAOs
							</NavOption>
							<NavOption selectionkey={3} href="https://github.com" target="_blank">
								Read docs
							</NavOption>
							<NavOption selectionkey={4} href="https://rhove.com" target="_blank">
								Download white paper
							</NavOption>
							<NavOption selectionkey={5} href="https://discord.com" target="_blank">
								Join discord
							</NavOption>
						</> }
					</ul>
				</div>
			</div>

			{/* <div className="hidden">
				<RealmsDashboard realms={certifiedRealms} isLoading={isLoadingCertified} showNewButton></RealmsDashboard>
				<div className="mt-20">
					<RealmsDashboard realms={unchartedRealms} isLoading={isLoadingUncharted} header={'Uncharted Organisations'}></RealmsDashboard>
				</div>
			</div> */}
		</div>
	)
}

export default Realms
