/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll(".page-section");

const menuBtn =
    document.getElementById("menuBtn");

const navbar =
    document.querySelector(".navbar");


/* =========================================================
   PROJECT ELEMENTS
========================================================= */

const projectCategories =
    document.getElementById("projectCategories");

const projectList =
    document.getElementById("projectList");

const projectGrid =
    document.getElementById("projectGrid");

const backProjects =
    document.getElementById("backProjects");

const projectCategoryTitle =
    document.getElementById(
        "projectCategoryTitle"
    );


/* =========================================================
   VIEW PROJECT MODAL
========================================================= */

const projectModal =
    document.getElementById(
        "projectModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalMedia =
    document.getElementById(
        "modalMedia"
    );

const modalType =
    document.getElementById(
        "modalType"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalTech =
    document.getElementById(
        "modalTech"
    );

const modalActions =
    document.getElementById(
        "modalActions"
    );


/* =========================================================
   ADD PROJECT MODAL
========================================================= */

const addProjectBtn =
    document.getElementById(
        "addProjectBtn"
    );

const addProjectModal =
    document.getElementById(
        "addProjectModal"
    );

const addModalClose =
    document.getElementById(
        "addModalClose"
    );

const addProjectForm =
    document.getElementById(
        "addProjectForm"
    );

const newProjectTitle =
    document.getElementById(
        "newProjectTitle"
    );

const newProjectDescription =
    document.getElementById(
        "newProjectDescription"
    );

const newProjectTech =
    document.getElementById(
        "newProjectTech"
    );

const newProjectLink =
    document.getElementById(
        "newProjectLink"
    );

const newProjectFile =
    document.getElementById(
        "newProjectFile"
    );


/* =========================================================
   CHECK REQUIRED ELEMENTS
========================================================= */

if (!projectCategories) {
    console.warn(
        "projectCategories element not found."
    );
}

if (!projectList) {
    console.warn(
        "projectList element not found."
    );
}


/* =========================================================
   DEFAULT PROJECTS
========================================================= */

/*
   Dito mo pwedeng ilagay ang
   sariling projects mo manually.

   Sa ngayon EMPTY muna
   dahil ikaw ang mag-a-add.
*/

const projects = {

    systems: [],

    websites: [],

    videos: []

};


/* =========================================================
   CURRENT CATEGORY
========================================================= */

let currentCategory =
    "systems";


/* =========================================================
   INDEXEDDB
========================================================= */

const DB_NAME =
    "BeniePortfolioDB";

const DB_VERSION =
    1;

const STORE_NAME =
    "projects";

let db = null;


/* =========================================================
   OPEN DATABASE
========================================================= */

function openDatabase() {

    return new Promise(
        (resolve, reject) => {

            const request =
                indexedDB.open(
                    DB_NAME,
                    DB_VERSION
                );


            request.onupgradeneeded =
                function(event) {

                    const database =
                        event.target.result;


                    if (
                        !database.objectStoreNames.contains(
                            STORE_NAME
                        )
                    ) {

                        database.createObjectStore(
                            STORE_NAME,
                            {
                                keyPath: "id"
                            }
                        );

                    }

                };


            request.onsuccess =
                function(event) {

                    db =
                        event.target.result;

                    resolve(db);

                };


            request.onerror =
                function() {

                    reject(
                        request.error
                    );

                };

        }
    );

}


/* =========================================================
   GET ALL PROJECTS
========================================================= */

function getAllProjects() {

    return new Promise(
        (resolve, reject) => {

            if (!db) {

                reject(
                    new Error(
                        "Database is not ready."
                    )
                );

                return;

            }


            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readonly"
                );


            const store =
                transaction.objectStore(
                    STORE_NAME
                );


            const request =
                store.getAll();


            request.onsuccess =
                function() {

                    resolve(
                        request.result
                    );

                };


            request.onerror =
                function() {

                    reject(
                        request.error
                    );

                };

        }
    );

}


/* =========================================================
   SAVE PROJECT
========================================================= */

function saveProject(project) {

    return new Promise(
        (resolve, reject) => {

            if (!db) {

                reject(
                    new Error(
                        "Database is not ready."
                    )
                );

                return;

            }


            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    STORE_NAME
                );


            const request =
                store.put(project);


            request.onsuccess =
                function() {

                    resolve();

                };


            request.onerror =
                function() {

                    reject(
                        request.error
                    );

                };

        }
    );

}


/* =========================================================
   DELETE PROJECT
========================================================= */

function deleteFromDatabase(id) {

    return new Promise(
        (resolve, reject) => {

            if (!db) {

                reject(
                    new Error(
                        "Database is not ready."
                    )
                );

                return;

            }


            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readwrite"
                );


            const store =
                transaction.objectStore(
                    STORE_NAME
                );


            const request =
                store.delete(id);


            request.onsuccess =
                function() {

                    resolve();

                };


            request.onerror =
                function() {

                    reject(
                        request.error
                    );

                };

        }
    );

}


