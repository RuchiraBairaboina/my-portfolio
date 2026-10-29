// Single source of truth for all portfolio content.
// Edit this file to update what appears on the website.

module.exports = {
  profile: {
    name: "Ruchira Bairaboina",
    location: "Dallas, TX",
    email: "Ruchirabairaboina00@gmail.com",
    // TODO: replace with your real LinkedIn URL
    linkedin: "https://www.linkedin.com/in/your-profile",
    github: "https://github.com/RuchiraBairaboina",
    roles: [
      "QA / SDET Engineer",
      "Test Automation Engineer",
      "Mobile Test Automation",
      "CI/CD & API Testing",
    ],
    tagline:
      "I break software on purpose so your users never do. 3+ years testing and automating workflows across finance, risk, and mobile/backend platforms.",
  },

  stats: [
    { label: "Years in QA / Automation", value: 3, suffix: "+" },
    { label: "Test Cases Authored", value: 250, suffix: "+" },
    { label: "Defects Resolved", value: 300, suffix: "+" },
    { label: "RPA Workflows Built", value: 50, suffix: "+" },
    { label: "Fewer Production Errors", value: 45, suffix: "%" },
    { label: "CI Feedback (from 4 hrs)", value: 8, suffix: " min" },
  ],

  highlights: [
    {
      icon: "🧪",
      title: "Test Planning & Defect Management",
      text: "Authored 250+ test cases and resolved 300+ defects in Jira, reducing production errors by up to 45% through root cause analysis.",
    },
    {
      icon: "📱",
      title: "Mobile Test Automation",
      text: "Built Android UI test suites with Java, Espresso, UIAutomator and ADB using the Page Object Model — 35% more maintainable.",
    },
    {
      icon: "⚙️",
      title: "CI/CD & Regression",
      text: "Engineered Jenkins pipelines (Groovy, Bash, Docker) that cut build-feedback loops from 4 hours to under 8 minutes.",
    },
    {
      icon: "🔌",
      title: "API & Data Validation",
      text: "Designed and tested REST APIs and validated data integrity with SQL/MySQL — 100% consistency between API and DB layers.",
    },
    {
      icon: "🤖",
      title: "RPA & Workflow Automation",
      text: "Developed 50+ RPA bots for finance systems, improving process efficiency and reliability by 35%.",
    },
    {
      icon: "🏆",
      title: "2x “Best Employee” at Amazon",
      text: "Recognized for fraud mitigation performance and SLA adherence.",
    },
  ],

  experience: [
    {
      id: "qentelli",
      role: "Automation Engineer – RPA (Contract)",
      company: "Qentelli",
      location: "Dallas, TX",
      period: "Jan 2025 – Present",
      color: "green",
      bullets: [
        "Developed and unit-tested 50+ automation workflows (RPA bots) for finance systems including Sirax and Maintainex, executing regression validation before deployment.",
        "Validated REST API integrations and backend data flows, running SQL queries against MySQL finance databases to confirm transaction and data integrity.",
        "Identified automation and testing gaps, partnering with SMEs to improve process efficiency and reliability by 35%.",
        "Documented process flows, business requirements, and 100+ test cases to support UAT and drive stakeholder adoption.",
        "Logged and resolved 150+ defects in Jira; root cause analysis with dev teams reduced production errors by 45%.",
        "Coordinated with cross-functional and distributed teams to align testing schedules and meet release deadlines.",
        "Provided post-production support and testing enhancements, reducing downtime/failures by 40%.",
      ],
      tools: ["Python", "SQL", "MySQL", "REST API Testing", "Jira", "Confluence", "Git", "Power Automate Desktop"],
    },
    {
      id: "bilabs",
      role: "Software Development Engineer in Test (SDET)",
      company: "BI Labs Inc",
      location: "Dallas, TX",
      period: "Jan 2024 – Dec 2024",
      color: "cyan",
      bullets: [
        "Executed test plans across multiple environments for application and server releases, completing 30+ test cycles.",
        "Scoped and wrote test plans and test cases for new features across 5+ SDKs/modules and device/platform configurations.",
        "Tested REST APIs and validated backend responses with SQL to verify data integrity across integration points.",
        "Reported and triaged 150+ defects in Jira, reducing escaped production issues by 25%.",
        "Managed test schedules with distributed teams, meeting deadlines across 12 release cycles.",
        "Supported full regression testing for monthly releases, contributing to a 30% reduction in post-release defects.",
      ],
      tools: ["Java", "SQL", "REST API Testing", "Jira", "Git", "Android Studio", "ADB"],
    },
    {
      id: "amazon",
      role: "Transaction Risk Investigator",
      company: "Amazon",
      location: "Hyderabad, India",
      period: "Jan 2022 – Jun 2022",
      color: "pink",
      bullets: [
        "Investigated 10,000+ high-risk transactions, preventing $2M+ in potential fraud losses.",
        "Flagged 200+ suspicious cases monthly with 99% accuracy while reducing false positives.",
        "Identified fraud loopholes and drove policy changes that cut repeat abuse by 30%.",
        "Automated tracking workflows, reducing investigation effort by 40% and improving response times.",
      ],
      tools: ["SQL", "Python", "Fraud/Risk Investigation Tools"],
    },
  ],

  projects: [
    {
      id: "android-ui",
      title: "Android UI Test Automation Suite",
      date: "Jan 2026",
      category: "Mobile",
      color: "green",
      summary:
        "An Android app with login and dynamic list management, plus a full automated UI test suite of 40+ test cases.",
      bullets: [
        "Built 40+ automated tests with Espresso (in-process) and UIAutomator (cross-app/system-level).",
        "Page Object Model architecture (LoginPage, ItemListPage) cut duplicate code by 35%.",
        "Ran on 3 AVD configs (API 30, 33, 34), catching 2 version-specific UI regressions.",
        "Used adb logcat and am instrument to cut debugging time by 40%.",
      ],
      metrics: [
        { label: "Tests", value: "40+" },
        { label: "Less duplication", value: "35%" },
        { label: "API levels", value: "3" },
      ],
      tech: ["Java", "Espresso", "UIAutomator", "Android Studio", "ADB", "Git", "POM"],
    },
    {
      id: "jenkins-ci",
      title: "Jenkins CI Pipeline for Mobile Regression",
      date: "Mar 2026",
      category: "CI/CD",
      color: "cyan",
      summary:
        "A declarative Jenkins pipeline in Docker that runs the full mobile regression suite on every commit.",
      bullets: [
        "Declarative Jenkinsfile running inside Docker — zero manual test execution per build.",
        "Modular Bash scripts (start_emulator.sh, run_tests.sh) spin up headless AVDs and tear them down.",
        "Aggregates JUnit XML reports and APK artifacts as a single source of truth.",
        "On-commit regression cut broken-build detection from 4 hours to under 8 minutes.",
      ],
      metrics: [
        { label: "Feedback loop", value: "<8 min" },
        { label: "Manual setup", value: "0 min" },
        { label: "Runs reported", value: "100%" },
      ],
      tech: ["Jenkins", "Groovy", "Bash", "Docker", "Gradle", "JUnit XML"],
    },
    {
      id: "payment-api",
      title: "Mock Payment REST API & SQL Integrity Framework",
      date: "Jun 2026",
      category: "API",
      color: "pink",
      summary:
        "A mock payment gateway in Express.js/Node.js with MySQL, validated end-to-end by a Pytest framework.",
      bullets: [
        "REST endpoints (/transactions, /refund) modeling created → refunded → failed states.",
        "Pytest framework covering 25+ scenarios: status codes, schemas, duplicate refunds (HTTP 422).",
        "Direct SQL validation confirmed DB state matched API status in 100% of scenarios.",
        "Deployed on a Linux VM over SSH, handling logging, debugging and process lifecycle.",
      ],
      metrics: [
        { label: "Scenarios", value: "25+" },
        { label: "API ↔ DB match", value: "100%" },
        { label: "Endpoints", value: "2" },
      ],
      tech: ["Python", "Pytest", "Express.js", "Node.js", "MySQL", "SQL", "Linux", "SSH"],
    },
  ],

  skills: {
    "Test Automation": [
      { name: "Espresso", level: 90 },
      { name: "UIAutomator", level: 85 },
      { name: "Pytest", level: 85 },
      { name: "Page Object Model", level: 90 },
      { name: "Regression Testing", level: 95 },
    ],
    "API & Data": [
      { name: "REST API Testing", level: 92 },
      { name: "SQL / MySQL", level: 90 },
      { name: "Postman", level: 85 },
      { name: "Express.js / Node.js", level: 75 },
    ],
    Languages: [
      { name: "Java", level: 85 },
      { name: "Python", level: 85 },
      { name: "Bash", level: 78 },
      { name: "Groovy", level: 70 },
    ],
    "CI/CD & DevOps": [
      { name: "Jenkins", level: 85 },
      { name: "Docker", level: 78 },
      { name: "Git", level: 88 },
      { name: "Gradle", level: 75 },
      { name: "Linux / SSH", level: 80 },
    ],
    "Tools & Process": [
      { name: "Jira", level: 95 },
      { name: "Confluence", level: 85 },
      { name: "Android Studio / ADB", level: 88 },
      { name: "Power Automate Desktop", level: 85 },
      { name: "Root Cause Analysis", level: 92 },
    ],
  },

  education: [
    {
      degree: "Master of Science, Business Analytics",
      school: "The University of Texas at Dallas",
      period: "Aug 2022 – May 2024",
    },
    {
      degree: "Bachelor of Technology, Computer Science Engineering",
      school: "G. Narayanamma Institute of Technology and Science",
      period: "Aug 2017 – Sep 2021",
    },
  ],

  certifications: [
    {
      name: "API Test Automation",
      issuer: "Test Automation University (Applitools)",
      date: "Aug 2026",
    },
    {
      name: "Postman API Fundamentals Student Expert",
      issuer: "Postman Academy",
      date: "Aug 2026",
    },
  ],
};
