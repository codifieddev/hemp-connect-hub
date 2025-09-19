'use client'
import LinkNext from 'next/link'
import { useRouter, usePathname, useParams as useNextParams } from 'next/navigation'
import { useMemo, useEffect } from 'react'

export const Link: any = LinkNext as any

export const useNavigate = () => {
  const router = useRouter()
  return (path: string) => router.push(path)
}

export const Navigate = ({ to }: { to: string }) => {
  const router = useRouter()
  useEffect(() => { router.replace(to) }, [router, to])
  return null
}

export const useLocation = () => {
  const pathname = usePathname()
  return useMemo(() => ({ pathname }), [pathname])
}

export const useParams = () => useNextParams() as any
