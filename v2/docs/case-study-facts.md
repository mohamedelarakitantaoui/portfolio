# Case-study facts: Mini Private Cloud, eSaha, Quiz Game App, Courses & Lessons App

Collected on 15 Oct 2026 from Mamoun's own report and his GitHub repos. Use only these facts. Anything marked
**CHECK** needs Mamoun's answer before it ships. Never show passwords, tokens, internal URLs or phone numbers.

---

## 1. Mini Private Cloud → full case study `/work/mini-private-cloud`

Sources:
- Mamoun's report "Mini Private Cloud: Implementation Experience and Troubleshooting Report" (AUI, July 2026),
  stored in `public/research/` if Mamoun adds the PDF.
- The public repo github.com/mohamedelarakitantaoui/Mini_Cloud.

- **Meta:**
  - Al Akhawayn University, Cloud Computing / Infrastructure course, July 2026.
  - Solo.
  - Instructor Houda Chakiri; supervisor Ayoub Akarkouz. Only show these names if Mamoun agrees; default to omitting them.
- **Subtitle (Cormorant):** *a private cloud on one laptop*
- **Headline metric:** a private cloud built with ~2,250 lines of Python.
  - The repo's `cloudctl.py` and the `minicloud/` package hold 2,252 lines of Python.
  - Alternative metric: "1 → 3 replicas behind one gateway".
- **Problem:** a small university department needs to host internal services for students and staff without
  expensive infrastructure or a public cloud account. It must run on one laptop and be manageable by command.
- **What it is:** a Docker-based private-cloud prototype on one host.
  - Containers are the compute instances.
  - A user-defined Docker bridge (`mini-cloud-net`) is the private subnet, with internal DNS.
  - Named volumes are the persistent storage.
  - Nginx is the only public gateway (port 8080, routing `/portal` and `/app`).
  - A Python controller, `cloudctl.py`, runs: init, provision (from YAML), list, scale, metrics, logs, storage,
    check-db, heal, run (sandbox) and destroy.
- **Architecture:**
  - Control plane: `cloudctl.py`, the shared `minicloud` modules, a FastAPI control API bound to 127.0.0.1, and an
    HTML/CSS/JS dashboard.
  - Data plane: the Nginx gateway, web-host replicas, a Flask signup/login app and PostgreSQL 16.
  - Only the gateway publishes a host port.
- **Stack:** Python 3, PyYAML, Docker, Nginx (Alpine), PostgreSQL 16 (Alpine), Flask, FastAPI + Uvicorn,
  HTML/CSS/JS, Windows 11 + Docker Desktop.
- **Key engineering decisions (each makes a good chapter):**
  1. **Idempotent init:** inspect, then create or reuse resources, so a repeated init doesn't hit name conflicts.
  2. **Validate YAML before touching Docker:** required fields, replica limits, volume and route settings. Fail early
     with clear errors and no half-created services.
  3. **Persistence proven by destruction:** write a file to the volume, delete the container, re-provision, then read
     the file back through the gateway.
  4. **Service discovery:** Nginx resolves replicas at request time through Docker DNS, so scaling from 1 to 3
     replicas needs no gateway rewrite.
  5. **Stateful vs stateless:** the database is marked `scalable: false` and the controller refuses to scale it,
     because two Postgres processes on one volume would corrupt it. The web tier scales from 1 to 3 replicas.
  6. **Visible load balancing:** each replica returns an `X-Served-By` header, and the dashboard counts which replica
     answered.
  7. **Healing with limits:** the loop checks every 3 seconds, restarts stopped replicas, and gives up after
     3 failed attempts.
  8. **Safety:** the API is bound to localhost and loads YAML files only from a whitelist.
     - The sandbox runs a throwaway `python:3.12-alpine` container with no network, a read-only filesystem, CPU,
       memory and process limits, a timeout, and automatic removal.
  9. **Storage metering:** each volume is measured against a 650 MB demonstration quota, with an alert at 75%.
     Billing is simulated and clearly labelled as such.
