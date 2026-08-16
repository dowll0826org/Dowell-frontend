import { FileText, FileSpreadsheet, Lock, Cpu, EyeOff, Trash, Presentation, Image as ImageIcon, Archive, BookOpen, Database, Code, Layers, Scissors, Minimize2, Repeat, FileEdit, ArrowRight, CheckCircle2, Info, ListOrdered, Shield, Scale, XCircle, Book, User, Mail, Cookie, Triangle, Table } from "lucide-react";

export const summaryGuides = [
  {
    title: "How to Convert PDF to JPG",
    slug: "convert-pdf-to-jpg",
    description: "Learn how to convert PDF documents into high-quality JPG images quickly and easily.",
  },
  {
    title: "How to Convert JPG to PDF",
    slug: "convert-jpg-to-pdf",
    description: "Convert multiple JPG images into a single PDF document while maintaining image quality.",
  },
  {
    title: "How to Convert PNG to PDF",
    slug: "convert-png-to-pdf",
    description: "Create professional PDF documents from PNG images with a simple conversion process.",
  },
  {
    title: "How to Convert PDF to PNG",
    slug: "convert-pdf-to-png",
    description: "Convert PDF pages into clear PNG images for easy sharing and editing.",
  },
  {
    title: "How to Merge PDF Files",
    slug: "merge-pdf-files",
    description: "Combine multiple PDF documents into one organized file without losing formatting.",
  },
  {
    title: "How to Split PDF Files",
    slug: "split-pdf-files",
    description: "Split large PDF documents into smaller files or extract specific pages easily.",
  },
  {
    title: "How to Compress PDF Files",
    slug: "compress-pdf-files",
    description: "Reduce PDF file size while maintaining document quality for faster sharing.",
  },
  {
    title: "How to Edit PDF Documents",
    slug: "edit-pdf-documents",
    description: "Learn how to modify PDF files by adding text, annotations, and changes.",
  },
  {
    title: "How to Add Page Numbers to PDF",
    slug: "add-page-numbers-to-pdf",
    description: "Add professional page numbering to your PDF documents automatically.",
  },
  {
    title: "How to Rotate PDF Pages",
    slug: "rotate-pdf-pages",
    description: "Rotate PDF pages and fix document orientation quickly.",
  },
  {
    title: "How to Remove PDF Pages",
    slug: "remove-pdf-pages",
    description: "Remove unwanted pages from PDF documents and keep only required content.",
  },
  {
    title: "How to Protect PDF with Password",
    slug: "protect-pdf-with-password",
    description: "Secure your PDF documents by adding password protection and access control.",
  },
  {
    title: "How to Unlock PDF Files",
    slug: "unlock-pdf-files",
    description: "Remove PDF restrictions and regain access to your documents.",
  },
  {
    title: "How to Convert Word to PDF",
    slug: "convert-word-to-pdf",
    description: "Convert DOC and DOCX files into professional PDF documents.",
  },
  {
    title: "How to Convert PDF to Word",
    slug: "convert-pdf-to-word",
    description: "Convert PDF documents into editable Word files while preserving formatting.",
  },
  {
    title: "How to Convert Excel to PDF",
    slug: "convert-excel-to-pdf",
    description: "Convert Excel spreadsheets into shareable PDF documents.",
  },
  {
    title: "How to Convert PowerPoint to PDF",
    slug: "convert-powerpoint-to-pdf",
    description: "Convert presentations into PDF format for easy sharing.",
  },
  {
    title: "How to Extract Images from PDF",
    slug: "extract-images-from-pdf",
    description: "Extract images from PDF documents and save them separately.",
  },
  {
    title: "How to Extract Text from PDF",
    slug: "extract-text-from-pdf",
    description: "Extract readable text from PDF documents quickly using document processing tools.",
  },
  {
    title: "How OCR Works on Documents",
    slug: "ocr-document-guide",
    description: "Understand how OCR technology extracts text from scanned documents and images.",
  },
  {
    title: "How to Convert Images Online",
    slug: "image-conversion-guide",
    description: "Convert images between different formats including JPG, PNG, and WebP.",
  },
  {
    title: "How to Compress Images Without Losing Quality",
    slug: "compress-images-without-quality-loss",
    description: "Reduce image file size while keeping images clear and optimized.",
  },
  {
    title: "How to Resize Images Online",
    slug: "resize-images-online",
    description: "Resize images for websites, documents, and social media platforms.",
  },
  {
    title: "Supported File Formats in Docvia",
    slug: "supported-file-formats",
    description: "Learn about all supported document, image, and file formats available in Docvia.",
  },
  {
    title: "How Docvia Keeps Your Files Secure",
    slug: "docvia-file-security",
    description: "Understand how Docvia processes documents securely while protecting user privacy.",
  },
  {
    title: "How to Use Docvia Document Tools",
    slug: "getting-started-with-docvia",
    description: "A complete beginner guide to using Docvia online document processing tools.",
  }
];

