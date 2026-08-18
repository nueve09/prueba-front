type PlaceholderPageProps = {
  title: string
}

export const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <main className="flex h-full flex-col bg-kiosk px-8 py-10 text-kiosk-foreground">
      <h1 className="font-heading text-3xl font-extrabold tracking-tight">
        {title}
      </h1>
    </main>
  )
}
