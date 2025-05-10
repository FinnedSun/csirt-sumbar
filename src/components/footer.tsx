"use client"

import React from 'react'
import { Input } from './ui/input'

interface Props {
  about: {
    address: string
    addressDetail: string
    phone: string
    email: string
  }
}

export const Footer = ({
  about,
}: Props) => {
  return (
    <footer className="bg-black text-white p-10 mt-5">
      <div className="container mx-auto text-center">
        <h2 className="mb-5 text-2xl">
          Provinsi Jawa Barat - Computer Security Incident Response Team
        </h2>
        <div className="flex flex-col md:flex-row justify-evenly">
          <address className="mb-2 md:mb-0">
            <p>Address: {about.address}</p>
            <p>{about.addressDetail}</p>
            <p>Phone: (+62) {about.phone}</p>
            <p>Email: <a className="underline" href={`mailto:${about.email}`}>{about.email}</a></p>
          </address>
          <div className="ml-0 md:ml-4">
            <h2 className="text-lg font-bold">Newsletter</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission
              // Show success message
            }}>
              <Input
                type="email"
                placeholder="Enter your Email"
                required
                aria-label="Email for newsletter"
                className="p-2 rounded my-4"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-blue-600 text-white px-4 py-2 rounded ml-2">
                Subscribe
              </button>
              +  </form>
          </div>
        </div>
        <p className="mt-4">© HAK CIPTA SUMBARPROV-CSIRT {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
