
type Props = {
  description: string;
};

export default function PropertyAbout({
  description,
}: Props) {
  return (
    <section className="space-y-5">
      <h2 className="text-[25px] font-bold">
        About this property
      </h2>

      <p className="whitespace-pre-line text-[15px] leading-7 text-muted-foreground">
        {description || "No description available."}
      </p>
    </section>
  );
}
