"use client"

import React from 'react'
import { EventContent } from './event-content'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner'


const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export const ContactContent = () => {
  const trpc = useTRPC()

  const contact = useMutation(trpc.portal.createContact.mutationOptions({
    onSuccess: () => {
      toast.success("Berhasil mengirim pesan")
    },
    onError: () => {
      toast.error("Gagal mengirim pesan")
    }
  }))

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  })

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    await contact.mutateAsync(data)
    form.reset()
  }

  return (
    <EventContent title="hubungi kami">
      <section className="flex flex-col items-center justify-center py-12 px-2 md:px-0">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
          {/* Google Maps */}
          <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow">
            <iframe
              title="Dinas Komunikasi dan Informatika"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d981.4903075439362!2d100.35669060396299!3d-0.9160078321973676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1747183914972!5m2!1sid!2sid"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Contact Form */}
          <Form
            {...form}
          >
            <form
              className="w-full md:w-1/2 bg-white rounded-lg shadow p-6 flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Enter your Name" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Enter your Email" required />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Subject..." required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter your Message" rows={4} required className="resize-none" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={contact.isPending}>
                Kirim Pesan
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </EventContent>
  )
}