/* =========================================================
   LOAD PROJECTS
========================================================= */

async function loadProjects() {

    try {

        const savedProjects =
            await getAllProjects();


        savedProjects.forEach(
            project => {

                if (
                    projects[
                        project.category
                    ]
                ) {

                    projects[
                        project.category
                    ].push(
                        project
                    );

                }

            }
        );

    }

    catch(error) {

        console.error(
            "Could not load projects:",
            error
        );

    }

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

    sections.forEach(
        section => {

            section.classList.remove(
                "active-section"
            );

        }
    );


    const selectedSection =
        document.getElementById(
            pageId
        );


    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );

    }


    navLinks.forEach(
        link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                "#" + pageId
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );


    if (pageId === "projects") {

        showProjectCategories();

    }


    if (navbar) {

        navbar.classList.remove(
            "show"
        );

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   NAVIGATION CLICK
========================================================= */

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const pageId =
                    this
                        .getAttribute("href")
                        .replace("#", "");


                showPage(pageId);

            }
        );

    }
);


/* =========================================================
   HOME BUTTONS
========================================================= */

document.querySelectorAll(
    'a[href="#projects"], a[href="#contact"]'
).forEach(
    button => {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();


                const pageId =
                    this
                        .getAttribute("href")
                        .replace("#", "");


                showPage(pageId);

            }
        );

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function() {

            navbar.classList.toggle(
                "show"
            );

        }
    );

}


/* =========================================================
   SHOW PROJECT CATEGORIES
========================================================= */

function showProjectCategories() {

    if (!projectCategories) {
        return;
    }


    projectCategories.style.display =
        "grid";


    projectCategories.style.opacity =
        "1";


    projectCategories.style.transform =
        "translateY(0)";


    if (projectList) {

        projectList.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

const categoryButtons =
    document.querySelectorAll(
        ".category-card"
    );


categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function() {

                const category =
                    this.dataset.category;


                openCategory(category);

            }
        );

    }
);


/* =========================================================
   OPEN CATEGORY
========================================================= */

function openCategory(category) {

    currentCategory =
        category;


    if (!projectCategories) {
        return;
    }


    /*
       CATEGORY EXIT ANIMATION
    */

    projectCategories.style.opacity =
        "0";


    projectCategories.style.transform =
        "translateY(-20px) scale(.98)";


    setTimeout(
        function() {

            projectCategories.style.display =
                "none";


            if (projectList) {

                projectList.classList.remove(
                    "hidden"
                );


                projectList.style.opacity =
                    "0";


                projectList.style.transform =
                    "translateY(25px)";

            }


            /*
               CATEGORY TITLE
            */

            let title =
                "Projects";


            if (
                category ===
                "systems"
            ) {

                title =
                    "Systems";

            }


            if (
                category ===
                "websites"
            ) {

                title =
                    "Websites";

            }


            if (
                category ===
                "videos"
            ) {

                title =
                    "Videos";

            }


            if (projectCategoryTitle) {

                projectCategoryTitle.textContent =
                    title;

            }


            /*
               RENDER
            */

            renderProjects(
                category
            );


            /*
               ENTER ANIMATION
            */

            setTimeout(
                function() {

                    if (projectList) {

                        projectList.style.opacity =
                            "1";

                        projectList.style.transform =
                            "translateY(0)";

                    }

                },
                50
            );

        },
        250
    );

}


