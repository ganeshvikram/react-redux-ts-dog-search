import { Link } from 'react-router-dom'
import Logo from '../../assets/vikram-high-resolution-logo.png'

export const Header = () => {
  return (
    <>
    {/* ========== HEADER ========== */}
<header className="bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
  <nav className="relative max-w-[85rem] w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2 dark:bg-neutral-900">
    {/* Logo w/ Collapse Button */}
    <div className="flex items-center justify-between">
    <Link to="/" className="flex items-center">
                    <img src={Logo} className="mr-3 h-20" alt="Dog Finder Logo" />
                    <span className="self-center text-2xl font-[cursive] font-semibold whitespace-nowrap dark:text-white">Dog Finder</span>
                </Link>

      {/* Collapse Button */}
      <div className="md:hidden">
        <button type="button" className="hs-collapse-toggle relative size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-header-classic-collapse" aria-expanded="false" aria-controls="hs-header-classic" aria-label="Toggle navigation" data-hs-collapse="#hs-header-classic">
          <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
          <svg className="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>
      {/* End Collapse Button */}
    </div>
    {/* End Logo w/ Collapse Button */}


  </nav>
</header>
{/* ========== END HEADER ========== */}
    </>
  )
}
