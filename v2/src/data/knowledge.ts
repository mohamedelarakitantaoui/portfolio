// ask-mamoun corpus. Same facts as the pages; nothing marked TODO is included.
// Served as /knowledge.json and /fr/knowledge.json and searched client-side with BM25.
import type { Lang } from '../i18n/ui';

interface Side { title: string; text: string; answer: string }
interface Chunk { id: string; tags: string; en: Side; fr: Side }

const chunks: Chunk[] = [
  {
    id: 'identity', tags: 'who name mamoun about yourself qui présentation',
    en: { title: 'Who', text: 'Mamoun Tantaoui El Araki is a software engineer focused on practical AI and automation: RAG, data extraction, and web and mobile apps.', answer: 'Mamoun Tantaoui El Araki, a software engineer working on practical AI and automation: RAG systems, data extraction, and web and mobile apps.' },
    fr: { title: 'Qui', text: 'Mamoun Tantaoui El Araki est ingénieur logiciel, orienté IA appliquée et automatisation : RAG, extraction de données, applications web et mobiles.', answer: 'Mamoun Tantaoui El Araki, ingénieur logiciel orienté IA appliquée et automatisation : systèmes RAG, extraction de données, applications web et mobiles.' },
  },
  {
    id: 'location', tags: 'where based location city live morocco marrakech où ville maroc habite',
    en: { title: 'Location', text: 'Based in Marrakech, Morocco (GMT+1). Studied in Ifrane (Al Akhawayn University) and Istanbul (Boğaziçi University).', answer: 'Marrakech, Morocco. I studied in Ifrane and spent a semester in Istanbul.' },
    fr: { title: 'Localisation', text: 'Basé à Marrakech, au Maroc (GMT+1). Études à Ifrane (Université Al Akhawayn) et à Istanbul (Université Boğaziçi).', answer: 'Marrakech, au Maroc. J’ai étudié à Ifrane et passé un semestre à Istanbul.' },
  },
  {
    id: 'availability-roles', tags: 'available availability hire hiring job role roles remote relocate europe canada us usa 2027 full-time junior disponible poste emploi recrutement distance',
    en: { title: 'Availability (employers)', text: 'Open to junior AI, data and software engineering roles. Morocco and remote now; Europe, the US and Canada from early 2027.', answer: 'Yes: open to junior AI, data and software engineering roles. Morocco or remote now; Europe, the US and Canada from early 2027.' },
    fr: { title: 'Disponibilité (recruteurs)', text: 'Ouvert aux postes junior en IA, data et génie logiciel. Maroc et à distance dès maintenant ; Europe, États-Unis et Canada à partir de début 2027.', answer: 'Oui : ouvert aux postes junior en IA, data et génie logiciel. Maroc ou à distance dès maintenant ; Europe, États-Unis et Canada à partir de début 2027.' },
  },
  {
    id: 'availability-freelance', tags: 'freelance client project contract hire mission projet indépendant',
    en: { title: 'Availability (clients)', text: 'Taking freelance projects: automation and scraping, AI on your documents, and web app MVPs, as three fixed-scope packs.', answer: 'Yes. Three fixed-scope packs: automation & scraping, AI on your documents, and a web app MVP. Prices are on request.' },
    fr: { title: 'Disponibilité (clients)', text: 'Disponible en freelance : automatisation et scraping, IA sur vos documents, MVP d’application web, en trois offres au périmètre fixe.', answer: 'Oui. Trois offres au périmètre fixe : automatisation & scraping, IA sur vos documents, MVP d’application web. Prix sur demande.' },
  },
  {
    id: 'languages', tags: 'language languages speak spoken english french arabic spanish langue langues parle anglais français arabe espagnol',
    en: { title: 'Languages', text: 'English, French, Arabic; Spanish (beginner). The government RAG interface ships in Arabic, French and English, right-to-left included.', answer: 'English, French and Arabic, plus beginner Spanish. My government RAG interface ships in all three, right-to-left included.' },
    fr: { title: 'Langues', text: 'Anglais, français, arabe ; espagnol (débutant). L’interface du RAG gouvernemental existe en arabe, français et anglais, droite-à-gauche comprise.', answer: 'Anglais, français et arabe, plus un espagnol débutant. L’interface de mon RAG gouvernemental est dans les trois langues, droite-à-gauche comprise.' },
  },
  {
    id: 'education-aui', tags: 'education degree university study studied school aui al akhawayn ifrane bachelor computer science diplôme université études licence',
    en: { title: 'Education: Al Akhawayn', text: 'B.S. in Computer Science with a minor in Communication Studies, Al Akhawayn University, Ifrane, 2021–2026. Capstone: AneuXplain (spring 2026).', answer: 'B.S. Computer Science (minor in Communication Studies) at Al Akhawayn University in Ifrane, 2021–2026. My capstone was AneuXplain.' },
    fr: { title: 'Formation : Al Akhawayn', text: 'Licence (B.S.) en informatique, mineure en communication, Université Al Akhawayn, Ifrane, 2021–2026. Projet de fin d’études : AneuXplain (printemps 2026).', answer: 'Licence (B.S.) en informatique, mineure en communication, à l’Université Al Akhawayn d’Ifrane, 2021–2026. Projet de fin d’études : AneuXplain.' },
  },
  {
    id: 'education-bogazici', tags: 'exchange istanbul turkey bogazici boğaziçi abroad semester échange turquie semestre',
    en: { title: 'Education: Boğaziçi', text: 'Exchange student in Computer Engineering at Boğaziçi University, Istanbul, fall 2024.', answer: 'A fall 2024 exchange semester in Computer Engineering at Boğaziçi University, Istanbul.' },
    fr: { title: 'Formation : Boğaziçi', text: 'Étudiant en échange en génie informatique à l’Université Boğaziçi, Istanbul, automne 2024.', answer: 'Un semestre d’échange en génie informatique à l’Université Boğaziçi d’Istanbul, à l’automne 2024.' },
  },
  {
    id: 'intelcia', tags: 'intelcia internship intern 2025 build built work did chatbot dataset llm training stage construit fait',
    en: { title: 'Intelcia internship', text: 'Software development intern at Intelcia Solutions, June–August 2025. Built the DCE Scraper, which collected public-procurement documents (DCE) from marchespublics.gov.ma, marocao.com and Intelcia’s internal purchasing portal to build an LLM training dataset for an AI chatbot.', answer: 'At Intelcia (summer 2025) I built the DCE Scraper: it collects public-procurement documents from marchespublics.gov.ma, marocao.com and Intelcia’s internal purchasing portal into an LLM training dataset for an AI chatbot. 300 consultations went from 2.5 hours to 15 minutes.' },
    fr: { title: 'Stage chez Intelcia', text: 'Stagiaire en développement logiciel chez Intelcia Solutions, juin–août 2025. Conception du DCE Scraper, qui collecte des documents de marchés publics (DCE) sur marchespublics.gov.ma, marocao.com et le portail d’achats interne d’Intelcia pour constituer un jeu de données d’entraînement de LLM pour un chatbot IA.', answer: 'Chez Intelcia (été 2025), j’ai construit le DCE Scraper : il collecte des documents de marchés publics sur marchespublics.gov.ma, marocao.com et le portail d’achats interne d’Intelcia pour un jeu de données d’entraînement de chatbot IA. 300 consultations sont passées de 2 h 30 à 15 minutes.' },
  },
  {
    id: 'dce-numbers', tags: 'numbers result results faster speed performance metrics microservices monolith impact chiffres résultats vitesse',
    en: { title: 'DCE Scraper results', text: '2.5 hours → 15 minutes for 300 consultations (10× faster). A 3,643-line monolith split into 7 microservices. Up to 10 browsers in parallel. Retries and health checks ended silent failures.', answer: '10× faster: 300 consultations in 15 minutes instead of 2.5 hours. A 3,643-line monolith became 7 microservices running up to 10 browsers in parallel, with no more silent failures.' },
    fr: { title: 'Résultats du DCE Scraper', text: '2 h 30 → 15 minutes pour 300 consultations (10× plus rapide). Un monolithe de 3 643 lignes découpé en 7 microservices. Jusqu’à 10 navigateurs en parallèle. Reprises et contrôles de santé : plus d’échecs silencieux.', answer: '10× plus rapide : 300 consultations en 15 minutes au lieu de 2 h 30. Un monolithe de 3 643 lignes devenu 7 microservices, jusqu’à 10 navigateurs en parallèle, sans échecs silencieux.' },
  },
  {
    id: 'dce-stack', tags: 'stack tech technology scraper selenium python architecture services yaml click',
    en: { title: 'DCE Scraper stack', text: 'Python 3.12, Selenium WebDriver, YAML configuration per portal, threading and async, a Click CLI. Seven services: HybridOrchestrator, UrlExtraction, FormProcessing, DownloadManagement, WorkerPool, FileManagement, Retry.', answer: 'Python 3.12 and Selenium WebDriver, YAML config per portal and a Click CLI, split into 7 services around a HybridOrchestrator.' },
    fr: { title: 'Stack du DCE Scraper', text: 'Python 3.12, Selenium WebDriver, configuration YAML par portail, threading et async, une CLI Click. Sept services : HybridOrchestrator, UrlExtraction, FormProcessing, DownloadManagement, WorkerPool, FileManagement, Retry.', answer: 'Python 3.12 et Selenium WebDriver, une configuration YAML par portail et une CLI Click, en 7 services autour d’un HybridOrchestrator.' },
  },
  {
    id: 'its', tags: 'its elaraki preparia 2024 wordpress elementor h5p internship school platform stage école',
    en: { title: 'ITS Elaraki internship', text: 'Project intern at ITS Elaraki School, June–August 2024. Delivered Preparia, a competitive-exam prep platform on WordPress, Elementor and H5P, now live at preparia.ma.', answer: 'In summer 2024 I delivered Preparia for ITS Elaraki School: an exam-prep platform on WordPress, Elementor and H5P, live at preparia.ma.' },
    fr: { title: 'Stage chez ITS Elaraki', text: 'Stagiaire chef de projet chez ITS Elaraki School, juin–août 2024. Livraison de Preparia, plateforme de préparation aux concours sur WordPress, Elementor et H5P, en ligne sur preparia.ma.', answer: 'À l’été 2024, j’ai livré Preparia pour ITS Elaraki School : une plateforme de préparation aux concours sur WordPress, Elementor et H5P, en ligne sur preparia.ma.' },
  },
  {
    id: 'mentor', tags: 'mentor mentoring compete aui 2023 leadership tutorat',
    en: { title: 'Mentoring', text: 'Mentor at AUI Compete Organisation, January–May 2023: academic planning and competition readiness.', answer: 'From January to May 2023 I mentored peers at AUI Compete Organisation on academic planning and competition readiness.' },
    fr: { title: 'Mentorat', text: 'Mentor à AUI Compete Organisation, janvier–mai 2023 : planification académique et préparation aux compétitions.', answer: 'De janvier à mai 2023, j’ai accompagné des étudiants à AUI Compete Organisation sur leur planification académique et leur préparation aux compétitions.' },
  },
  {
    id: 'rag-what', tags: 'rag government secure gov on-prem onprem project now building current working assistant documents gouvernement actuel en cours',
    en: { title: 'Secure Government RAG', text: 'In development: an on-prem assistant that answers from an organisation’s own documents in Arabic, French and English, with citations. Zero external API calls: the model, the vectors and the files stay on-prem.', answer: 'I’m building a Secure Government RAG: an on-prem assistant that answers from an organisation’s own documents in Arabic, French and English, with citations and zero external API calls. It’s in development.' },
    fr: { title: 'Secure Government RAG', text: 'En cours de développement : un assistant on-premise qui répond à partir des documents d’une organisation, en arabe, français et anglais, avec sources. Aucun appel d’API externe : modèle, vecteurs et fichiers restent sur site.', answer: 'Je construis un Secure Government RAG : un assistant on-premise qui répond à partir des documents d’une organisation en arabe, français et anglais, avec sources et sans aucun appel d’API externe. Il est en cours de développement.' },
  },
  {
    id: 'rag-stack', tags: 'rag stack llm model models vector database ollama pgvector minio fastapi keycloak embeddings llama aya',
    en: { title: 'RAG stack', text: 'Ollama serving Llama 3.2 and Aya 8B, E5-Base embeddings, PostgreSQL with pgvector, MinIO for documents, a FastAPI chat service, a React + TypeScript UI, Keycloak for roles, Docker Compose and NGINX.', answer: 'Ollama (Llama 3.2, Aya 8B) for generation, E5-Base embeddings in PostgreSQL + pgvector, MinIO for files, FastAPI + React, Keycloak for access roles, all on Docker Compose behind NGINX.' },
    fr: { title: 'Stack du RAG', text: 'Ollama avec Llama 3.2 et Aya 8B, embeddings E5-Base, PostgreSQL avec pgvector, MinIO pour les documents, un service de chat FastAPI, une interface React + TypeScript, Keycloak pour les rôles, Docker Compose et NGINX.', answer: 'Ollama (Llama 3.2, Aya 8B) pour la génération, embeddings E5-Base dans PostgreSQL + pgvector, MinIO pour les fichiers, FastAPI + React, Keycloak pour les droits, le tout sur Docker Compose derrière NGINX.' },
  },
  {
    id: 'rag-security', tags: 'security secure privacy audit log guardrails prompt injection hallucination access roles sécurité confidentialité',
    en: { title: 'RAG safeguards', text: 'Answers restricted to retrieved context with source links, guardrails against prompt injection, hallucination reduction, role-based document access and a full audit log. A second pipeline converts PDF tables to Excel.', answer: 'Answers stay inside the retrieved documents and cite them; there are guardrails against prompt injection, role-based access through Keycloak, and an audit log of every question.' },
    fr: { title: 'Garde-fous du RAG', text: 'Réponses limitées au contexte retrouvé avec liens vers les sources, garde-fous contre l’injection de prompt, réduction des hallucinations, accès aux documents par rôle et journal d’audit complet. Un second pipeline convertit les tableaux PDF en Excel.', answer: 'Les réponses restent dans les documents retrouvés et les citent ; il y a des garde-fous contre l’injection de prompt, des droits par rôle via Keycloak et un journal d’audit de chaque question.' },
  },
  {
    id: 'aneu-what', tags: 'research paper aneuxplain aneurysm medical capstone publication icoa explainable ai recherche article anévrisme',
    en: { title: 'AneuXplain', text: 'AneuXplain: explainable AI for intracranial aneurysm rupture-risk prediction from 3D vascular geometry. AUI capstone, spring 2026; paper accepted at ICOA 2026. A research prototype, not a medical device.', answer: 'AneuXplain is my capstone (spring 2026): explainable AI that predicts intracranial aneurysm rupture risk from 3D vessel geometry. The paper was accepted at ICOA 2026. It’s a research prototype, not a medical device.' },
    fr: { title: 'AneuXplain', text: 'AneuXplain : IA explicable pour prédire le risque de rupture des anévrismes intracrâniens à partir de la géométrie vasculaire 3D. Projet de fin d’études AUI, printemps 2026 ; article accepté à ICOA 2026. Prototype de recherche, pas un dispositif médical.', answer: 'AneuXplain est mon projet de fin d’études (printemps 2026) : une IA explicable qui prédit le risque de rupture d’anévrismes intracrâniens à partir de la géométrie 3D des vaisseaux. L’article a été accepté à ICOA 2026. C’est un prototype de recherche, pas un dispositif médical.' },
  },
  {
    id: 'aneu-results', tags: 'results accuracy auc roc metrics score performance dataset intra lausanne résultats précision',
    en: { title: 'AneuXplain results', text: 'Internal test: ROC-AUC 0.834, accuracy 84.9%, PR-AUC 0.93. Trained on IntrA (2,012 3D samples, 103 patients); externally tested on Lausanne TOF-MRA (50 patients: 25 with an aneurysm, 25 healthy).', answer: 'On the internal test set: ROC-AUC 0.834, accuracy 84.9%, PR-AUC 0.93. Trained on IntrA (2,012 3D samples from 103 patients). Generalising to other hospitals is the open problem.' },
    fr: { title: 'Résultats d’AneuXplain', text: 'Test interne : ROC-AUC 0,834, exactitude 84,9 %, PR-AUC 0,93. Entraîné sur IntrA (2 012 échantillons 3D, 103 patients) ; testé en externe sur Lausanne TOF-MRA (50 patients : 25 avec anévrisme, 25 sains).', answer: 'Sur le test interne : ROC-AUC 0,834, exactitude 84,9 %, PR-AUC 0,93. Entraîné sur IntrA (2 012 échantillons 3D, 103 patients). La généralisation à d’autres hôpitaux reste le problème ouvert.' },
  },
  {
    id: 'aneu-method', tags: 'pointnet model method how explainability heatmap morphology point cloud 3d méthode modèle',
    en: { title: 'AneuXplain method', text: 'PointNet on 2,048 points sampled on the vessel surface → max pool → MLP → risk probability. Each prediction gives three explanations: a risk probability, a heatmap of the regions driving it, and a morphology report of 8 measurements.', answer: 'PointNet reads 2,048 points sampled on the vessel surface and outputs a risk probability, explained by a heatmap and an 8-measurement morphology report (dome-to-neck ratio, neck size, aspect ratio and more).' },
    fr: { title: 'Méthode d’AneuXplain', text: 'PointNet sur 2 048 points échantillonnés à la surface du vaisseau → max pooling → MLP → probabilité de risque. Chaque prédiction donne trois explications : une probabilité, une carte de chaleur des zones en cause, et un rapport morphologique de 8 mesures.', answer: 'PointNet lit 2 048 points échantillonnés à la surface du vaisseau et donne une probabilité de risque, expliquée par une carte de chaleur et un rapport morphologique de 8 mesures (rapport dôme/collet, taille du collet, rapport d’aspect…).' },
  },
  {
    id: 'aneu-supervision', tags: 'supervisor advisor professor evaluator kafi bouanane encadrant',
    en: { title: 'AneuXplain supervision', text: 'Supervised by Dr. Oualid Kafi; evaluated by Dr. Lamiae Bouanane.', answer: 'My capstone supervisor was Dr. Oualid Kafi, and the evaluator was Dr. Lamiae Bouanane.' },
    fr: { title: 'Encadrement d’AneuXplain', text: 'Encadré par le Dr Oualid Kafi ; évalué par le Dr Lamiae Bouanane.', answer: 'Mon encadrant était le Dr Oualid Kafi, et l’évaluatrice le Dr Lamiae Bouanane.' },
  },
  {
    id: 'esaha', tags: 'esaha mental health web app react supabase typescript platform santé mentale',
    en: { title: 'eSaha', text: 'eSaha: a privacy-first mental-health platform with secure auth, a specialist directory, real-time chat, private journaling, appointments, emergency contacts and a resources library. React, TypeScript, Vite, Tailwind and Supabase.', answer: 'eSaha is a privacy-first mental-health platform: seven modules (auth, specialists, live chat, journal, appointments, emergency contacts, resources) built with React, TypeScript and Supabase.' },
    fr: { title: 'eSaha', text: 'eSaha : une plateforme de santé mentale pensée pour la confidentialité, avec authentification, annuaire de spécialistes, chat en temps réel, journal privé, rendez-vous, contacts d’urgence et ressources. React, TypeScript, Vite, Tailwind et Supabase.', answer: 'eSaha est une plateforme de santé mentale pensée pour la confidentialité : sept modules (authentification, spécialistes, chat, journal, rendez-vous, urgences, ressources) en React, TypeScript et Supabase.' },
  },
  {
    id: 'quiz', tags: 'kotlin android mobile quiz game app firebase coroutines',
    en: { title: 'Quiz Game App', text: 'An Android quiz game in Kotlin: Firebase auth, real-time questions with a 15-second timer, coroutines, leaderboards and an offline cache.', answer: 'A Kotlin Android quiz game with Firebase auth, a 15-second timer, coroutines, leaderboards and an offline cache.' },
    fr: { title: 'Quiz Game App', text: 'Un jeu de quiz Android en Kotlin : authentification Firebase, questions en temps réel avec un minuteur de 15 secondes, coroutines, classements et cache hors ligne.', answer: 'Un jeu de quiz Android en Kotlin avec Firebase, un minuteur de 15 secondes, des coroutines, des classements et un cache hors ligne.' },
  },
  {
    id: 'courses', tags: 'flutter mobile courses lessons wordpress app dart',
    en: { title: 'Courses & Lessons App', text: 'A Flutter app with a WordPress backend for browsing courses, lessons and media.', answer: 'A Flutter app on a WordPress backend for browsing courses, lessons and media.' },
    fr: { title: 'Courses & Lessons App', text: 'Une application Flutter avec un back-end WordPress pour parcourir cours, leçons et médias.', answer: 'Une application Flutter sur un back-end WordPress pour parcourir cours, leçons et médias.' },
  },
  {
    id: 'kaggle', tags: 'kaggle competition knee rsna ml machine learning now compétition genou',
    en: { title: 'Kaggle', text: 'Currently on Kaggle: RSNA Knee Abnormality Detection, building a lean model for the Efficiency track.', answer: 'On Kaggle I’m working on RSNA Knee Abnormality Detection, building a lean model for the Efficiency track.' },
    fr: { title: 'Kaggle', text: 'En ce moment sur Kaggle : RSNA Knee Abnormality Detection, avec un modèle léger pour la catégorie Efficiency.', answer: 'Sur Kaggle, je travaille sur RSNA Knee Abnormality Detection, avec un modèle léger pour la catégorie Efficiency.' },
  },
  {
    id: 'next', tags: 'next future football soccer idea plan analytics prochain avenir',
    en: { title: 'Next', text: 'Next: an AI-powered football analytics platform, at the idea stage.', answer: 'Next on the list: an AI-powered football analytics platform. It’s at the idea stage.' },
    fr: { title: 'Ensuite', text: 'Ensuite : une plateforme d’analyse football assistée par IA, au stade de l’idée.', answer: 'Prochaine étape : une plateforme d’analyse football assistée par IA. C’est encore une idée.' },
  },
  {
    id: 'skills-code', tags: 'programming languages code coding skills python javascript typescript kotlin java c sql langages',
    en: { title: 'Programming languages', text: 'Python, JavaScript/TypeScript, Kotlin, C, Java and SQL.', answer: 'Python, JavaScript/TypeScript, Kotlin, C, Java and SQL.' },
    fr: { title: 'Langages de programmation', text: 'Python, JavaScript/TypeScript, Kotlin, C, Java et SQL.', answer: 'Python, JavaScript/TypeScript, Kotlin, C, Java et SQL.' },
  },
  {
    id: 'skills-stack', tags: 'skills stack frameworks tools technologies react fastapi node flutter docker postgres supabase pytorch figma git compétences outils',
    en: { title: 'Frameworks and tools', text: 'React, FastAPI, Node.js, Flutter, WordPress, Docker; PostgreSQL (pgvector), MinIO, Ollama, Supabase; Selenium, Git, Tailwind, Vite, Figma; PyTorch (PointNet).', answer: 'React, FastAPI, Node.js and Flutter for products; PostgreSQL + pgvector, MinIO, Ollama and Supabase for data and AI; Selenium for automation; PyTorch for ML; Docker, Git, Vite and Figma around them.' },
    fr: { title: 'Frameworks et outils', text: 'React, FastAPI, Node.js, Flutter, WordPress, Docker ; PostgreSQL (pgvector), MinIO, Ollama, Supabase ; Selenium, Git, Tailwind, Vite, Figma ; PyTorch (PointNet).', answer: 'React, FastAPI, Node.js et Flutter pour les produits ; PostgreSQL + pgvector, MinIO, Ollama et Supabase pour les données et l’IA ; Selenium pour l’automatisation ; PyTorch pour le ML ; Docker, Git, Vite et Figma autour.' },
  },
  {
    id: 'service-automation', tags: 'scraping scrape automation automate bot hire service pack price cost portal excel automatiser robot prix tarif',
    en: { title: 'Pack 01: Automation & scraping', text: 'A Python/Selenium bot for your portals: login, forms, downloads, retries, health checks and failure alerts. Delivered as a repo, YAML config, clean Excel/CSV or database tables, and a one-page runbook. Price on request.', answer: 'Pack 01, Automation & scraping: a Python/Selenium bot for your portals with retries and failure alerts, delivered with clean Excel/CSV or database output and a runbook. Price on request; see /services.' },
    fr: { title: 'Offre 01 : Automatisation & scraping', text: 'Un robot Python/Selenium pour vos portails : connexion, formulaires, téléchargements, reprises, contrôles de santé et alertes. Livré avec le dépôt, la configuration YAML, des tableaux Excel/CSV ou une base propres, et une fiche d’exploitation. Prix sur demande.', answer: 'Offre 01, Automatisation & scraping : un robot Python/Selenium pour vos portails, avec reprises et alertes, livré avec des données Excel/CSV ou en base et une fiche d’exploitation. Prix sur demande ; voir /fr/services.' },
  },
  {
    id: 'service-rag', tags: 'documents ai rag private assistant service pack pdf chatbot on-prem cloud price documents ia assistant privé prix',
    en: { title: 'Pack 02: AI on your documents', text: 'A private RAG assistant over your PDFs in Arabic, French or English, with cited answers and access roles, on your servers (Ollama) or in the cloud. Price on request.', answer: 'Pack 02, AI on your documents: a private RAG assistant over your PDFs (AR/FR/EN) with cited answers and access roles, on-prem or in the cloud. Price on request.' },
    fr: { title: 'Offre 02 : L’IA sur vos documents', text: 'Un assistant RAG privé sur vos PDF en arabe, français ou anglais, avec réponses sourcées et droits d’accès, sur vos serveurs (Ollama) ou dans le cloud. Prix sur demande.', answer: 'Offre 02, L’IA sur vos documents : un assistant RAG privé sur vos PDF (AR/FR/EN), réponses sourcées et droits d’accès, sur site ou dans le cloud. Prix sur demande.' },
  },
  {
    id: 'service-mvp', tags: 'web app mvp startup dashboard fastapi react supabase build product application prix',
    en: { title: 'Pack 03: Web app MVP', text: 'A FastAPI + React (or Supabase) app with auth, a dashboard, the three screens that matter, and deployment. Delivered as a live URL, the repo and a handover call. Price on request.', answer: 'Pack 03, Web app MVP: a FastAPI + React (or Supabase) app with auth, a dashboard and deployment, handed over with the repo. Price on request.' },
    fr: { title: 'Offre 03 : MVP d’application web', text: 'Une application FastAPI + React (ou Supabase) avec authentification, tableau de bord, les trois écrans qui comptent et la mise en ligne. Livrée avec l’URL, le dépôt et un appel de passation. Prix sur demande.', answer: 'Offre 03, MVP d’application web : une application FastAPI + React (ou Supabase) avec authentification, tableau de bord et mise en ligne, remise avec le dépôt. Prix sur demande.' },
  },
  {
    id: 'process', tags: 'process how work working steps method scope demo handover processus étapes méthode',
    en: { title: 'How a project runs', text: 'A call about the data and what “done” means, a one-page written scope, a working demo every week, then handover with code, docs and a walkthrough.', answer: 'A call, a one-page written scope, a working demo every week, then a handover with code and docs.' },
    fr: { title: 'Déroulé d’un projet', text: 'Un appel sur les données et ce que « terminé » veut dire, un périmètre écrit d’une page, une démo fonctionnelle chaque semaine, puis la passation avec code, documentation et démonstration.', answer: 'Un appel, un périmètre écrit d’une page, une démo chaque semaine, puis la passation avec le code et la documentation.' },
  },
  {
    id: 'contact', tags: 'contact email mail reach github message write joindre écrire',
    en: { title: 'Contact', text: 'Email: elaraki48@gmail.com. GitHub: github.com/mohamedelarakitantaoui.', answer: 'Email me at elaraki48@gmail.com, or find my code at github.com/mohamedelarakitantaoui.' },
    fr: { title: 'Contact', text: 'E-mail : elaraki48@gmail.com. GitHub : github.com/mohamedelarakitantaoui.', answer: 'Écrivez-moi à elaraki48@gmail.com, ou voyez mon code sur github.com/mohamedelarakitantaoui.' },
  },
  {
    id: 'cv', tags: 'cv resume résumé pdf download curriculum télécharger',
    en: { title: 'CV', text: 'The CV is on /cv, with a PDF download (software engineering track).', answer: 'The CV is on the /cv page, with a PDF download.' },
    fr: { title: 'CV', text: 'Le CV est sur /fr/cv, avec un PDF à télécharger (parcours génie logiciel).', answer: 'Le CV est sur la page /fr/cv, avec un PDF à télécharger.' },
  },
  {
    id: 'site', tags: 'site website built terminal how this demo bm25 retrieval works astro gsap lenis rag comment fonctionne',
    en: { title: 'This terminal', text: 'This terminal is a client-side retrieval demo: your question is tokenised and scored against these notes with BM25, entirely in your browser. No LLM, no server, and no data leaves the page. The site is built with Astro, GSAP and Lenis.', answer: 'It’s BM25 retrieval over a small JSON file of my notes, running in your browser. The answer is the best-matching note, shown with its score. No LLM and nothing is sent anywhere.' },
    fr: { title: 'Ce terminal', text: 'Ce terminal est une démo de recherche côté client : votre question est découpée en mots et notée avec BM25 contre ces notes, entièrement dans votre navigateur. Pas de LLM, pas de serveur, aucune donnée ne quitte la page. Le site est construit avec Astro, GSAP et Lenis.', answer: 'C’est une recherche BM25 sur un petit fichier JSON de mes notes, dans votre navigateur. La réponse est la note la mieux classée, affichée avec son score. Pas de LLM, rien n’est envoyé.' },
  },
  {
    id: 'creative', tags: 'creative photography photo design hobby video adobe photoshop indesign xd créatif photographie',
    en: { title: 'Creative work', text: 'Photography and layout work: “Journey Through the Lens”, a photo book following two students’ capstone projects; “Call for Duty”, a six-frame series shot in a university lab; plus Adobe XD, Photoshop and InDesign projects.', answer: 'Photography and layout: a photo book called “Journey Through the Lens”, a six-frame series called “Call for Duty”, and Adobe XD, Photoshop and InDesign projects. See /creative.' },
    fr: { title: 'Travail créatif', text: 'Photographie et mise en page : « Journey Through the Lens », un livre photo qui suit les projets de fin d’études de deux étudiants ; « Call for Duty », une série de six images prise dans un laboratoire universitaire ; et des projets Adobe XD, Photoshop et InDesign.', answer: 'Photographie et mise en page : un livre photo, « Journey Through the Lens », une série de six images, « Call for Duty », et des projets Adobe XD, Photoshop et InDesign. Voir /fr/creative.' },
  },
];

export function corpus(lang: Lang) {
  return chunks.map((c) => ({ id: c.id, ...c[lang], tags: c.tags }));
}
export const corpusSize = chunks.length;