export const supportedFormats = [
  {
    category: "Document Formats",
    icon: <FileText size={18} className="text-blue-600 dark:text-blue-400" />,
    items: [
      "PDF (.pdf)", "Microsoft Word (.doc)", "Microsoft Word Open XML (.docx)",
      "OpenDocument Text (.odt)", "Rich Text Format (.rtf)", "Text File (.txt)",
      "Markdown (.md)", "HTML (.html)", "XML (.xml)"
    ]
  },
  {
    category: "Spreadsheet Formats",
    icon: <FileSpreadsheet size={18} className="text-green-600 dark:text-green-400" />,
    items: [
      "Microsoft Excel (.xls)", "Microsoft Excel Open XML (.xlsx)", "CSV (.csv)",
      "OpenDocument Spreadsheet (.ods)", "TSV (.tsv)"
    ]
  },
  {
    category: "Presentation Formats",
    icon: <Presentation size={18} className="text-orange-600 dark:text-orange-400" />,
    items: [
      "Microsoft PowerPoint (.ppt)", "Microsoft PowerPoint Open XML (.pptx)",
      "OpenDocument Presentation (.odp)"
    ]
  },
  {
    category: "Image Formats",
    icon: <ImageIcon size={18} className="text-purple-600 dark:text-purple-400" />,
    items: [
      "JPEG / JPG (.jpg, .jpeg)", "PNG (.png)", "WebP (.webp)", "GIF (.gif)",
      "SVG (.svg)", "BMP (.bmp)", "TIFF (.tiff, .tif)", "HEIC (.heic)",
      "AVIF (.avif)", "ICO (.ico)"
    ]
  },
  {
    category: "Archive Formats",
    icon: <Archive size={18} className="text-yellow-600 dark:text-yellow-400" />,
    items: [
      "ZIP (.zip)", "RAR (.rar)", "7-Zip (.7z)", "TAR (.tar)", "GZIP (.gz)"
    ]
  },
  {
    category: "Ebook Formats",
    icon: <BookOpen size={18} className="text-indigo-600 dark:text-indigo-400" />,
    items: [
      "EPUB (.epub)", "MOBI (.mobi)", "AZW (.azw)", "AZW3 (.azw3)"
    ]
  },
  {
    category: "Data Formats",
    icon: <Database size={18} className="text-teal-600 dark:text-teal-400" />,
    items: [
      "JSON (.json)", "YAML (.yaml, .yml)", "CSV (.csv)", "XML (.xml)"
    ]
  },
  {
    category: "Code / Developer Formats",
    icon: <Code size={18} className="text-gray-600 dark:text-gray-400" />,
    items: [
      "JavaScript (.js)", "TypeScript (.ts)", "JSX (.jsx)", "TSX (.tsx)",
      "Python (.py)", "Java (.java)", "C (.c)", "C++ (.cpp)", "C# (.cs)",
      "PHP (.php)", "SQL (.sql)", "Shell Script (.sh)"
    ]
  }
];

