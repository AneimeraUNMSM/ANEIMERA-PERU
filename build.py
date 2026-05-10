import os
import re

base_dir = r'c:\Users\Admin\Desktop\Pagina ANEIMERA PERU\stitch_aneimera_per_website_template\stitch_aneimera_per_website_template'
out_file = r'c:\Users\Admin\Desktop\Pagina ANEIMERA PERU\stitch_aneimera_per_website_template\index.html'

def get_body_content(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'aneimera_per_inicio_v2' in filepath:
        match = re.search(r'<!-- Hero Section -->(.*?)<!-- Footer -->', content, re.DOTALL)
        return match.group(1) if match else ''
    elif 'cap_tulos_nacionales_aneimera_per' in filepath:
        match = re.search(r'<main.*?>(.*?)</main>', content, re.DOTALL)
        return match.group(0) if match else ''
    elif 'eventos_y_agenda_aneimera_per' in filepath:
        match = re.search(r'<!-- Header Section -->(.*?)<!-- Footer -->', content, re.DOTALL)
        return match.group(1) if match else ''
    elif 'membres_a_aneimera_per' in filepath:
        match = re.search(r'<main.*?>(.*?)</main>', content, re.DOTALL)
        return match.group(0) if match else ''
    elif 'noticias_y_publicaciones_aneimera_per' in filepath:
        match = re.search(r'<main.*?>(.*?)</main>', content, re.DOTALL)
        return match.group(0) if match else ''
    return ''

inicio_html = get_body_content(os.path.join(base_dir, 'aneimera_per_inicio_v2', 'code.html'))
capitulos_html = get_body_content(os.path.join(base_dir, 'cap_tulos_nacionales_aneimera_per', 'code.html'))
eventos_html = get_body_content(os.path.join(base_dir, 'eventos_y_agenda_aneimera_per', 'code.html'))
membresia_html = get_body_content(os.path.join(base_dir, 'membres_a_aneimera_per', 'code.html'))
noticias_html = get_body_content(os.path.join(base_dir, 'noticias_y_publicaciones_aneimera_per', 'code.html'))

with open(os.path.join(base_dir, 'aneimera_per_inicio_v2', 'code.html'), 'r', encoding='utf-8') as f:
    inicio_full = f.read()
tailwind_match = re.search(r'<script id="tailwind-config">.*?</script>', inicio_full, re.DOTALL)
tailwind_config = tailwind_match.group(0) if tailwind_match else ''

footer_match = re.search(r'(<footer.*?>.*?</footer>)', inicio_full, re.DOTALL)
footer_html = footer_match.group(1) if footer_match else ''

html_template = f'''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>ANEIMERA PERÚ - Portal Integrado</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <style>
        .material-symbols-outlined {{
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }}
        .grid-pattern {{
            background-image: 
                linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
            background-size: 8px 8px;
        }}
        .circuit-overlay {{
            background-image: radial-gradient(#1a1c1c 1px, transparent 1px), radial-gradient(#1a1c1c 1px, transparent 1px);
            background-size: 32px 32px;
            background-position: 0 0, 16px 16px;
            opacity: 0.05;
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 0;
        }}
        .technical-grid {{
            background-image: 
                linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
            background-size: 64px 64px;
        }}
        .blueprint-grid {{
            background-image: 
                linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
            background-size: 32px 32px;
        }}
        .grid-bg-noticias {{
            background-size: 40px 40px;
            background-image: 
                linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        }}
        .cut-corner {{
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
        }}
        .circuit-pattern {{
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }}
        .circuit-overlay-eventos {{
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%23000000' stroke-width='0.5' stroke-opacity='0.1'/%3E%3Cpath d='M10 50h80M50 10v80' stroke='%23000000' stroke-width='0.5' stroke-opacity='0.1'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%23000000' fill-opacity='0.1'/%3E%3C/svg%3E");
            background-size: 50px 50px;
        }}
        .tab-content {{
            display: none;
        }}
        #tab-inicio {{
            display: block;
        }}
    </style>
    {tailwind_config}
</head>
<body class="bg-surface-container-lowest text-on-surface font-body-md min-h-screen pt-20">

    <!-- TopNavBar -->
    <nav class="fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-4 sm:px-6 md:px-10 lg:px-16 h-20 bg-surface-container-lowest border-b-2 border-on-surface transition-all duration-75 shadow-sm">
        <div class="text-2xl font-black tracking-tighter text-on-surface cursor-pointer" onclick="switchTab('inicio')">
            ANEIMERA PERÚ
        </div>
        <div class="hidden md:flex items-center gap-8 font-inter uppercase font-bold tracking-tight text-sm">
            <a class="tab-link nav-item text-primary-container border-b-2 border-primary-container pb-1 cursor-pointer" onclick="switchTab('inicio')" data-tab="inicio">Inicio</a>
            <a class="tab-link nav-item text-on-surface hover:text-primary-container transition-colors cursor-pointer" onclick="switchTab('capitulos')" data-tab="capitulos">Capítulos</a>
            <a class="tab-link nav-item text-on-surface hover:text-primary-container transition-colors cursor-pointer" onclick="switchTab('eventos')" data-tab="eventos">Eventos</a>
            <a class="tab-link nav-item text-on-surface hover:text-primary-container transition-colors cursor-pointer" onclick="switchTab('membresia')" data-tab="membresia">Membresía</a>
            <a class="tab-link nav-item text-on-surface hover:text-primary-container transition-colors cursor-pointer" onclick="switchTab('noticias')" data-tab="noticias">Noticias</a>
        </div>
        <div class="flex items-center gap-4">
            <span class="material-symbols-outlined text-on-surface hover:text-primary-container cursor-pointer" data-icon="search">search</span>
            <button class="bg-primary-container text-on-primary-container font-inter uppercase font-bold tracking-tight text-sm px-6 py-2 hover:bg-primary transition-all duration-75 scale-100 active:translate-y-0.5 cursor-pointer" onclick="switchTab('membresia')">
                UNIRSE
            </button>
        </div>
    </nav>

    <div id="tab-inicio" class="tab-content grid-pattern relative">
        {inicio_html}
    </div>

    <div id="tab-capitulos" class="tab-content relative bg-background text-on-background technical-grid min-h-screen">
        <div class="circuit-overlay"></div>
        <div class="relative z-10">
            {capitulos_html}
        </div>
    </div>

    <div id="tab-eventos" class="tab-content relative bg-background text-on-background">
        {eventos_html}
    </div>

    <div id="tab-membresia" class="tab-content blueprint-grid">
        {membresia_html}
    </div>

    <div id="tab-noticias" class="tab-content grid-bg-noticias">
        {noticias_html}
    </div>

    {footer_html}

    <script>
    function switchTab(tabId) {{
        document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
        document.getElementById('tab-' + tabId).style.display = 'block';
        
        document.querySelectorAll('.tab-link').forEach(el => {{
            el.classList.remove('text-primary-container', 'border-b-2', 'border-primary-container', 'pb-1');
            el.classList.add('text-on-surface');
        }});
        
        const activeLink = document.querySelector(`.tab-link[data-tab="${{tabId}}"]`);
        if(activeLink) {{
            activeLink.classList.remove('text-on-surface');
            activeLink.classList.add('text-primary-container', 'border-b-2', 'border-primary-container', 'pb-1');
        }}
        window.scrollTo(0, 0);
    }}
    </script>
</body>
</html>
'''

with open(out_file, 'w', encoding='utf-8') as f:
    f.write(html_template)
print('Successfully generated index.html')
