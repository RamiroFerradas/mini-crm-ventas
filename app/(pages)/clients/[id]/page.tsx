interface Props {
  params: { id: string };
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params;

  return <div>Client {id}</div>;
}
