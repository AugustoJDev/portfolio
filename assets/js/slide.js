function carroussel() {
    const technologies = [
        { name: "Conciliação Bancária", icon: "bi-bank" },
        { name: "Contabilidade Gerencial", icon: "bi-calculator" },
        { name: "Análise de Custos", icon: "bi-pie-chart" },
        { name: "Fechamento Contábil", icon: "bi-journal-check" },
        { name: "Controle Financeiro", icon: "bi-wallet2" },
        { name: "Provisões", icon: "bi-cash-coin" },
        { name: "Compliance", icon: "bi-shield-check" },
        { name: "Departamento Pessoal", icon: "bi-people" },
        { name: "Power BI", icon: "bi-bar-chart-line" },
        { name: "Power Query", icon: "bi-funnel" },
        { name: "Excel Avançado", icon: "bi-file-earmark-spreadsheet" },
        { name: "Python (Pandas)", img: "assets/img/technologies/python.png", icon: "bi-cpu" },
        { name: "SQL", icon: "bi-database" },
        { name: "PostgreSQL", img: "assets/img/technologies/postgresql.png", icon: "bi-database" },
        { name: "Power Automate", icon: "bi-lightning-charge" },
        { name: "Integração de APIs", icon: "bi-diagram-3" },
        { name: "AlterData", icon: "bi-journal-text" },
        { name: "e-CAC", icon: "bi-building" },
        { name: "eSocial", icon: "bi-file-earmark-check" },
        { name: "DCTFWeb", icon: "bi-file-earmark-text" },
        { name: "Conectividade Social", icon: "bi-link-45deg" },
        { name: "Giss", icon: "bi-receipt" }
    ];

    const slideTrack = document.querySelector(".slide-track");
    if (!slideTrack) return;

    slideTrack.innerHTML = "";

    // Create original slides
    technologies.forEach(createSlide);
    // Duplicate slides for infinite loop
    technologies.forEach(createSlide);

    function createSlide(tech) {
        const slide = document.createElement("div");
        slide.className = "slide";

        const iconWrap = document.createElement("div");
        iconWrap.className = "tech-icon";

        const renderIconFallback = () => {
            iconWrap.innerHTML = "";
            const icon = document.createElement("i");
            icon.className = `bi ${tech.icon ?? "bi-graph-up"}`;
            icon.setAttribute("aria-hidden", "true");
            iconWrap.appendChild(icon);
        };

        const imageSources = [
            ...(tech.img ? [tech.img] : []),
            ...(Array.isArray(tech.imgCandidates) ? tech.imgCandidates : [])
        ].filter(Boolean);

        const tryRenderImageAtIndex = (index) => {
            if (index >= imageSources.length) {
                renderIconFallback();
                return;
            }

            iconWrap.innerHTML = "";

            const img = document.createElement("img");
            img.src = imageSources[index];
            img.alt = tech.name;
            img.loading = "lazy";
            img.addEventListener(
                "error",
                () => {
                    tryRenderImageAtIndex(index + 1);
                },
                { once: true }
            );
            iconWrap.appendChild(img);
        };

        if (imageSources.length > 0) {
            tryRenderImageAtIndex(0);
        } else {
            renderIconFallback();
        }

        const label = document.createElement("div");
        label.className = "tech-label";
        label.textContent = tech.name;

        slide.appendChild(iconWrap);
        slide.appendChild(label);
        slideTrack.appendChild(slide);
    }
}

document.addEventListener("DOMContentLoaded", carroussel);