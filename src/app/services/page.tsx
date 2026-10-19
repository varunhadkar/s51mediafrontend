import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ServicesSection from '@/components/ServicesSection'
import Services16 from '@/components/Services16'
import CopySection from '@/components/CopySection'
import { buildMetadata } from '@/lib/seo'
import React from 'react'

export const metadata = buildMetadata("/services")

const page = () => {
  return (
    <div className="bg-black">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-6 pt-40">
        <div className="pb-6 sm:pb-8 border-b border-zinc-800">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">
            VFX services: the complete pipeline, concept to final render
          </h1>
        </div>
        <p className="mt-6 max-w-3xl text-zinc-400 text-base md:text-lg leading-relaxed">
          Studio 51 VFX covers the full visual effects pipeline, from concept
          design and previz through matchmove, paint, FX, environments and final
          compositing. Our teams work from five studios in Mumbai, Hyderabad,
          Beijing, Shanghai and London. Productions can hire us for a single
          discipline or hand over complete sequences.
        </p>
      </div>
      <ServicesSection/>
      <Services16/>

      <div className="pb-16">
        <CopySection heading="Frequently asked questions">
          <h3 className="text-white text-lg md:text-xl font-semibold">Can you take on a single discipline?</h3>
          <p>
            Yes. Productions can hire us for a single discipline, such as
            matchmove, roto or compositing, or hand over complete sequences.
          </p>
          <h3 className="text-white text-lg md:text-xl font-semibold pt-4">How do you handle large shot counts?</h3>
          {/* [CONFIRM] Add specifics you can stand behind (e.g. team size, typical throughput). */}
          <p>
            With five studios across India, China and the UK, work can progress
            across time zones on one pipeline, which keeps look, schedule and
            budget consistent.
          </p>
          <h3 className="text-white text-lg md:text-xl font-semibold pt-4">How do I get a quote?</h3>
          <p>
            Send us your script, sequences or schedule and we will respond with an
            approach and bid outline. <Link href="/contact">Request a quote</Link>.
          </p>
        </CopySection>
      </div>
    </div>
  )
}

export default page
