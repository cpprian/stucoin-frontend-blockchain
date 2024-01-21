'use client'

import { PropsWithChildren } from 'react'

import { getDeployments } from 'deployments/deployments'
import { UseInkathonProvider } from '@scio-labs/use-inkathon'

import { env } from 'config/environment'
import { TooltipProvider } from 'components/ui/tooltip'

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <UseInkathonProvider
      appName="Stuocoin"
      connectOnInit={true}
      defaultChain={env.defaultChain}
      deployments={getDeployments()}
    >
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </UseInkathonProvider>
  )
}
