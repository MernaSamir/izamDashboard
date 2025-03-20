
import DashboardTemplate from '@/components/templates/dashboardTemplate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Izam - Dashboard'
}

export default async function Page() {

  return <DashboardTemplate  />
}
