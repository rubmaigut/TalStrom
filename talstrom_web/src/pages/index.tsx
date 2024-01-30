import Link from 'next/link'
import Layout from '../ui/layout'

export default function Page () {
  return (
    <Layout>
      <Link href="/admin/invite">
        <>Go to Admin Portal</>
      </Link>
      
    </Layout>
  )
}