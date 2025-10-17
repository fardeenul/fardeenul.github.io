// ===========================
// GitHub API Projects Fetcher
// ===========================

// Configuration
const GITHUB_USERNAME = 'fardeenul';
const FEATURED_REPOS = [
    'SQL_worksample',
    'Optimizing-Sales-Strategy',
    'Test-Cricket-Analysis',
    'Tableau' // Will show Tableau Public link instead
];

// Tech stack categorization based on repo names and languages
const TECH_CATEGORIES = {
    'SQL_worksample': {
        category: 'SQL Development',
        icon: 'database',
        customDescription: 'Database queries and solutions demonstrating SQL proficiency',
        techStack: ['SQL', 'Database Design', 'Query Optimization']
    },
    'Optimizing-Sales-Strategy': {
        category: 'Business Intelligence',
        icon: 'chart-line',
        customDescription: 'Sales analysis for office stationery line delivering actionable insights',
        techStack: ['R', 'Statistical Analysis', 'Business Intelligence']
    },
    'Test-Cricket-Analysis': {
        category: 'Python Development',
        icon: 'code',
        customDescription: 'Statistical analysis of player performances and team records',
        techStack: ['Python', 'Pandas', 'Data Analysis']
    }
};

// Special project: Tableau Public
const TABLEAU_PROJECT = {
    name: 'Tableau Projects',
    description: 'Interactive dashboards and data visualizations showcasing advanced analytics',
    html_url: 'https://public.tableau.com/app/profile/fardeenul.islam/vizzes',
    category: 'Data Visualization',
    icon: 'chart-area',
    techStack: ['Tableau', 'Data Visualization', 'Dashboards']
};

// SVG Icons for categories
const ICONS = {
    'database': `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>`,
    'chart-line': `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>`,
    'code': `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>`,
    'chart-area': `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>`
};

// Language to tech stack mapping
const LANGUAGE_MAP = {
    'Python': ['Python', 'Pandas', 'NumPy'],
    'R': ['R', 'ggplot2', 'tidyverse'],
    'SQL': ['SQL', 'PostgreSQL', 'MySQL'],
    'JavaScript': ['JavaScript', 'Node.js'],
    'TypeScript': ['TypeScript', 'Node.js'],
    'Jupyter Notebook': ['Python', 'Jupyter', 'Data Science']
};

// Fetch repositories from GitHub API
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error('GitHub API request failed');
        }
        
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

// Get tech stack from repository languages
async function getRepoLanguages(repo) {
    try {
        const response = await fetch(repo.languages_url);
        const languages = await response.json();
        return Object.keys(languages);
    } catch (error) {
        console.error('Error fetching languages:', error);
        return [];
    }
}

// Determine tech stack from languages and topics
function determineTechStack(repo, languages) {
    let techStack = new Set();
    
    // Check custom mapping first
    if (TECH_CATEGORIES[repo.name]) {
        return TECH_CATEGORIES[repo.name].techStack;
    }
    
    // Add languages
    languages.forEach(lang => {
        if (LANGUAGE_MAP[lang]) {
            LANGUAGE_MAP[lang].forEach(tech => techStack.add(tech));
        } else {
            techStack.add(lang);
        }
    });
    
    // Add topics
    if (repo.topics && repo.topics.length > 0) {
        repo.topics.forEach(topic => {
            // Capitalize and clean topic names
            const cleanTopic = topic.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            techStack.add(cleanTopic);
        });
    }
    
    return Array.from(techStack).slice(0, 4); // Limit to 4 badges
}

