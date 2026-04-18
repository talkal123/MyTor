import React from 'react'

const Footer = () => {
  return (
   <footer className="border-t-1 text-center  text-sm text-gray-600 mt-10 p-5 ">
  <p>© 2025 BookMySlot. All rights reserved.</p>
  <div className="flex justify-center gap-4 mt-2">
    <a href="/about" className="hover:underline">About</a>
    <a href="/contact" className="hover:underline">Contact</a>
    <a href="/privacy" className="hover:underline">Privacy Policy</a>
  </div>
  <br />
  <br />
  <br />
</footer>

  )
}

export default Footer
