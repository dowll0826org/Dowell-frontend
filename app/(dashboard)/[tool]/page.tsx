import { notFound } from 'next/navigation';
import { sidebarItems } from '@/lib/tools.data'
import MergePdf from '@/mainTools/mergeDoc/mergePdf';
import SplitPdf from '@/mainTools/splitDoc/splitPdf';
import compressDoc from '@/mainTools/compressDoc/CompressDoc';
import ConvertDoc from '@/mainTools/convertDoc/ConvertDoc';
import EditPdf from '@/mainTools/editDoc/EditPdf';
import OrganizePdf from '@/mainTools/organizeDoc/OrganizePdf';
import AddWatermark from '@/mainTools/watermarkDoc/addWatermark/AddWatermark';
import RemoveWatermark from '@/mainTools/watermarkDoc/removeWatermark/RemoveWatermark';
import ToolSeoContent from '@/components/seo/ToolSeoContent';
import { seoData } from '@/lib/seo.data';

interface props {
  params: Promise<{ tool: string }>
}

export const revalidate = 3600; // 1 hour for ISR

export async function generateStaticParams() {
  const paths: { tool: string }[] = [];

  for (const item of sidebarItems) {
    if (item.slug) {
      paths.push({ tool: item.slug });
    }
    if (item.children) {
      for (const child of item.children) {
        if (child.slug) {
          paths.push({ tool: child.slug });
        }
      }
    }
  }

  return paths;
}

export async function generateMetadata({ params }: props) {
  const { tool } = await params;

  let selectedTool = sidebarItems.find((item) => item.slug === tool);
  if (!selectedTool) {
    for (const item of sidebarItems) {
      if (item.children) {
        const foundChild = item.children.find((child: any) => child.slug === tool);
        if (foundChild) {
          selectedTool = foundChild;
          break;
        }
      }
    }
  }

  if (!selectedTool) {
    notFound();
  }
  return {
    title: selectedTool.metadata?.title,
    description: selectedTool.metadata?.description,
    keywords: selectedTool.metadata?.keywords,
    openGraph: {
      title: selectedTool.metadata?.title,
      description: selectedTool.metadata?.description,
      image: selectedTool.metadata?.image
    },
  }
}

export default async function mainTool({ params }: props) {
  const { tool } = await params;

  if (!tool) {
    notFound();
  }

  let selectedTool = sidebarItems.find((item) => item.slug === tool);
  if (!selectedTool) {
    for (const item of sidebarItems) {
      if (item.children) {
        const foundChild = item.children.find((child: any) => child.slug === tool);
        if (foundChild) {
          selectedTool = foundChild;
          break;
        }
      }
    }
  }

  if (!selectedTool) {
    notFound();
  }

  const getComponentForTool = (tool: string) => {
    if (tool.includes('-to-')) {
      return ConvertDoc;
    }

    if (tool.includes('compress-')) {
      return compressDoc;
    }

    switch (tool) {
      case 'merge-pdf':
        return MergePdf;
      case 'split-pdf':
        return SplitPdf;
      case 'edit-pdf':
        return EditPdf;
      case 'organize-pdf':
        return OrganizePdf;
      case 'add-watermark-pdf':
        return AddWatermark;
      case 'remove-watermark-pdf':
        return RemoveWatermark;
      default:
        return null;
    }
  };

  const ToolComponent = getComponentForTool(tool);
  const content = seoData[tool];

  return (
    <div className="flex flex-col min-h-screen">
      {content && (
        <section className="text-center space-y-4 mt-12 mb-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {content.heroTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {content.heroSubtitle}
          </p>
        </section>
      )}

      <div className="flex-grow">
        {ToolComponent ? <ToolComponent /> : <h1>{tool}</h1>}
      </div>

      {/* Rich SEO Content Section (How-to, Features, FAQs) */}
      <ToolSeoContent toolSlug={tool} />
    </div>
  )
}