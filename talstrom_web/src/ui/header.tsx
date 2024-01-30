import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className="block w-full [min-height:4rem]">
        <p className={`nojs-show ${!session && loading ? 'custom-loading' : 'custom-loaded'}`}>
          {!session && (
            <>
              <span className="custom-not-signed-in-text">
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className="custom-button-primary"
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className="rounded-full float-left h-11 w-11 bg-white bg-cover bg-no-repeat"
              />
              <span className="custom-signed-in-text">
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className="custom-button"
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className="mb-8 p-0 list-none">
          {/* Nav items here */}
        </ul>
      </nav>
    </header>
  )
}