// Create project card HTML
function createProjectCard(project, index) {
    const category = project.category || 'Development';
    const icon = ICONS[project.icon] || ICONS['code'];
    const techStack = project.techStack || [];
    const description = project.description || 'No description available';
    
    // Format title
    const title = project.name
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    const techBadges = techStack.map(tech => 
        `<span class="tech-badge">${tech}</span>`
    ).join('');
    
    return `
        <div class="project-card" data-category="${category.toLowerCase()}" style="animation-delay: ${index * 0.1}s">
            <div class="project-header">
                <h3 class="project-title">${title}</h3>
                <div class="project-icon">
                    ${icon}
                </div>
            </div>
            <p class="project-description">
                ${description}
            </p>
            <div class="project-tech">
                ${techBadges}
            </div>
            <div class="project-links">
                <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                    ${project.html_url.includes('github.com') ? 'View on GitHub' : 'View Dashboard'} →
                </a>
                ${project.homepage ? `
                    <a href="${project.homepage}" target="_blank" rel="noopener noreferrer" class="project-link">
                        Live Demo →
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

// Main function to load and display projects
async function loadGitHubProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }
    
    // Show loading state
    projectsGrid.innerHTML = `
        <div class="loading-projects">
            <div class="loading-spinner"></div>
            <p>Loading projects from GitHub...</p>
        </div>
    `;
    
    try {
        // Fetch all repos
        const repos = await fetchGitHubRepos();
        
        if (!repos || repos.length === 0) {
            throw new Error('No repositories found');
        }
        
        // Filter for featured repos
        const featuredProjects = [];
        
        // Add Tableau project first
        featuredProjects.push(TABLEAU_PROJECT);
        
        // Add GitHub repos
        for (const repoName of FEATURED_REPOS) {
            if (repoName === 'Tableau') continue; // Skip, already added
            
            const repo = repos.find(r => r.name === repoName);
            if (repo) {
                const languages = await getRepoLanguages(repo);
                const techStack = determineTechStack(repo, languages);
                const customInfo = TECH_CATEGORIES[repo.name] || {};
                
                featuredProjects.push({
                    name: repo.name,
                    description: customInfo.customDescription || repo.description || 'Data analysis project',
                    html_url: repo.html_url,
                    homepage: repo.homepage,
                    category: customInfo.category || 'Development',
                    icon: customInfo.icon || 'code',
                    techStack: customInfo.techStack || techStack,
                    updated_at: repo.updated_at
                });
            }
        }
        
        // If we have fewer than 4 projects, add more from repos
        if (featuredProjects.length < 4) {
            const additionalRepos = repos
                .filter(r => !FEATURED_REPOS.includes(r.name) && !r.fork)
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 6 - featuredProjects.length);
            
            for (const repo of additionalRepos) {
                const languages = await getRepoLanguages(repo);
                const techStack = determineTechStack(repo, languages);
                
                featuredProjects.push({
                    name: repo.name,
                    description: repo.description || 'GitHub repository',
                    html_url: repo.html_url,
                    homepage: repo.homepage,
                    category: languages[0] ? `${languages[0]} Development` : 'Development',
                    icon: 'code',
                    techStack: techStack,
                    updated_at: repo.updated_at
                });
            }
        }
        
        // Render projects
        if (featuredProjects.length > 0) {
            projectsGrid.innerHTML = featuredProjects
                .map((project, index) => createProjectCard(project, index))
                .join('');
            
            console.log(`✅ Loaded ${featuredProjects.length} projects from GitHub`);
        } else {
            throw new Error('No featured projects found');
        }
        
    } catch (error) {
        console.error('Error loading projects:', error);
        
        // Fallback to static projects
        projectsGrid.innerHTML = `
            <div class="error-message">
                <p>Unable to load projects dynamically. Showing featured projects:</p>
            </div>
        `;
        
        // Use fallback static projects
        loadFallbackProjects(projectsGrid);
    }
}

// Fallback static projects (if API fails)
function loadFallbackProjects(container) {
    const fallbackProjects = [
        {
            name: 'Tableau Projects',
            description: 'Interactive dashboards and data visualizations',
            html_url: 'https://public.tableau.com/app/profile/fardeenul.islam/vizzes',
            category: 'Data Visualization',
            icon: 'chart-area',
            techStack: ['Tableau', 'Data Visualization']
        },
        {
            name: 'SQL Work Samples',
            description: 'Database queries and solutions demonstrating SQL proficiency',
            html_url: 'https://github.com/fardeenul/SQL_worksample',
            category: 'SQL Development',
            icon: 'database',
            techStack: ['SQL', 'Database Design']
        },
        {
            name: 'Optimizing Sales Strategy',
            description: 'Sales analysis delivering actionable business insights',
            html_url: 'https://github.com/fardeenul/Optimizing-Sales-Strategy',
            category: 'Business Intelligence',
            icon: 'chart-line',
            techStack: ['R', 'Statistical Analysis']
        },
        {
            name: 'Test Cricket Analysis',
            description: 'Statistical analysis of player performances',
            html_url: 'https://github.com/fardeenul/Test-Cricket-Analysis',
            category: 'Python Development',
            icon: 'code',
            techStack: ['Python', 'Pandas']
        }
    ];
    
    container.innerHTML = fallbackProjects
        .map((project, index) => createProjectCard(project, index))
        .join('');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGitHubProjects);
} else {
    loadGitHubProjects();
}

// Export for use in other scripts
window.loadGitHubProjects = loadGitHubProjects;

