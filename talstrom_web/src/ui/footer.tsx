import Link from "next/link"
import packageInfo from "../../package.json"

export default function Footer() {
  return (
    <footer className={"w-full"}>
      <hr />
      <ul className={"w-full"}>
        <li className={"w-full"}>
          <a href="https://next-auth.js.org">Documentation</a>
        </li>
        <li className={"w-full"}>
          <a href="https://www.npmjs.com/package/next-auth">NPM</a>
        </li>
        <li className={"w-full"}>
          <a href="https://github.com/nextauthjs/next-auth-example">GitHub</a>
        </li>
        <li className={"w-full"}>
          <Link href="/policy">
            <p>Policy</p>
          </Link>
        </li>
        <li className={"w-full"}>
          <em>next-auth@{packageInfo.dependencies["next-auth"]}</em>
        </li>
      </ul>
    </footer>
  )
}