/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects(category) {

    if (!projectGrid) {
        return;
    }


    projectGrid.innerHTML =
        "";


    const categoryProjects =
        projects[category] || [];


    /*
       EMPTY
    */

    if (
        categoryProjects.length ===
        0
    ) {

        projectGrid.innerHTML = `

            <div class="empty-projects">

                <i class="fa-solid fa-folder-open"></i>

                <h3>
                    No Projects Yet
                </h3>

                <p>
                    You don't have any
                    ${category}
                    projects yet.
                </p>

            </div>

        `;

        return;

    }


    /*
       PROJECT CARDS
    */

    categoryProjects.forEach(
        (project, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "project-item";


            card.style.animationDelay =
                `${index * 0.12}s`;


            /*
               VIDEO
            */

            if (project.video) {

                card.innerHTML = `

                    <div class="project-item-image">

                        <video
                            muted
                            preload="metadata"
                        >

                            <source
                                src="${project.video}"
                                type="video/mp4"
                            >

                        </video>

                    </div>


                    <div class="project-item-info">

                        <span
                            class="project-item-type"
                        >
                            ${project.type}
                        </span>


                        <h3>
                            ${project.title}
                        </h3>


                        <p>
                            ${project.description}
                        </p>


                        <div class="project-buttons">

                            <button
                                class="project-view-btn"
                            >

                                View Project

                                <i
                                    class="fa-solid fa-arrow-right"
                                ></i>

                            </button>


                            <button
                                class="project-delete-btn"
                                title="Delete Project"
                            >

                                <i
                                    class="fa-solid fa-trash"
                                ></i>

                            </button>

                        </div>

                    </div>

                `;

            }


            /*
               IMAGE
            */

            else {

                card.innerHTML = `

                    <div class="project-item-image">

                        <img
                            src="${project.image || ""}"
                            alt="${project.title}"
                        >

                    </div>


                    <div class="project-item-info">

                        <span
                            class="project-item-type"
                        >
                            ${project.type}
                        </span>


                        <h3>
                            ${project.title}
                        </h3>


                        <p>
                            ${project.description}
                        </p>


                        <div class="project-buttons">

                            <button
                                class="project-view-btn"
                            >

                                View Project

                                <i
                                    class="fa-solid fa-arrow-right"
                                ></i>

                            </button>


                            <button
                                class="project-delete-btn"
                                title="Delete Project"
                            >

                                <i
                                    class="fa-solid fa-trash"
                                ></i>

                            </button>

                        </div>

                    </div>

                `;

            }


            /*
               VIEW BUTTON
            */

            const viewButton =
                card.querySelector(
                    ".project-view-btn"
                );


            if (viewButton) {

                viewButton.addEventListener(
                    "click",
                    function() {

                        openProject(
                            project
                        );

                    }
                );

            }


            /*
               DELETE BUTTON
            */

            const deleteButton =
                card.querySelector(
                    ".project-delete-btn"
                );


            if (deleteButton) {

                deleteButton.addEventListener(
                    "click",
                    async function(event) {

                        event.stopPropagation();


                        const confirmed =
                            confirm(
                                `Delete "${project.title}"?`
                            );


                        if (!confirmed) {
                            return;
                        }


                        try {

                            await deleteFromDatabase(
                                project.id
                            );


                            projects[
                                category
                            ] =
                                projects[
                                    category
                                ].filter(
                                    item =>
                                        item.id !==
                                        project.id
                                );


                            renderProjects(
                                category
                            );

                        }

                        catch(error) {

                            console.error(
                                error
                            );

                            alert(
                                "Could not delete the project."
                            );

                        }

                    }
                );

            }


            projectGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   BACK TO CATEGORIES
========================================================= */

if (backProjects) {

    backProjects.addEventListener(
        "click",
        function() {

            if (!projectList) {
                return;
            }


            projectList.style.opacity =
                "0";


            projectList.style.transform =
                "translateY(20px)";


            setTimeout(
                function() {

                    projectList.classList.add(
                        "hidden"
                    );


                    projectCategories.style.display =
                        "grid";


                    projectCategories.style.opacity =
                        "0";


                    projectCategories.style.transform =
                        "translateY(20px)";


                    setTimeout(
                        function() {

                            projectCategories.style.opacity =
                                "1";


                            projectCategories.style.transform =
                                "translateY(0)";

                        },
                        50
                    );

                },
                250
            );

        }
    );

}


/* =========================================================
   OPEN PROJECT
========================================================= */

function openProject(project) {

    if (!projectModal) {
        return;
    }


    modalMedia.innerHTML =
        "";

    modalActions.innerHTML =
        "";


    modalType.textContent =
        project.type;


    modalTitle.textContent =
        project.title;


    modalDescription.textContent =
        project.description;


    modalTech.textContent =
        project.tech ||
        "Not specified";


    /*
       VIDEO
    */

    if (project.video) {

        const video =
            document.createElement(
                "video"
            );


        video.controls =
            true;


        video.autoplay =
            true;


        video.playsInline =
            true;


        const source =
            document.createElement(
                "source"
            );


        source.src =
            project.video;


        source.type =
            "video/mp4";


        video.appendChild(
            source
        );


        modalMedia.appendChild(
            video
        );

    }


    /*
       IMAGE
    */

    else if (project.image) {

        const image =
            document.createElement(
                "img"
            );


        image.src =
            project.image;


        image.alt =
            project.title;


        modalMedia.appendChild(
            image
        );

    }


    /*
       WEBSITE LINK
    */

    if (
        project.demo &&
        project.demo.trim() !== ""
    ) {

        const demoButton =
            document.createElement(
                "a"
            );


        demoButton.href =
            project.demo;


        demoButton.target =
            "_blank";


        demoButton.rel =
            "noopener noreferrer";


        demoButton.className =
            "modal-action";


        demoButton.innerHTML = `

            <i class="fa-solid fa-globe"></i>

            Open Website

        `;


        modalActions.appendChild(
            demoButton
        );

    }


    /*
       SOURCE CODE
    */

    if (
        project.source &&
        project.source.trim() !== ""
    ) {

        const sourceButton =
            document.createElement(
                "a"
            );


        sourceButton.href =
            project.source;


        sourceButton.target =
            "_blank";


        sourceButton.rel =
            "noopener noreferrer";


        sourceButton.className =
            "modal-action outline";


        sourceButton.innerHTML = `

            <i class="fa-brands fa-github"></i>

            Source Code

        `;


        modalActions.appendChild(
            sourceButton
        );

    }


    projectModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE PROJECT MODAL
========================================================= */

function closeProjectModal() {

    if (!projectModal) {
        return;
    }


    projectModal.classList.remove(
        "active"
    );


    const video =
        modalMedia.querySelector(
            "video"
        );


    if (video) {

        video.pause();

        video.src = "";

    }


    document.body.style.overflow =
        "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


if (projectModal) {

    projectModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                projectModal
            ) {

                closeProjectModal();

            }

        }
    );

}


/* =========================================================
   ADD PROJECT MODAL
========================================================= */

if (addProjectBtn) {

    addProjectBtn.addEventListener(
        "click",
        function() {

            if (!addProjectModal) {
                return;
            }


            addProjectModal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        }
    );

}


/* =========================================================
   CLOSE ADD PROJECT MODAL
========================================================= */

function closeAddProjectModal() {

    if (!addProjectModal) {
        return;
    }


    addProjectModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


if (addModalClose) {

    addModalClose.addEventListener(
        "click",
        closeAddProjectModal
    );

}


if (addProjectModal) {

    addProjectModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                addProjectModal
            ) {

                closeAddProjectModal();

            }

        }
    );

}


