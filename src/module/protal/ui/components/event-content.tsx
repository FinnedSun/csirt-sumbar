interface Props {
  title: string;
  children: React.ReactNode;
}

export const EventContent = ({
  title,
  children
}: Props) => {
  return (
    <section className="relative py-12 px-2 sm:px-6 md:px-12 min-h-[60vh] ">
      <div className="max-w-5xl mx-auto rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg border border-gray-100 p-4 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-orange-400 rounded-full shadow" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow">
            {title}
          </h1>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700">
          {children}
        </div>
      </div>
    </section>
  )
}
