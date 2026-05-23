'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function GTMPageTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.toString()

  useEffect(() => {
    const url = pathname + (search ? `?${search}` : '')

    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      event: 'page_view',
      page_title: document.title,
      page_location: window.location.href,
      page_path: url,
    })
  }, [pathname, search])

  return null
}