export const conversionTools = [
  {
    title: "PDF Input Support",
    inputs: ["PDF"],
    outputs: ["JPG", "PNG", "WebP", "Word (.docx)", "Excel (.xlsx)", "PowerPoint (.pptx)", "TXT", "HTML", "PDF/A"]
  },
  {
    title: "Image Input Support",
    inputs: ["JPG", "JPEG", "PNG", "WebP", "GIF", "BMP", "TIFF", "SVG", "HEIC"],
    outputs: ["Image -> PDF", "JPG -> PNG", "PNG -> JPG", "Compress Image", "Resize Image"]
  },
  {
    title: "Document Input Support",
    inputs: ["DOC", "DOCX", "TXT", "RTF", "ODT", "HTML"],
    outputs: ["DOCX -> PDF", "TXT -> PDF", "HTML -> PDF"]
  },
  {
    title: "Spreadsheet Support",
    inputs: ["XLS", "XLSX", "CSV"],
    outputs: ["Excel -> PDF", "CSV -> XLSX", "XLSX -> CSV"]
  },
  {
    title: "Presentation Support",
    inputs: ["PPT", "PPTX", "ODP"],
    outputs: ["PPT -> PDF", "PPTX -> PDF"]
  }
];

export const detailedGuides = {
  "convert-pdf-to-jpg": {
    title: "How to Convert PDF to JPG",

    description:
      "Learn how to convert PDF documents into high-quality JPG images quickly and securely using Docvia.",

    content: {
      introduction:
        "Converting PDF files into JPG images allows you to share document pages as images, upload them easily, and use them across different platforms.",

      steps: [
        "Upload your PDF document.",
        "Select the pages you want to convert.",
        "Choose your preferred image quality.",
        "Start the PDF to JPG conversion.",
        "Download your JPG images."
      ],

      benefits: [
        "Fast PDF to image conversion",
        "Maintains image quality",
        "Works on mobile and desktop",
        "No software installation required"
      ],

      security:
        "Docvia processes files securely and protects your documents during conversion.",

      faq: [
        {
          question: "Can I convert PDF to JPG for free?",
          answer:
            "Yes, Docvia allows users to convert PDF files into JPG images easily."
        },
        {
          question: "Are my PDF files stored?",
          answer:
            "No, files are processed securely and are not permanently stored."
        }
      ]
    },

    relatedTools: [
      "jpg-to-pdf",
      "compress-pdf",
      "merge-pdf"
    ]
  },

  "compress-pdf-files": {
    title: "How to Compress PDF Files",

    description:
      "Reduce PDF file size while maintaining document quality for easier sharing.",

    content: {
      introduction:
        "Large PDF files can be difficult to upload, email, or share. PDF compression helps reduce file size while keeping the document readable.",

      steps: [
        "Upload your PDF file.",
        "Choose the compression level.",
        "Start PDF compression.",
        "Download the optimized PDF."
      ],

      benefits: [
        "Smaller file size",
        "Faster sharing",
        "Improved upload speed",
        "Maintains document quality"
      ],

      security:
        "Your documents are processed securely and removed after processing.",

      faq: [
        {
          question: "Does PDF compression reduce quality?",
          answer:
            "Docvia optimizes PDFs while maintaining readable document quality."
        }
      ]
    },

    relatedTools: [
      "merge-pdf",
      "split-pdf"
    ]
  }
};

export const faqData = [
  {
    question: "Is Docvia free?",
    answer: "Yes, many core document tools are available for free without requiring registration."
  },
  {
    question: "Are my files stored securely?",
    answer: "Absolutely. All files are processed securely using bank-level encryption and are automatically removed from our servers immediately after processing."
  },
  {
    question: "Is there a file size limit?",
    answer: "Guest users can upload files up to 50MB. Pro users enjoy significantly larger upload limits of up to 2GB per file."
  },
  {
    question: "Do I need an account to merge PDFs?",
    answer: "No, you can easily merge PDFs without an account. Creating a free account, however, gives you access to your conversion history."
  },
  {
    question: "How secure is my data?",
    answer: "We use 256-bit SSL encryption to ensure that your data is completely secure during transit and processing."
  }
];

