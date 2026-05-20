# Yatra India
**Team ID:** Group-05

## 🏢 Corporate Simulation Guidelines
**Approved by:** Prof. Anushrav Mudgal
**Objective:** To develop a production-grade software solution using industry-standard DevOps and Agile methodologies.

## 👥 The Team
| Role | Name | GitHub Username | Primary Responsibility |
|------|------|-----------------|------------------------|
| **Team Lead** | MD Sameer | @sameer07585 | Architecture & Merge Approvals |
| **Developer** | Piyush Ch. | @hackty. | Backend / API |
| **Developer** | Lavish Batra | @lavish7183 | Backend / API |
| **Developer** | Kuldeep Tiwari | @kuldeeptiwari0460 | Frontend / UI |
| **Developer** | Manish Kumar | @user | Database & Testing |
| **DevOps** | Pranav Bansal | @user | CI/CD & Documentation |

## 🛠 Project Management (The "Top View")
We use GitHub Projects for task tracking.

**The Golden Rule:** If a task is not on the Board, it does not exist.

**Columns:**
1.  **Backlog:** All intended features.
2.  **Todo:** Tasks selected for the current sprint.
3.  **In Progress:** Currently being coded.
4.  **In Review:** PR is open and waiting for peer review.
5.  **Done:** Merged into main and tested.

## ⚙️ Development Workflow (Git Flow)
We strictly follow Branch Protection Rules. **Direct pushes to `main` are FORBIDDEN.**

### 1. Branching Strategy
*   `main`: Production-ready code. (**Protected**: No direct commits).
*   `dev`: Integration branch. All features merge here first.
*   `feature/feature-name`: Working branch for a specific task.
    *   *Example:* `feature/login-page`, `fix/database-connection`

### 2. The Cycle
1.  **Pull latest changes:** `git pull origin main`
2.  **Create a branch:** `git checkout -b feature/my-new-feature`
3.  **Code & Commit:** `git commit -m "Added login validation logic"`
4.  **Push:** `git push origin feature/my-new-feature`
5.  **Open Pull Request (PR):**
    *   Go to GitHub.
    *   Open PR from `feature/...` to `main` (or `dev`).
    *   **Review Requirement:** At least 1 other team member MUST review the code and approve it.
    *   **Faculty Review:** Tag `@Your-GitHub-Username` for major architectural changes.

## 📝 Coding Standards
*   **Commits:** Must be descriptive.
    *   ❌ Bad: "Fixed stuff"
    *   ✅ Good: "Refactored UserAuthService to handle JWT tokens"
*   **Formatting:** Code must be indented and commented.
*   **Cleanliness:** No commented-out dead code. No hardcoded passwords/API keys (Use `.env` files).

## 📊 Evaluation & Attendance
Grading is based on **Digital Footprint** in this repository.

*   **Contributions:** The "Insights -> Contributors" graph will be used to verify individual effort.
*   **Consistency:** Regular commits are required. Dumping code 1 day before the deadline results in a penalty.
*   **Collaboration:** Evidence of Code Reviews (comments on PRs) counts towards the "Teamwork" grade.

## 🚀 Setup Instructions
1.  **Clone the repo.**
    ```bash
    git clone <repository-url>
    cd Yatra_India
    ```

2.  **Install dependencies.**
    ```bash
    npm install
    ```

3.  **Configure Environment.**
    *   Create a `.env.local` file in the root directory.
    *   Add your Firebase and other API keys (refer to `.env.example` if available).

4.  **Run the application.**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or the port shown in terminal) to view the application.
