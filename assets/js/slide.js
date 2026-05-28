function carroussel() {
    const technologies = [
        { name: "HTML", img: "assets/img/technologies/html.png" },
        { name: "CSS", img: "assets/img/technologies/css.png" },
        { name: "JavaScript", img: "assets/img/technologies/javascript.png" },
        { name: "TypeScript", img: "assets/img/technologies/typescript.png", icon: "bi-filetype-tsx" },
        { name: "Node.js", img: "assets/img/technologies/node-js.png" },
        { name: "Express", img: "assets/img/technologies/express-js.png" },
        { name: "NestJS", img: "assets/img/technologies/NestJS.svg", icon: "bi-diagram-3" },
        { name: "Python", img: "assets/img/technologies/python.png" },
        { name: "Flask", img: "assets/img/technologies/flask.png", icon: "bi-cup-hot" },
        { name: "FastAPI", img: "assets/img/technologies/fastapi.png", icon: "bi-lightning-charge" },
        { name: "React", img: "assets/img/technologies/react.png", icon: "bi-layers" },
        {
            name: "Next.js",
            imgCandidates: [
                "assets/img/technologies/nextjs.png",
                "assets/img/technologies/nextjs.svg",
                "assets/img/technologies/next-js.png",
                "assets/img/technologies/next-js.svg",
                "assets/img/technologies/next.png",
                "assets/img/technologies/next.svg"
            ],
            icon: "bi-window"
        },
        { name: "Tailwind CSS", img: "assets/img/technologies/tailwind.svg", icon: "bi-palette" },
        { name: "PostgreSQL", img: "assets/img/technologies/postgresql.png", icon: "bi-database" },
        { name: "MongoDB", img: "assets/img/technologies/mongodb.svg" },
        { name: "MySQL", img: "assets/img/technologies/mysql.png" },
        { name: "Supabase", img: "assets/img/technologies/supabase.webp", icon: "bi-cloud-check" },
        { name: "Firebase", img: "assets/img/technologies/firebase.webp" },
        { name: "Docker", img: "assets/img/technologies/docker.png", icon: "bi-box-seam" },
        { name: "AWS Lambda", img: "assets/img/technologies/lambda.png", icon: "bi-cloud-lightning" },
        { name: "Vercel", img: "assets/img/technologies/vercel.svg" },
        { name: "Railway", img: "assets/img/technologies/railway.svg" },
        { name: "Cloudflare", img: "assets/img/technologies/cloudflare.webp" },
        { name: "Git", img: "assets/img/technologies/git.png" }
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
            icon.className = `bi ${tech.icon ?? "bi-code-slash"}`;
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