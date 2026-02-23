import ClientPageClient from "@/components/client/ClientPage";
import { getClientFromMock } from "@/services";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const client = getClientFromMock(id);

  if (!client) {
    return {
      title: "Cliente no encontrado",
      description: "El cliente solicitado no existe",
    };
  }

  return {
    title: `${client.name} | Clientes`,
    description: `Información y oportunidades del cliente ${client.name}`,
  };
}

export default async function ClientPage({ params }: Props) {
  const { id } = await params;
  return <ClientPageClient id={id} />;
}
