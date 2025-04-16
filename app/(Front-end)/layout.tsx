import ProtectFrontendPart from "@/components/alert/ProtectFrontendPart";


export default function FrontEndLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      <ProtectFrontendPart>

      {children}
      </ProtectFrontendPart>
    </div>
  );
}
