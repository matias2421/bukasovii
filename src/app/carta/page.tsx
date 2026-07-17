import CoverHeader from "@/components/CoverHeader";
import MenuExperience from "@/components/MenuExperience";
import SiteFooter from "@/components/SiteFooter";
import { getMenu } from "@/lib/menu";

export default async function CartaPage() {
  const categories = await getMenu();

  return (
    <main className="flex-1 bg-ink">
      <CoverHeader />
      <MenuExperience categories={categories} />
      <SiteFooter />
    </main>
  );
}