/* =========================================================
   ADD PROJECT
========================================================= */

if (addProjectForm) {

    addProjectForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const title =
                newProjectTitle.value.trim();


            const description =
                newProjectDescription.value.trim();


            const tech =
                newProjectTech.value.trim();


            const websiteLink =
                newProjectLink.value.trim();


            const file =
                newProjectFile.files[0];


            /*
               VALIDATION
            */

            if (!title) {

                alert(
                    "Please enter a project title."
                );

                return;

            }


            if (!description) {

                alert(
                    "Please enter a project description."
                );

                return;

            }


            /*
               PROJECT TYPE
            */

            let type =
                "SYSTEM";


            if (
                currentCategory ===
                "websites"
            ) {

                type =
                    "WEBSITE";

            }


            if (
                currentCategory ===
                "videos"
            ) {

                type =
                    "VIDEO";

            }


            /*
               PROJECT OBJECT
            */

            const newProject = {

                id:
                    Date.now(),

                category:
                    currentCategory,

                title:
                    title,

                description:
                    description,

                tech:
                    tech ||
                    "Not specified",

                type:
                    type,

                demo:
                    websiteLink,

                source:
                    "",

                image:
                    "",

                video:
                    "",

                file:
                    null

            };


            /*
               FILE
            */

            if (file) {

                /*
                   Read file as Base64
                   so IndexedDB can store it.
                */

                try {

                    const fileData =
                        await fileToDataURL(
                            file
                        );


                    if (
                        file.type.startsWith(
                            "video/"
                        )
                    ) {

                        newProject.video =
                            fileData;

                    }

                    else {

                        newProject.image =
                            fileData;

                    }

                }

                catch(error) {

                    console.error(
                        error
                    );


                    alert(
                        "Could not read the uploaded file."
                    );


                    return;

                }

            }


            /*
               SAVE DATABASE
            */

            try {

                await saveProject(
                    newProject
                );


                /*
                   Add to current array
                */

                projects[
                    currentCategory
                ].push(
                    newProject
                );


                /*
                   Refresh display
                */

                renderProjects(
                    currentCategory
                );


                /*
                   Reset form
                */

                addProjectForm.reset();


                /*
                   Close modal
                */

                closeAddProjectModal();


                /*
                   Success
                */

                alert(
                    "Project added successfully!"
                );

            }

            catch(error) {

                console.error(
                    "Save error:",
                    error
                );


                alert(
                    "Could not save the project."
                );

            }

        }
    );

}


/* =========================================================
   FILE TO DATA URL
========================================================= */

function fileToDataURL(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                function() {

                    resolve(
                        reader.result
                    );

                };


            reader.onerror =
                function() {

                    reject(
                        reader.error
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeProjectModal();

            closeAddProjectModal();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

async function initializePortfolio() {

    try {

        await openDatabase();

        await loadProjects();

    }

    catch(error) {

        console.error(
            "Database initialization failed:",
            error
        );

    }


    showPage(
        "home"
    );

}


/* =========================================================
   START
========================================================= */

initializePortfolio();
