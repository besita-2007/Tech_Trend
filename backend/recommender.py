ROADMAPS = {
    "data science": {
        "description": "Data Scientists analyze complex data to help organizations make better decisions using statistics, ML, and visualization.",
        "stages": [
            {
                "stage": 1, "topic": "Python & Math Foundations",
                "skills": ["Python", "NumPy", "Statistics", "Linear Algebra"],
                "resources": ["Python.org docs", "Khan Academy Statistics", "3Blue1Brown Linear Algebra (YouTube)"]
            },
            {
                "stage": 2, "topic": "Data Wrangling",
                "skills": ["Pandas", "SQL", "Data Cleaning", "EDA"],
                "resources": ["Kaggle Learn - Pandas", "Mode SQL Tutorial", "Towards Data Science blog"]
            },
            {
                "stage": 3, "topic": "Data Visualization",
                "skills": ["Matplotlib", "Seaborn", "Tableau", "Power BI"],
                "resources": ["Matplotlib docs", "Tableau Public tutorials", "Storytelling with Data (book)"]
            },
            {
                "stage": 4, "topic": "Machine Learning",
                "skills": ["Scikit-learn", "Regression", "Classification", "Clustering"],
                "resources": ["Andrew Ng ML Course (Coursera)", "Scikit-learn docs", "Hands-On ML (book)"]
            },
            {
                "stage": 5, "topic": "Deep Learning & AI",
                "skills": ["TensorFlow", "PyTorch", "Neural Networks", "NLP"],
                "resources": ["fast.ai", "Deep Learning Specialization (Coursera)", "PyTorch tutorials"]
            },
            {
                "stage": 6, "topic": "MLOps & Deployment",
                "skills": ["MLflow", "Docker", "AWS SageMaker", "Model Monitoring"],
                "resources": ["MLflow docs", "AWS SageMaker tutorials", "Full Stack Deep Learning"]
            }
        ]
    },
    "web development": {
        "description": "Web Developers build websites and web applications for the internet, covering both visual design and server-side logic.",
        "stages": [
            {
                "stage": 1, "topic": "HTML & CSS",
                "skills": ["HTML5", "CSS3", "Flexbox", "Responsive Design"],
                "resources": ["MDN Web Docs", "freeCodeCamp", "CSS-Tricks"]
            },
            {
                "stage": 2, "topic": "JavaScript",
                "skills": ["ES6+", "DOM Manipulation", "Fetch API", "Async/Await"],
                "resources": ["javascript.info", "Eloquent JavaScript (free book)", "The Odin Project"]
            },
            {
                "stage": 3, "topic": "Frontend Framework",
                "skills": ["React", "TypeScript", "State Management", "Component Design"],
                "resources": ["React docs (react.dev)", "TypeScript Handbook", "Scrimba React course"]
            },
            {
                "stage": 4, "topic": "Backend Development",
                "skills": ["Node.js", "REST APIs", "Authentication", "Express/FastAPI"],
                "resources": ["Node.js docs", "FastAPI docs", "The Odin Project - NodeJS"]
            },
            {
                "stage": 5, "topic": "Databases",
                "skills": ["PostgreSQL", "MongoDB", "ORMs", "Database Design"],
                "resources": ["PostgreSQL Tutorial", "MongoDB University", "Prisma docs"]
            },
            {
                "stage": 6, "topic": "Deployment & DevOps",
                "skills": ["Docker", "CI/CD", "Vercel/AWS", "Git"],
                "resources": ["Docker docs", "GitHub Actions docs", "AWS Free Tier"]
            }
        ]
    },
    "devops": {
        "description": "DevOps Engineers bridge development and operations, automating infrastructure and deployment pipelines.",
        "stages": [
            {
                "stage": 1, "topic": "Linux & Bash",
                "skills": ["Linux CLI", "Bash Scripting", "File Systems", "Networking Basics"],
                "resources": ["Linux Journey (linuxjourney.com)", "The Linux Command Line (book)", "OverTheWire Bandit"]
            },
            {
                "stage": 2, "topic": "Version Control & Git",
                "skills": ["Git", "GitHub", "Branching Strategies", "Code Review"],
                "resources": ["Pro Git (free book)", "GitHub Skills", "Atlassian Git tutorials"]
            },
            {
                "stage": 3, "topic": "Containers & Docker",
                "skills": ["Docker", "Docker Compose", "Container Networking", "Images"],
                "resources": ["Docker docs", "Play with Docker", "TechWorld with Nana (YouTube)"]
            },
            {
                "stage": 4, "topic": "Kubernetes & Orchestration",
                "skills": ["Kubernetes", "Helm", "Service Mesh", "Scaling"],
                "resources": ["Kubernetes.io docs", "KodeKloud", "CKAD certification path"]
            },
            {
                "stage": 5, "topic": "CI/CD Pipelines",
                "skills": ["GitHub Actions", "Jenkins", "ArgoCD", "Pipeline Design"],
                "resources": ["GitHub Actions docs", "Jenkins docs", "GitLab CI/CD docs"]
            },
            {
                "stage": 6, "topic": "Cloud & Infrastructure as Code",
                "skills": ["AWS/GCP/Azure", "Terraform", "Ansible", "Monitoring"],
                "resources": ["AWS Free Tier", "Terraform docs", "A Cloud Guru"]
            }
        ]
    },
    "mobile": {
        "description": "Mobile Developers create apps for iOS and Android platforms, focusing on performance and user experience.",
        "stages": [
            {
                "stage": 1, "topic": "Programming Fundamentals",
                "skills": ["Swift (iOS) or Kotlin (Android)", "OOP", "Data Structures"],
                "resources": ["Swift.org docs", "Android Developers docs", "CS50 (Harvard)"]
            },
            {
                "stage": 2, "topic": "Platform Basics",
                "skills": ["Xcode / Android Studio", "UI Components", "Navigation", "Lifecycle"],
                "resources": ["Apple Developer tutorials", "Android Codelabs", "Hacking with Swift"]
            },
            {
                "stage": 3, "topic": "State & Data Management",
                "skills": ["State Management", "Local Storage", "REST APIs", "JSON"],
                "resources": ["SwiftUI tutorials", "Jetpack Compose docs", "Retrofit docs"]
            },
            {
                "stage": 4, "topic": "Cross-Platform (Optional)",
                "skills": ["Flutter", "React Native", "Dart"],
                "resources": ["Flutter.dev", "React Native docs", "Flutter & Dart Udemy courses"]
            },
            {
                "stage": 5, "topic": "Backend Integration",
                "skills": ["Firebase", "REST APIs", "Authentication", "Push Notifications"],
                "resources": ["Firebase docs", "Supabase docs", "OneSignal docs"]
            },
            {
                "stage": 6, "topic": "Publishing & Monetization",
                "skills": ["App Store / Play Store", "In-App Purchases", "Analytics", "ASO"],
                "resources": ["Apple App Store guidelines", "Google Play Console", "RevenueCat docs"]
            }
        ]
    },
    "cybersecurity": {
        "description": "Cybersecurity professionals protect systems, networks, and data from digital attacks and unauthorized access.",
        "stages": [
            {
                "stage": 1, "topic": "Networking Fundamentals",
                "skills": ["TCP/IP", "DNS", "HTTP/HTTPS", "Firewalls", "VPNs"],
                "resources": ["Professor Messer CompTIA Network+", "Cisco NetAcad", "TryHackMe Pre-Security"]
            },
            {
                "stage": 2, "topic": "Linux & Command Line",
                "skills": ["Linux CLI", "Bash", "File Permissions", "Process Management"],
                "resources": ["OverTheWire Bandit", "Linux Journey", "TryHackMe Linux Fundamentals"]
            },
            {
                "stage": 3, "topic": "Security Fundamentals",
                "skills": ["CIA Triad", "Cryptography", "Authentication", "CompTIA Security+"],
                "resources": ["CompTIA Security+ study guide", "Cybrary", "TryHackMe SOC Level 1"]
            },
            {
                "stage": 4, "topic": "Ethical Hacking & Pentesting",
                "skills": ["Kali Linux", "Metasploit", "Nmap", "Burp Suite", "OWASP Top 10"],
                "resources": ["TryHackMe", "HackTheBox", "TCM Security courses"]
            },
            {
                "stage": 5, "topic": "Defensive Security",
                "skills": ["SIEM", "Incident Response", "Log Analysis", "Threat Intelligence"],
                "resources": ["Splunk Free Training", "Blue Team Labs Online", "SANS reading room"]
            },
            {
                "stage": 6, "topic": "Certifications & Specialization",
                "skills": ["CEH", "OSCP", "CISSP", "Cloud Security"],
                "resources": ["Offensive Security (OSCP)", "ISC2 CISSP", "AWS Security Specialty"]
            }
        ]
    },
    "game development": {
        "description": "Game Developers design and build interactive games for PC, console, and mobile platforms.",
        "stages": [
            {
                "stage": 1, "topic": "Programming Basics",
                "skills": ["C# or C++", "OOP", "Data Structures", "Algorithms"],
                "resources": ["CS50 (Harvard)", "C# docs", "Brackeys YouTube channel"]
            },
            {
                "stage": 2, "topic": "Game Engine Fundamentals",
                "skills": ["Unity or Unreal Engine", "Scene Management", "Physics", "Input"],
                "resources": ["Unity Learn", "Unreal Online Learning", "Brackeys (YouTube)"]
            },
            {
                "stage": 3, "topic": "Game Math & Graphics",
                "skills": ["Linear Algebra", "Vectors", "Shaders", "2D/3D Math"],
                "resources": ["3Blue1Brown (YouTube)", "The Book of Shaders", "Game Math (book)"]
            },
            {
                "stage": 4, "topic": "Game Design Patterns",
                "skills": ["State Machines", "ECS", "Design Patterns", "AI Behavior Trees"],
                "resources": ["Game Programming Patterns (free book)", "Unity ECS docs", "GDC talks (YouTube)"]
            },
            {
                "stage": 5, "topic": "Audio, UI & Polish",
                "skills": ["Audio Systems", "UI/UX for Games", "Particle Systems", "Animation"],
                "resources": ["Unity Audio docs", "Game UI Database", "Kenney.nl (free assets)"]
            },
            {
                "stage": 6, "topic": "Publishing & Monetization",
                "skills": ["Steam / App Stores", "Marketing", "Analytics", "Multiplayer Basics"],
                "resources": ["Steam Greenlight guide", "itch.io", "Photon Engine (multiplayer)"]
            }
        ]
    },
    "embedded": {
        "description": "Embedded Systems Developers write software for hardware devices like microcontrollers, IoT devices, and real-time systems.",
        "stages": [
            {
                "stage": 1, "topic": "C & C++ Programming",
                "skills": ["C", "C++", "Pointers", "Memory Management"],
                "resources": ["CS50 (Harvard)", "C Programming Language (book)", "cppreference.com"]
            },
            {
                "stage": 2, "topic": "Electronics Basics",
                "skills": ["Circuits", "GPIO", "Sensors", "Oscilloscopes"],
                "resources": ["All About Circuits", "SparkFun tutorials", "Arduino Getting Started"]
            },
            {
                "stage": 3, "topic": "Microcontrollers",
                "skills": ["Arduino", "STM32", "ESP32", "RTOS Basics"],
                "resources": ["Arduino docs", "STM32 tutorials", "Espressif ESP-IDF docs"]
            },
            {
                "stage": 4, "topic": "Real-Time Operating Systems",
                "skills": ["FreeRTOS", "Zephyr", "Task Scheduling", "Interrupts"],
                "resources": ["FreeRTOS docs", "Zephyr Project docs", "Embedded Artistry blog"]
            },
            {
                "stage": 5, "topic": "Communication Protocols",
                "skills": ["UART", "SPI", "I2C", "CAN", "MQTT"],
                "resources": ["SparkFun protocol guides", "MQTT.org", "NXP application notes"]
            },
            {
                "stage": 6, "topic": "Linux Embedded & IoT",
                "skills": ["Yocto", "Buildroot", "Device Drivers", "AWS IoT"],
                "resources": ["Yocto Project docs", "Bootlin training", "AWS IoT Core docs"]
            }
        ]
    }
}

def get_roadmap(field: str):
    return ROADMAPS.get(field.lower(), None)

def get_all_fields():
    return list(ROADMAPS.keys())
