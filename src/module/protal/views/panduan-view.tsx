"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EventContent } from "../ui/components/event-content";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'


const PanduanView = () => {
  const trpc = useTRPC();
  const { data: panduanList } = useSuspenseQuery(trpc.portal.getPanduan.queryOptions());

  return (
    <EventContent title="Panduan / Pedoman">
      {panduanList.docs.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Belum ada panduan yang tersedia.
        </div>
      ) : (
        <>
          {/* Tabel untuk desktop */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg bg-white">
            <Table className="min-w-full text-xs md:text-sm text-gray-700">
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-100 to-orange-100">
                  <TableHead className="font-bold text-gray-800 uppercase tracking-wider px-2 py-2 w-2/3">Judul</TableHead>
                  <TableHead className="font-bold text-gray-800 uppercase tracking-wider text-center px-2 py-2 w-1/3">Ukuran File</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {panduanList.docs.map((panduan) => (
                  <TableRow key={panduan.id} className="even:bg-gray-50 odd:bg-white hover:bg-orange-50 transition">
                    <TableCell className="font-semibold px-2 py-2 break-words max-w-xs">
                      {panduan.file && typeof panduan.file === "object" && "url" in panduan.file ? (
                        <a
                          href={panduan.file.url?.toString()}
                          download={panduan.file.filename || "panduan.pdf"}
                          className="text-xl hover:underline font-medium"
                        >
                          {panduan.title}
                        </a>
                      ) : (
                        <span className="text-gray-400">{panduan.title}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center px-2 py-2">
                      {panduan.fileSize ? (panduan.fileSize / 1024).toFixed(2) + " KB" : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* Card untuk mobile */}
          <div className="block md:hidden space-y-4">
            {panduanList.docs.map((panduan) => (
              <div key={panduan.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <div className="font-semibold text-base mb-2">
                  {panduan.file && typeof panduan.file === "object" && "url" in panduan.file ? (
                    <a
                      href={panduan.file.url?.toString()}
                      download={panduan.file.filename || "panduan.pdf"}
                      className="text-xl hover:underline font-medium"
                    >
                      {panduan.title}
                    </a>
                  ) : (
                    <span className="text-gray-400">{panduan.title}</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  Ukuran File: {panduan.fileSize ? (panduan.fileSize / 1024).toFixed(2) + " KB" : "-"}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </EventContent>
  );
};

export default PanduanView;