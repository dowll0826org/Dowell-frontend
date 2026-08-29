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
            title: "Merge PDF Files Online Free | Dowll PDF Merger",
            description: "Easily combine multiple PDF files into a single document online for free. Secure, fast, and easy-to-use PDF merger tool by Dowll.",

            keywords: [
                "merge pdf",
                "combine pdf",
                "merge pdf online",
                "combine pdf files",
                "free pdf merger",
                "join pdf pages"
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
            title: "Split PDF Pages Online Free | Dowll PDF Splitter",

            description: "Extract pages from your PDF or split PDF into multiple files easily. Free online PDF splitter tool by Dowll for fast document separation.",

            keywords: [
                "split pdf",
                "extract pdf pages",
                "pdf splitter",
                "separate pdf pages",
                "cut pdf",
                "split pdf online free"
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
                    title: "Compress PDF Online - Reduce PDF File Size Free",
                    description: "Compress your PDF files to reduce file size without losing quality. Best free online PDF optimizer for easy sharing and fast uploads.",
                    keywords: ["compress pdf", "reduce pdf size", "pdf optimizer", "shrink pdf", "compress pdf online", "make pdf smaller"],
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
                    title: "Compress JPG Images Online Free | Reduce JPG Size",
                    description: "Easily compress JPG and JPEG images to smaller sizes online while preserving image quality. Free, fast, and secure JPG compressor.",
                    keywords: ["compress jpg", "reduce jpg size", "jpg compressor", "shrink jpg", "optimize jpg online", "image compressor"],
                    image: "/og-image.png"
                }
            },
            {
                name: "Compress JPEG",
                slug: "compress-jpeg",
                path: "/compress-jpeg",
                icon: Image,
                color: "text-yellow-500",
                category: "pdf_image",
                metadata: {
                    title: "Compress JPEG Images Online Free | Reduce JPEG Size",
                    description: "Optimize and compress JPEG images to reduce file size with zero loss in visual quality. Fast, free online JPEG compressor by Dowll.",
                    keywords: ["compress jpeg", "reduce jpeg size", "jpeg compressor", "shrink jpeg file", "optimize jpeg online"],
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
                    title: "Compress PNG Images Online Free | PNG Optimizer",
                    description: "Compress PNG images for web and mobile without losing transparency or quality. Reduce PNG file size efficiently with our free online tool.",
                    keywords: ["compress png", "reduce png size", "png optimizer", "shrink png file", "compress png online"],
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
                    title: "Compress WEBP Images Online Free | WEBP Optimizer",
                    description: "Optimize and compress WEBP images for faster loading websites and smaller file sizes. Free online WEBP compressor tool by Dowll.",
                    keywords: ["compress webp", "webp optimizer", "reduce webp size", "shrink webp", "compress webp image online"],
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
                    title: "Free Online Image Compressor | Compress JPG, PNG, WEBP",
                    description: "Compress your JPG, PNG, WEBP, and other image formats online for free. Reduce image file size without losing quality for faster web performance.",
                    keywords: ["image compressor", "compress images online", "reduce image size", "shrink image file", "bulk image compressor"],
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
                    title: "Compress Word Files Online Free | Reduce DOCX Size",
                    description: "Reduce the file size of your Word documents (DOC, DOCX) online for free. Keep original formatting while making Word files smaller.",
                    keywords: ["compress word", "compress docx", "reduce word file size", "shrink word document", "word file optimizer"],
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
                    title: "Compress Excel Files Online Free | Reduce XLSX Size",
                    description: "Easily compress Excel spreadsheets (XLS, XLSX) online to reduce file size. Secure and free Excel file compressor tool.",
                    keywords: ["compress excel", "reduce xlsx size", "excel optimizer", "shrink excel file", "compress xls online"],
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
                    title: "Compress PowerPoint Files Online Free | Reduce PPT Size",
                    description: "Compress large PowerPoint presentations (PPT, PPTX) to reduce file size. Perfect for emailing and sharing slide decks.",
                    keywords: ["compress powerpoint", "compress ppt", "reduce ppt size", "shrink powerpoint file", "powerpoint optimizer"],
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
                    title: "JPG to PDF Converter Free | Convert Image to PDF",
                    description: "Convert JPG images to PDF documents instantly online. Free, fast, and secure JPG to PDF converter with no installation required.",
                    keywords: ["jpg to pdf", "image to pdf", "convert jpg to pdf", "jpg to pdf converter online", "free jpg to pdf"],
                    image: "/og-image.png"
                }
            },
            {
                name: "JPEG to PDF",
                slug: "jpeg-to-pdf",
                path: "/jpeg-to-pdf",
                icon: Image,
                color: "text-yellow-500",
                category: "to_pdf",
                metadata: {
                    title: "JPEG to PDF Converter Free | Dowll",
                    description: "Quickly convert JPEG images into a single PDF document. Secure online JPEG to PDF converter. Combine multiple JPEGs easily.",
                    keywords: ["jpeg to pdf", "image to pdf", "convert jpeg to pdf", "jpeg to pdf converter online"],
                    image: "/og-image.png"
                }
            },
            {
                name: "PNG to PDF",
                slug: "png-to-pdf",
                path: "/png-to-pdf",
                icon: Image,
                color: "text-yellow-400",
                category: "to_pdf",
                metadata: {
                    title: "PNG to PDF Converter Online Free",
                    description: "Convert PNG image files to high-quality PDF documents. Simple, fast, and free online PNG to PDF converter tool by Dowll.",
                    keywords: ["png to pdf", "convert png to pdf", "image to pdf", "png to pdf converter online", "free png to pdf"],
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
                    title: "Word to PDF Converter Online Free | DOCX to PDF",
                    description: "Convert Word documents (DOC and DOCX) to PDF online while preserving formatting. Free and easy-to-use Word to PDF converter.",
                    keywords: ["word to pdf", "docx to pdf", "doc to pdf", "convert word to pdf", "free word to pdf converter online"],
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
                    title: "PowerPoint to PDF Converter Online Free | PPT to PDF",
                    description: "Convert PowerPoint presentations (PPT, PPTX) to PDF format for easy sharing. Keep slide layouts perfectly intact with our free converter.",
                    keywords: ["ppt to pdf", "powerpoint to pdf", "convert ppt to pdf", "powerpoint converter", "free ppt to pdf online"],
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
                    title: "Excel to PDF Converter Online Free | XLS to PDF",
                    description: "Convert Excel spreadsheets (XLS, XLSX) into easy-to-read PDF documents. Free online Excel to PDF converter tool.",
                    keywords: ["excel to pdf", "convert excel to pdf", "xls to pdf", "xlsx to pdf", "free excel to pdf converter online"],
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
                    title: "PDF to JPG Converter Online Free | Dowll",
                    description: "Convert PDF pages to high-quality JPG images instantly. Extract images from PDF or convert entire documents to JPGs free online.",
                    keywords: ["pdf to jpg", "convert pdf to image", "pdf to jpg converter", "extract images from pdf", "free pdf to jpg"],
                    image: "/og-image.png"
                }
            },
            {
                name: "PDF to JPEG",
                slug: "pdf-to-jpeg",
                path: "/pdf-to-jpeg",
                icon: Image,
                color: "text-yellow-500",
                category: "from_pdf",
                metadata: {
                    title: "PDF to JPEG Converter Online Free",
                    description: "Easily convert your PDF files into individual JPEG images. High resolution, fast, and free PDF to JPEG converter.",
                    keywords: ["pdf to jpeg", "convert pdf to jpeg image", "pdf to jpeg converter online", "free pdf to jpeg"],
                    image: "/og-image.png"
                }
            },
            {
                name: "PDF to PNG",
                slug: "pdf-to-png",
                path: "/pdf-to-png",
                icon: Image,
                color: "text-yellow-400",
                category: "from_pdf",
                metadata: {
                    title: "PDF to PNG Converter Online Free | High Quality",
                    description: "Convert PDF documents to PNG images with transparent backgrounds if supported. High-quality and free online PDF to PNG tool.",
                    keywords: ["pdf to png", "convert pdf to png", "pdf to png converter", "free pdf to png online"],
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
                    title: "PDF to Word Converter Online Free | Dowll",
                    description: "Convert PDF documents into editable Word (DOCX) files. Keep formatting and text intact. Fast and 100% free PDF to Word tool.",
                    keywords: ["pdf to word", "convert pdf to docx", "pdf to word converter free", "editable word from pdf", "pdf to doc"],
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
                    title: "PDF to PowerPoint Converter Online Free | PDF to PPT",
                    description: "Convert PDF files into editable PowerPoint (PPTX) presentations. Create perfect slides from PDFs quickly and easily.",
                    keywords: ["pdf to ppt", "pdf to powerpoint", "convert pdf to powerpoint", "pdf to pptx", "free pdf to ppt converter"],
                    image: "/og-image.png"
                }
            },
            // {
            //     name: "PDF to EXCEL",
            //     slug: "pdf-to-excel",
            //     path: "/pdf-to-excel",
            //     icon: Table,
            //     color: "text-green-500",
            //     category: "from_pdf",
            //     metadata: {
            //         title: "PDF to Excel Converter  ",
            //         description: "Convert PDF documents into editable Excel spreadsheets.",
            //         keywords: ["pdf to excel", "pdf to xlsx"],
            //         image: "/og-image.png"
            //     }
            // },
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
            title: "Free Online PDF Editor | Edit PDF Files Easily",

            description: "Edit PDF documents directly in your browser. Add text, annotations, signatures, and modifications securely for free with Dowll PDF Editor.",

            keywords: [
                "edit pdf",
                "pdf editor",
                "modify pdf online",
                "free online pdf editor",
                "write on pdf",
                "add text to pdf"
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
            title: "Organize PDF Pages Online Free | Reorder & Manage",

            description: "Easily sort, reorder, delete, and organize PDF pages online. Best free tool to manage and rearrange your PDF documents.",

            keywords: [
                "organize pdf",
                "reorder pdf pages",
                "pdf manager",
                "sort pdf pages",
                "delete pdf pages",
                "manage pdf online free"
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
                    title: "Add Watermark to PDF Online Free | Dowll",
                    description: "Protect your documents by adding text or image watermarks to PDF files. Secure, easy, and free online PDF watermarking tool.",

                    keywords: [
                        "add watermark pdf",
                        "pdf watermark",
                        "insert watermark in pdf",
                        "watermark pdf online",
                        "stamp pdf",
                        "add logo to pdf"
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