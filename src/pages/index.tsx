import Router from 'next/router'
import { useEffect } from 'react'
import urls from 'src/utils/urls'

export default function Home() {
  useEffect(() => {
    Router.push(urls.pages.login)
  })
}