export const securityCardsData = [
  { id: 1, title: 'Local Processing', description: 'Leveraging advanced WebAssembly, all document operations occur directly within your browser. No files are ever uploaded to our servers.', icon: Cpu, iconColor: 'bg-[#0f54c9] text-white' },
  { id: 2, title: 'Zero Tracking', description: 'We don\'t log your keystrokes, save your content, or track your specific actions. You operate in complete anonymity.', icon: EyeOff, iconColor: 'bg-[#dae5f9] dark:bg-blue-900/40 flex items-center justify-center text-[#1c4794] dark:text-blue-400 mb-6' },
  { id: 3, title: 'Instant Deletion', description: 'For features requiring temporary server processing, data is wiped instantly from RAM upon completion. No persistence.', icon: Trash, iconColor: 'bg-[#b64f1c] text-white' },
]

export const featuresCardsData = [
  {
    id: 1,
    title: 'Merge PDF',
    description: 'Combine multiple PDFs into a single, unified document instantly. Perfect for consolidating reports or presentations.',
    icon: Layers,
    isWide: false,
  },
  {
    id: 2,
    title: 'Split PDF',
    description: 'Extract specific pages or split large documents into smaller, manageable files with precision control.',
    icon: Scissors,
    isWide: false,
  },
  {
    id: 3,
    title: 'Compress',
    description: 'Reduce file size without compromising quality. Essential for email attachments and cloud storage optimization.',
    icon: Minimize2,
    isWide: false,
  },
  {
    id: 4,
    title: 'Convert Formats',
    description: 'Seamlessly translate documents between PDF, Word, Excel, PowerPoint, and high-quality image formats (JPG, PNG). Maintain formatting across all conversions.',
    icon: Repeat,
    isWide: true,
  },
  {
    id: 5,
    title: 'Edit & Annotate',
    description: 'Add text, shapes, highlights, and comments directly to your PDFs right in the browser.',
    icon: FileEdit,
    isWide: false,
  }
];

export const cookiePolicyData = {
  header: {
    title: "Cookies Policy",
    description: "Transparency in how we handle your data. Learn what cookies we use, why we use them, and how you can manage your preferences."
  },
  sections: [
    {
      id: "what-are-cookies",
      title: "What are Cookies?",
      icon: Info,
      content: [
        "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.",
        "At Docvia, we believe in minimal data footprint. We only use cookies that are necessary to provide you with our document processing services and to understand how our platform is used so we can improve it."
      ]
    },
    {
      id: "how-we-use-cookies",
      title: "How We Use Cookies",
      icon: Triangle,
      types: [
        {
          title: "Essential Cookies",
          description: "These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Without these cookies, basic functions like document uploading and processing cannot be provided.",
          colorClass: "border-[#1c4794] dark:border-blue-500"
        },
        {
          title: "Analytical Cookies",
          description: "These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.",
          colorClass: "border-gray-200 dark:border-gray-600"
        }
      ]
    }
  ],
  cookieDetails: [
    {
      name: "docvia_session",
      type: "Essential",
      duration: "Session",
      purpose: "Maintains active user session and authentication state.",
      typeClass: "bg-[#eef3fb] text-[#1c4794] dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      name: "docvia_csrf",
      type: "Essential",
      duration: "2 Hours",
      purpose: "Prevents Cross-Site Request Forgery attacks.",
      typeClass: "bg-[#eef3fb] text-[#1c4794] dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      name: "_ga",
      type: "Analytical",
      duration: "2 Years",
      purpose: "Used to distinguish users for analytics purposes.",
      typeClass: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
    },
    {
      name: "cookie_pref",
      type: "Essential",
      duration: "1 Year",
      purpose: "Stores your cookie consent preferences.",
      typeClass: "bg-[#eef3fb] text-[#1c4794] dark:bg-blue-900/30 dark:text-blue-400"
    }
  ]
};

