const fs = require('fs');

const colorMap = {
    'Merge Documents': 'text-indigo-500',
    'Split Documents': 'text-indigo-500',
    'Compress Documents': 'text-indigo-500',
    'Compress PDF': 'text-red-500',
    'Compress JPG': 'text-yellow-500',
    'Compress PNG': 'text-yellow-400',
    'Compress WEBP': 'text-green-400',
    'Compress Images': 'text-yellow-500',
    'Compress Word Document': 'text-blue-500',
    'Convert Documents': 'text-blue-500',
    'JPG to PDF': 'text-yellow-500',
    'IMG to PDF': 'text-yellow-400',
    'WORD to PDF': 'text-blue-500',
    'POWERPOINT to PDF': 'text-orange-500',
    'EXCEL to PDF': 'text-green-500',
    'HTML to PDF': 'text-blue-400',
    'PDF to JPG': 'text-yellow-500',
    'PDF to WORD': 'text-blue-500',
    'PDF to POWERPOINT': 'text-orange-500',
    'PDF to EXCEL': 'text-green-500',
};

const filePath = 'd:\\Docvia\\frontend\\lib\\tools.data.ts';
let content = fs.readFileSync(filePath, 'utf8');

for (const [name, color] of Object.entries(colorMap)) {
    const regex = new RegExp(`(name:\\s*"${name}",[\\s\\S]*?icon:\\s*[a-zA-Z0-9]+,)`, 'g');
    content = content.replace(regex, `$1\n        color: "${color}",`);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Colors added!');
