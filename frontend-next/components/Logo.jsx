import Link from 'next/link'

export const Logo = () => (
  <Link href='/'>
    <a className="hover:opacity-90 font-bold text-2xl relative after:content-['V'] after:text-violet-300 after:bg-purple-800 after:px-1">
      Check
    </a>
  </Link>
)