export const termsOfServiceData = [
  {
    id: 1,
    title: "1. Acceptance of Terms",
    icon: CheckCircle2,
    content: [
      "By accessing or using the Docvia platform, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you must not access the service.",
      "These terms apply to all users, visitors, and others who access the service."
    ]
  },
  {
    id: 2,
    title: "2. Description of Service",
    icon: Info,
    content: [
      "Docvia provides a suite of online document processing tools including, but not limited to:"
    ],
    list: [
      "Merging and splitting PDF documents.",
      "Compressing file sizes for easier sharing.",
      "Basic editing and annotation features."
    ],
    postListContent: [
      "We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice."
    ]
  },
  {
    id: 3,
    title: "3. User Obligations",
    icon: ListOrdered,
    content: [
      "As a user of Docvia, you agree to:"
    ],
    obligations: [
      { text: "Provide accurate and current information during registration.", icon: CheckCircle2, iconColor: "text-green-500" },
      { text: "Maintain the security of your account credentials.", icon: CheckCircle2, iconColor: "text-green-500" },
      { text: "Use the service only for lawful purposes.", icon: CheckCircle2, iconColor: "text-green-500" },
      { text: "Not upload malicious files or attempt to breach system security.", icon: XCircle, iconColor: "text-red-500" }
    ]
  },
  {
    id: 4,
    title: "4. Intellectual Property",
    icon: Shield,
    content: [
      "The service and its original content, features, and functionality are and will remain the exclusive property of Docvia and its licensors.",
      "You retain all rights to the documents you upload. Docvia claims no ownership over your processed files. Files are temporarily stored for processing and automatically deleted according to our Privacy Policy."
    ]
  },
  {
    id: 5,
    title: "5. Governing Law",
    icon: Scale,
    content: [
      "These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions."
    ]
  }
];

export const privacyPolicyData = [
  {
    id: 1,
    title: "1. Information Collection",
    icon: Book,
    content: [
      "We believe the best way to protect your data is not to collect it in the first place. When you use Docvia, we collect only the absolute minimum information required to operate our service:"
    ],
    list: [
      { label: "Account Information", text: "If you choose to create an account, we collect your email address and basic profile information." },
      { label: "Technical Telemetry", text: "Anonymized usage statistics (e.g., features used, browser type) to help us improve platform stability. This data cannot be traced back to individual users." },
      { label: "Billing Information", text: "Processed securely by our third-party payment providers (Stripe). We do not store your credit card details." }
    ]
  },
  {
    id: 2,
    title: "2. Data Processing (Local-First)",
    icon: Cpu,
    specialBanner: {
      title: "Zero-Upload Architecture",
      content: "The core processing of your documents (Merge, Split, Compress, Edit) happens entirely within your web browser. Your sensitive files are never uploaded to our servers. They remain on your device, ensuring complete confidentiality."
    },
    content: [
      "Because processing is local, we do not have access to the contents of your documents, metadata, or the results of your processing actions."
    ]
  },
  {
    id: 3,
    title: "3. Data Security",
    icon: Shield,
    content: [
      "While your documents never leave your device, we employ enterprise-grade security for the limited data we do handle (like account credentials):"
    ],
    list: [
      { text: "All data in transit is encrypted using industry-standard TLS 1.3." },
      { text: "Data at rest (account info) is encrypted using AES-256." },
      { text: "Regular third-party security audits and penetration testing." }
    ]
  },
  {
    id: 4,
    title: "4. Your Rights",
    icon: User,
    content: [
      "Depending on your location (e.g., GDPR, CCPA), you have specific rights regarding your personal data:"
    ],
    list: [
      { label: "Access & Portability", text: "Request a copy of the personal data we hold about you." },
      { label: "Deletion", text: "Request that we delete your account and associated data." },
      { label: "Correction", text: "Update inaccurate or incomplete information." }
    ],
    postListContent: [
      "To exercise these rights, please contact us using the information below."
    ]
  },
  {
    id: 5,
    title: "5. Contact Information",
    icon: Mail,
    content: [
      "If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer:"
    ],
    contactBox: {
      email: "privacy@docvia.com",
      address: "123 Privacy Way, Suite 400, Tech District, CA 94107"
    }
  }
];
