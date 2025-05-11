
interface Props {
  title: string;
  children: React.ReactNode;
}

export const ProtalContent = ({
  title,
  children
}: Props) => {
  return (
    <section className="relative py-12 px-4 sm:px-8 md:px-16  min-h-[60vh] ">
      <div className="max-w-3xl mx-auto rounded-2xl shadow-xl bg-white/80 backdrop-blur-md border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-orange-400 rounded-full" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight drop-shadow">
            {title}
          </h1>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700">
          {children}
        </div>
      </div>
    </section>
  );
};
