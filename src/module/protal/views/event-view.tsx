"use client"

import React from 'react'
import { EventContent } from '../ui/components/event-content'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';



const EventView = () => {
  const trpc = useTRPC()

  const { data: events } = useSuspenseQuery(trpc.protal.getEvents.queryOptions())

  return (
    <EventContent
      title="Event"
    >
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white hidden md:block">
        <Table className="min-w-full text-sm text-gray-700">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-100 to-orange-100">
              <TableHead className="text-center font-bold text-gray-800 uppercase tracking-wider">Acara</TableHead>
              <TableHead className="text-center font-bold text-gray-800 uppercase tracking-wider">Tanggal</TableHead>
              <TableHead className="text-center font-bold text-gray-800 uppercase tracking-wider">Tempat</TableHead>
              <TableHead className="text-center font-bold text-gray-800 uppercase tracking-wider">Materi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, idx) => (
              <TableRow key={idx} className="even:bg-gray-50 odd:bg-white hover:bg-orange-50 transition">
                <TableCell >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="font-semibold max-w-[220px] truncate">
                        {event.acara}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {event.acara}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="font-semibold max-w-[220px] truncate text-center">
                        {formatDate(event.tanggalAwal)} - {formatDate(event.tanggalAkhir)}

                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {formatDate(event.tanggalAwal)} - {formatDate(event.tanggalAkhir)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="font-semibold max-w-[220px] truncate ">
                        {event.tempat}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {event.tempat}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right max-w-[320px] whitespace-pre-line break-words">
                  <ul className="list-disc pl-4 space-y-1 text-left">
                    {event.materi?.map((m) => (
                      <li key={m.id}>{m.pembicara}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card untuk mobile */}
      <div className="block md:hidden space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="rounded-lg shadow bg-white p-4">
            <div className="font-bold text-base mb-2">{event.acara}</div>
            <div className="text-sm mb-1"><span className="font-semibold">Tanggal:</span> {formatDate(event.tanggalAwal)} - {formatDate(event.tanggalAkhir)}</div>
            <div className="text-sm mb-1"><span className="font-semibold">Tempat:</span> {event.tempat}</div>
            <div className="text-sm"><span className="font-semibold">Materi:</span>
              <ul className="list-disc pl-5 mt-1">
                {event.materi?.map((m) => (
                  <li key={m.id}>{m.pembicara}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </EventContent>
  )
}

export default EventView