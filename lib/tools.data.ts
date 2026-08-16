import {
    Merge,
    Split,
    Minimize2,
    ArrowRightLeft,
    FileEdit,
    LayoutGrid,
    Lock,
    Unlock,
    ScanText,
    FileOutput,
    GripVertical,
    RotateCw,
    Droplet,
    ListOrdered,
    PenTool,
    FileText,
    Presentation,
    Image,
    Table,
    Globe,
    FileArchive,
    Music,
    Video,
    Archive
} from "lucide-react";

export type SidebarItem = {
    name: string;
    slug?: string;
    path?: string;
    icon: any;
    category?: string;
    color?: string;
    metadata?: {
        title: string;
        description: string;
        keywords: string[];
        image: string;
    };
    children?: SidebarItem[];
};

export const sidebarItems: SidebarItem[] = [

    {
        name: "Merge Documents",
        slug: "merge-pdf",
        path: "/merge-pdf",
        icon: Merge,
        color: "text-indigo-500",

        metadata: {
            title: "Merge PDF Files Online  ",
            description:
                "Combine multiple PDF files into one document quickly and securely with Docvia PDF merger tool.",

            keywords: [
                "merge PDF",
                "combine PDF files",
                "PDF merger",
                "join PDF documents"
            ],
            image: '/og-image.png'
        }
    },


    {
        name: "Split Documents",
        slug: "split-pdf",
        path: "/split-pdf",
        icon: Split,
        color: "text-indigo-500",

        metadata: {
            title: "Split PDF Files Online  ",

            description:
                "Split PDF documents into separate pages or extract specific pages easily using Docvia.",

            keywords: [
                "split PDF",
                "extract PDF pages",
                "PDF splitter"
            ],
            image: '/og-image.png'
        }
    },


    {
        name: "Compress Documents",
        icon: Minimize2,
        color: "text-indigo-500",

        children: [

            // PDF & Images Column
            {
                name: "Compress PDF",
                slug: "compress-pdf",
                path: "/compress-pdf",
                icon: FileText,
                color: "text-red-500",
                category: "pdf_image",
                metadata: {
                    title: "Compress PDF Online - Reduce PDF Size  ",
                    description: "Compress PDF files while maintaining quality. Reduce file size for easy sharing.",
                    keywords: ["compress PDF", "reduce PDF size", "PDF optimizer"],
                    image: "/og-image.png"
                }
            },
            {
                name: "Compress JPG",
                slug: "compress-jpg",
                path: "/compress-jpg",
                icon: Image,
                color: "text-yellow-500",
                category: "pdf_image",
                metadata: {
                    title: "Compress JPG Images Online  ",
                    description: "Reduce JPG image size while maintaining image quality.",
                    keywords: ["compress JPG", "reduce JPG size", "JPG compressor"],
                    image: "/og-image.png"
                }
            },
            {
                name: "Compress PNG",
                slug: "compress-png",
                path: "/compress-png",
                icon: Image,
                color: "text-yellow-400",
                category: "pdf_image",
                metadata: {
                    title: "Compress PNG Images Online  ",
                    description: "Optimize PNG images and reduce file size without losing quality.",
                    keywords: ["compress PNG", "reduce PNG size", "PNG optimizer"],
                    image: "/og-image.png"
                }
            },
            {
                name: "Compress WEBP",
                slug: "compress-webp",
                path: "/compress-webp",
                icon: Image,
                color: "text-green-400",
                category: "pdf_image",
                metadata: {
                    title: "Compress WEBP Images Online  ",
                    description: "Compress WEBP images for faster websites and smaller file sizes.",
                    keywords: ["compress webp", "webp optimizer", "reduce webp size"],
                    image: "/og-image.png"
                }
            },
            {
                name: "Compress Images",
                slug: "compress-images",
                path: "/compress-images",
                icon: Image,
                color: "text-yellow-500",
                category: "pdf_image",
                metadata: {
                    title: "Compress Images Online  ",
                    description: "Compress JPG, PNG, WEBP and other image formats easily.",
                    keywords: ["image compressor", "compress images online", "reduce image size"],
                    image: "/og-image.png"
                }
            },

            // Office & Media Column
            {
                name: "Compress Word Document",
                slug: "compress-word",
                path: "/compress-word",
                icon: FileText,
                color: "text-blue-500",
                category: "office_media",
                metadata: {
                    title: "Compress Word Files Online  ",
                    description: "Reduce DOC and DOCX file size while keeping document quality.",
                    keywords: ["compress word", "compress docx", "reduce word file size"],
                    image: "/og-image.png"
                }
            },
            {
                name: "Compress Excel Files",
                slug: "compress-excel",
                path: "/compress-excel",
                icon: Table,
                category: "office_media",
                metadata: {
                    title: "Compress Excel Files Online  ",
                    description: "Reduce Excel XLS and XLSX file size efficiently.",
                    keywords: ["compress excel", "reduce xlsx size", "excel optimizer"],
                    image: "/og-image.png"
                }
            },
            {
                name: "Compress PowerPoint",
                slug: "compress-powerpoint",
                path: "/compress-powerpoint",
                icon: Presentation,
                category: "office_media",
                metadata: {
                    title: "Compress PowerPoint Files Online  ",
                    description: "Compress PPT and PPTX presentations by reducing media size.",
                    keywords: ["compress powerpoint", "compress ppt", "reduce ppt size"],
                    image: "/og-image.png"
                }
            },
            // {
            //     name: "Compress ZIP Files",
            //     slug: "compress-zip",
            //     path: "/compress-zip",
            //     icon: Archive,
            //     category: "office_media",
            //     metadata: {
            //         title: "Compress ZIP Files Online  ",
            //         description: "Create smaller ZIP archives and compress files easily.",
            //         keywords: ["compress zip", "zip compressor", "reduce archive size"],
            //         image: "/og-image.png"
            //     }
            // },
            // {
            //     name: "Compress RAR Files",
            //     slug: "compress-rar",
            //     path: "/compress-rar",
            //     icon: Archive,
            //     category: "office_media",
            //     metadata: {
            //         title: "Compress RAR Files Online  ",
            //         description: "Optimize RAR archives and reduce file size.",
            //         keywords: ["compress rar", "rar compressor"],
            //         image: "/og-image.png"
            //     }
            // },
            // {
            //     name: "Compress Video",
            //     slug: "compress-video",
            //     path: "/compress-video",
            //     icon: Video,
            //     category: "office_media",
            //     metadata: {
            //         title: "Compress Video Online  ",
            //         description: "Reduce video file size while maintaining quality.",
            //         keywords: ["compress video", "video optimizer"],
            //         image: "/og-image.png"
            //     }
            // },
            // {
            //     name: "Compress Audio",
            //     slug: "compress-audio",
            //     path: "/compress-audio",
            //     icon: Music,
            //     category: "office_media",
            //     metadata: {
            //         title: "Compress Audio Files Online  ",
            //         description: "Reduce MP3 and audio file sizes easily.",
            //         keywords: ["compress audio", "mp3 compressor"],
            //         image: "/og-image.png"
            //     }
            // }
        ]
    },
    {
        name: "Convert Documents",
        icon: ArrowRightLeft,
        color: "text-blue-500",

        children: [
            // CONVERT TO PDF
            {
                name: "JPG to PDF",
                slug: "jpg-to-pdf",
                path: "/jpg-to-pdf",
                icon: Image,
                color: "text-yellow-500",
                category: "to_pdf",
                metadata: {
                    title: "JPG to PDF Converter Online  ",
                    description: "Convert JPG images into PDF documents quickly and securely.",
                    keywords: ["jpg to pdf", "image to pdf", "convert jpg"],
                    image: "/og-image.png"
                }
            },
            {
                name: "IMG to PDF",
                slug: "img-to-pdf",
                path: "/img-to-pdf",
                icon: Image,
                color: "text-yellow-400",
                category: "to_pdf",
                metadata: {
                    title: "Convert Images to PDF Online  ",
                    description: "Convert images into PDF files easily.",
                    keywords: ["image to pdf", "img to pdf"],
                    image: "/og-image.png"
                }
            },
            {
                name: "WORD to PDF",
                slug: "word-to-pdf",
                path: "/word-to-pdf",
                icon: FileText,
                color: "text-blue-500",
                category: "to_pdf",
                metadata: {
                    title: "Word to PDF Converter Online  ",
                    description: "Convert Word documents into PDF files.",
                    keywords: ["word to pdf", "docx to pdf"],
                    image: "/og-image.png"
                }
            },
            {
                name: "POWERPOINT to PDF",
                slug: "powerpoint-to-pdf",
                path: "/powerpoint-to-pdf",
                icon: Presentation,
                color: "text-orange-500",
                category: "to_pdf",
                metadata: {
                    title: "PowerPoint to PDF Converter  ",
                    description: "Convert PowerPoint presentations into PDF.",
                    keywords: ["ppt to pdf", "powerpoint converter"],
                    image: "/og-image.png"
                }
            },
            {
                name: "EXCEL to PDF",
                slug: "excel-to-pdf",
                path: "/excel-to-pdf",
                icon: Table,
                color: "text-green-500",
                category: "to_pdf",
                metadata: {
                    title: "Excel to PDF Converter Online  ",
                    description: "Convert Excel spreadsheets into PDF documents.",
                    keywords: ["excel to pdf", "convert excel"],
                    image: "/og-image.png"
                }
            },
            //     {
            //         name: "HTML to PDF",
            //         slug: "html-to-pdf",
            //         path: "/html-to-pdf",
            //         icon: Globe,
            // color: "text-blue-400",
            //         category: "to_pdf",
            //         metadata: {
            //             title: "HTML to PDF Converter Online  ",
            //             description: "Convert HTML webpages into PDF documents.",
            //             keywords: ["html to pdf", "convert html"],
            //             image: "/og-image.png"
            //         }
            //     },

            // CONVERT FROM PDF
            {
                name: "PDF to JPG",
                slug: "pdf-to-jpg",
                path: "/pdf-to-jpg",
                icon: Image,
                color: "text-yellow-500",
                category: "from_pdf",
                metadata: {
                    title: "PDF to JPG Converter Online  ",
                    description: "Convert PDF pages into JPG images.",
                    keywords: ["pdf to jpg", "convert pdf image"],
                    image: "/og-image.png"
                }
            },
            {
                name: "PDF to WORD",
                slug: "pdf-to-word",
                path: "/pdf-to-word",
                icon: FileText,
                color: "text-blue-500",
                category: "from_pdf",
                metadata: {
                    title: "PDF to Word Converter Online  ",
                    description: "Convert PDF documents into editable Word files.",
                    keywords: ["pdf to word", "convert pdf to docx"],
                    image: "/og-image.png"
                }
            },
            {
                name: "PDF to POWERPOINT",
                slug: "pdf-to-powerpoint",
                path: "/pdf-to-powerpoint",
                icon: Presentation,
                color: "text-orange-500",
                category: "from_pdf",
                metadata: {
                    title: "PDF to PowerPoint Converter  ",
                    description: "Convert PDF presentations into editable PowerPoint files.",
                    keywords: ["pdf to ppt", "pdf to powerpoint"],
                    image: "/og-image.png"
                }
            },
            {
                name: "PDF to EXCEL",
                slug: "pdf-to-excel",
                path: "/pdf-to-excel",
                icon: Table,
                color: "text-green-500",
                category: "from_pdf",
                metadata: {
                    title: "PDF to Excel Converter  ",
                    description: "Convert PDF documents into editable Excel spreadsheets.",
                    keywords: ["pdf to excel", "pdf to xlsx"],
                    image: "/og-image.png"
                }
            },
            // {
            //     name: "PDF to PDF/A",
            //     slug: "pdf-to-pdfa",
            //     path: "/pdf-to-pdfa",
            //     icon: FileArchive,
            //     category: "from_pdf",
            //     metadata: {
            //         title: "PDF to PDF/A Converter  ",
            //         description: "Convert PDF documents to PDF/A for long-term archiving.",
            //         keywords: ["pdf to pdfa", "archive pdf"],
            //         image: "/og-image.png"
            //     }
            // }
        ]
    },



    {
        name: "Edit Documents",
        slug: "edit-pdf",
        path: "/edit-pdf",
        icon: FileEdit,

        metadata: {
            title: "Edit PDF Files Online  ",

            description:
                "Edit PDF documents by adding text, annotations and modifications securely.",

            keywords: [
                "edit PDF",
                "PDF editor",
                "modify PDF"
            ],
            image: '/og-image.png'
        }
    },
    {
        name: "Organize Documents",
        slug: "organize-pdf",
        path: "/organize-pdf",
        icon: LayoutGrid,

        metadata: {
            title: "Organize PDF Pages Online  ",

            description:
                "Reorder, manage and organize PDF pages easily with Docvia.",

            keywords: [
                "organize PDF",
                "reorder PDF pages",
                "PDF manager"
            ],
            image: '/og-image.png'
        }
    },


    // {
    //     name: "Protect Documents",
    //     slug: "protect-pdf",
    //     path: "/protect-pdf",
    //     icon: Lock,

    //     metadata: {
    //         title: "Protect PDF With Password  ",

    //         description:
    //             "Secure your PDF documents by adding password protection and encryption.",

    //         keywords: [
    //             "protect PDF",
    //             "password PDF",
    //             "secure PDF"
    //         ],
    //         image: '/og-image.png'
    //     }
    // },


    // {
    //     name: "Unlock Documents",
    //     slug: "unlock-pdf",
    //     path: "/unlock-pdf",
    //     icon: Unlock,

    //     metadata: {
    //         title: "Unlock PDF Files Online  ",

    //         description:
    //             "Remove PDF restrictions and unlock protected PDF documents securely.",

    //         keywords: [
    //             "unlock PDF",
    //             "remove PDF password",
    //             "PDF unlocker"
    //         ],
    //         image: '/og-image.png'
    //     }
    // },


    // {
    //     name: "OCR Documents",
    //     slug: "ocr-pdf",
    //     path: "/ocr-pdf",
    //     icon: ScanText,

    //     metadata: {
    //         title: "OCR PDF Online - Extract Text From PDF  ",

    //         description:
    //             "Extract text from scanned PDF documents using OCR technology.",

    //         keywords: [
    //             "OCR PDF",
    //             "extract text from PDF",
    //             "PDF text recognition"
    //         ],
    //         image: '/og-image.png'
    //     }
    // },


    // {
    //     name: "Extract Pages",
    //     slug: "extract-pages",
    //     path: "/tools/extract-pages",
    //     icon: FileOutput,

    //     metadata: {
    //         title: "Extract Pages From PDF Online  ",

    //         description:
    //             "Extract selected pages from PDF files and create new documents easily.",

    //         keywords: [
    //             "extract PDF pages",
    //             "PDF page extractor"
    //         ],
    //         image: '/og-image.png'
    //     }
    // },


    // {
    //     name: "Rearrange Pages",
    //     slug: "rearrange-pages",
    //     path: "/tools/rearrange-pages",
    //     icon: GripVertical,

    //     metadata: {
    //         title: "Rearrange PDF Pages Online  ",

    //         description:
    //             "Change PDF page order and organize documents easily.",

    //         keywords: [
    //             "rearrange PDF",
    //             "sort PDF pages"
    //         ],
    //         image: '/og-image.png'
    //     }
    // },


    // {
    //     name: "Rotate Pages",
    //     slug: "rotate-pages",
    //     path: "/rotate-pages",
    //     icon: RotateCw,

    //     metadata: {
    //         title: "Rotate PDF Pages Online  ",

    //         description:
    //             "Rotate PDF pages to the correct orientation quickly.",

    //         keywords: [
    //             "rotate PDF",
    //             "PDF page rotation"
    //         ],
    //         image: '/og-image.png'
    //     }
    // },


    {
        name: "Watermark",
        slug: "watermark",
        path: "/add-watermark-pdf",
        icon: Droplet,
        color: "text-blue-500",

        children: [
            {
                name: "Add Watermark",
                slug: "add-watermark-pdf",
                path: "/add-watermark-pdf",
                icon: Droplet,
                color: "text-blue-500",

                metadata: {
                    title: "Add Watermark to PDF Online",
                    description:
                        "Add text or image watermarks to PDF documents securely online.",

                    keywords: [
                        "add watermark PDF",
                        "PDF watermark",
                        "insert watermark in PDF",
                        "watermark PDF online"
                    ],

                    image: "/og-image.png"
                }
            },

            // {
            //     name: "Remove Watermark",
            //     slug: "remove-watermark-pdf",
            //     path: "/remove-watermark-pdf",
            //     icon: Droplet,
            //     color: "text-blue-500",

            //     metadata: {
            //         title: "Remove Watermark from PDF Online",
            //         description:
            //             "Remove unwanted watermarks from PDF documents securely online.",

            //         keywords: [
            //             "remove watermark PDF",
            //             "delete watermark from PDF",
            //             "PDF watermark remover",
            //             "remove PDF watermark online"
            //         ],

            //         image: "/og-image.png"
            //     }
            // }
        ]
    },


    // {
    //     name: "Add Page Numbers",
    //     slug: "add-page-numbers",
    //     path: "/add-page-numbers",
    //     icon: ListOrdered,

    //     metadata: {
    //         title: "Add Page Numbers to PDF  ",

    //         description:
    //             "Automatically add page numbers to your PDF documents.",

    //         keywords: [
    //             "PDF page numbers",
    //             "number PDF pages"
    //         ],
    //         image: '/og-image.png'
    //     }
    // },


    // {
    //     name: "Sign Documents",
    //     slug: "sign-pdf",
    //     path: "/sign-pdf",
    //     icon: PenTool,

    //     metadata: {
    //         title: "Sign PDF Documents Online  ",

    //         description:
    //             "Add electronic signatures to PDF documents quickly and securely.",

    //         keywords: [
    //             "sign PDF",
    //             "electronic signature PDF",
    //             "eSign PDF"
    //         ],
    //         image: '/og-image.png'
    //     }
    // }

];