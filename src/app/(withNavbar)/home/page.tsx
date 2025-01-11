import Header from '@/components/ui/single_use/dashboard/header';
import Categories from '@/components/ui/single_use/home/categories';
import { ClientRefs } from '@/components/ui/single_use/home/client';
import ContributePrompt from '@/components/ui/single_use/home/contibute__prompt';
import Footer from '@/components/ui/single_use/home/footer';
import HomeTop from '@/components/ui/single_use/home/home_top';
import LearnMoreContributions from '@/components/ui/single_use/home/learn_more_contributions';
import TopContributors from '@/components/ui/single_use/home/top_contributors';
import prisma from '@/lib/db';

export default async function CompareCard() {
  const numberOfDocuments = 150;
  const numOfContributions = 236;

  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-screen flex bg-background flex-col">
      <Header />
      <ClientRefs 
        numberOfDocuments={numberOfDocuments}
        numOfContributions={numOfContributions}
        categories={categories}
      />
    </div>
  );
}

