export function StructuredData({ data }: { data: object | object[] }) {
  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}
