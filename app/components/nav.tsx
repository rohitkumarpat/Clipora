import { SignedIn, SignIn, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    return (
        <div>
            <div className="navbar bg-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 bg-slate-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a href="/home1" className="text-white btn btn-ghost">Home</a></li>
        <li>
          <a href="video-upload" className="text-white btn btn-ghost">Video-upload</a>
        </li>
        <li><a href="/social-share" className="text-white btn btn-ghost">Image upload</a></li>
      </ul>
    </div>
    <div className=" flex justify-center items-center gap-1 pl-3">
        <div className="h-7 w-7 rounded-md bg-gradient-to-tr from-fuchsia-600 via-violet-600 to-rose-500 " />
    <a href="/home1" className="text-xl text-white ">Clipora</a></div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      <li><a href="/home1" className="text-white btn btn-ghost">Home</a></li>
      <li>
          <a href="/video-upload" className="text-white btn btn-ghost">Video Upload</a>
      </li>
      <li><a href="/social-share" className="text-white btn btn-ghost">Image Upload</a></li>
    </ul>
  </div>
  <div className="navbar-end">
     <div className="flex gap-4">
     <button className="btn btn-neutral btn-circle scale-75">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  

  <SignedIn>
<UserButton />
  </SignedIn>
  </div>
  </div>
</div>
        </div>
    )
}