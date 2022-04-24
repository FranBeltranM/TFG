import Link from 'next/link'

export const Logo = () => (
  <Link href='/'>
    <a className="relative text-2xl font-bold after:bg-purple-800 after:px-1 after:text-violet-300 after:content-['V'] hover:opacity-90">
      Check
    </a>
  </Link>
)