- **Tests:** 15 validation steps run in operator order, from docker info and init through provision, gateway,
  network, DB, persistence, scale, load balancing, metrics, logs, failure, recovery and sandbox to destroy.
- **Honest limits (the "What I'd do differently" chapter):**
  - The `delete <service>` command was never finished.
  - The `--help` output has a formatting bug (an unescaped `%`).
  - It runs on a single host, with no real high availability.
  - Healing runs in the foreground only.
  - Scaling is manual.
  - Metrics show the current moment only.
  - Security is prototype-level: HTTP only, credentials in YAML, no RBAC.
  - Optional features ate into the time for the required ones.
  - Main lesson, in Mamoun's words: "Scope control is part of engineering quality."
- **Links:** GitHub (the repo is public).
- **Note:** the FastAPI control API and the dashboard are described in the report, but the public repo contains only
  the CLI, the modules, the gateway and the app.
  - Describe them as part of the project.
  - Don't claim the repo contains them.
  - Show no screenshots unless Mamoun provides real ones; the report says none were invented.

## 2. eSaha → short page (no repo link, as decided)

Source: the backend in the private repo eSaha.

- **Confirmed in code:**
  - Flask REST API with JWT auth (Flask-JWT-Extended) and bcrypt.
  - MongoDB via PyMongo.
  - OpenAI chat using `gpt-3.5-turbo` with a mental-health system prompt.
  - Sentiment analysis on each chat message, returning mood, score and factors.
  - 45 API routes across these modules: auth, chat sessions and history, mood entries with insights and export,
    appointments with status, emergency contacts and alert, resources with search, and profile with notifications
    and data export.
  - The front end is React + TypeScript + Vite + Tailwind.
- **CHECK, Supabase:** the repo also uses Supabase (the README and `supabase_client.py`), but `decisions.md` says
  "never Supabase" for eSaha.
  - Keep it off the site unless Mamoun says otherwise.
- **CHECK, "4 languages":** the site says the assistant works in 4 languages, but nothing in the backend code
  confirms this.
  - Keep it only if Mamoun confirms it (it may live in the front end).

## 3. Quiz Game App → short page

Source: the public repo game-app.

- **Confirmed:**
  - Android app in Kotlin, built with Gradle.
  - Firebase Authentication: signup, login and forgot-password screens.
  - Questions load from the Firebase Realtime Database.
  - A 15-second CountDownTimer for each question.
  - Each user's correct and wrong answers are saved to Firebase, and a Result screen reads them back.
  - Kotlin coroutines.
  - 7 activities: Welcome, Main, Login, Signup, ForgotPassword, Quiz, Result.
- **CHECK, "leaderboards" and "offline cache":** the site currently says both, but the code only shows per-user
  scores and no offline cache.
  - Rewrite the line to "per-user scores saved to Firebase" unless Mamoun confirms both features.
- **Year:** the last push was Jan 2025. Show 2025 only if Mamoun confirms it.

## 4. Courses & Lessons App → short page, linked to Preparia

Source: the public repo my-courses-lessons-app.

- **Confirmed:**
  - Flutter/Dart mobile app.
  - It connects to the **Preparia** WordPress site through the WordPress REST API, using JWT authentication
    (wp-json/jwt-auth) and the WooCommerce API.
  - It uses LearnDash, the WordPress LMS plugin, for courses and lessons.
  - Registration, login, and a home page that lists courses from the backend.
  - The roadmap leaves detailed course and lesson views unfinished.
- **This is the mobile groundwork from the Preparia internship** (summer 2024, ITS Elaraki School).
  - Link the two pages to each other: "Mobile companion to Preparia".
  - Year: 2024.
- **Status:** honest. It's an early-stage app; detailed course views are still on the roadmap.
- **Never show:** the staging host's URL.
