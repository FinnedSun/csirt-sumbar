import ContactView from "@/module/protal/views/contact-view"
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

const ContactPage = () => {

  return (
    <ContactView />
  )
}

export default ContactPage