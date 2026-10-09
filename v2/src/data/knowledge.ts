// ask-mamoun corpus. Same facts as the pages; nothing marked TODO is included.
// Served as /knowledge.json and /fr/knowledge.json and searched client-side with BM25.
import type { Lang } from '../i18n/ui';

interface Side { title: string; text: string; answer: string }
interface Chunk { id: string; tags: string; en: Side; fr: Side }

const chunks: Chunk[] = [
  {
    id: 'identity', tags: 'who name mamoun about yourself qui présentation',
    en: { title: 'Who', text: 'Mamoun El Araki is an AI and software engineer: machine learning that explains its predictions, data pipelines, and web and mobile apps.', answer: 'Mamoun El Araki, an AI and software engineer: I build ML that explains itself, and the software that ships it.' },
    fr: { title: 'Qui', text: 'Mamoun El Araki est ingénieur IA et logiciel : du machine learning qui explique ses prédictions, des pipelines de données, des applications web et mobiles.', answer: 'Mamoun El Araki, ingénieur IA et logiciel : je construis du ML qui s’explique, et le logiciel qui le met en production.' },
  },
  {
    id: 'location', tags: 'where based location city live morocco remote relocation où ville maroc habite distance',
    en: { title: 'Location', text: 'Based in Morocco (GMT+1), open to remote work and relocation. Studied in Ifrane (Al Akhawayn University) and Istanbul (Boğaziçi University).', answer: 'Based in Morocco, open to remote work and relocation. I studied in Ifrane and spent a semester in Istanbul.' },
    fr: { title: 'Localisation', text: 'Basé au Maroc (GMT+1), ouvert au travail à distance et à la relocalisation. Études à Ifrane (Université Al Akhawayn) et à Istanbul (Université Boğaziçi).', answer: 'Basé au Maroc, ouvert au travail à distance et à la relocalisation. J’ai étudié à Ifrane et passé un semestre à Istanbul.' },
  },
  {
    id: 'availability-roles', tags: 'available availability hire hiring job role roles remote relocate europe canada us usa 2027 full-time junior disponible poste emploi recrutement distance',
    en: { title: 'Availability (employers)', text: 'Open to junior AI, ML and software engineering roles. Based in Morocco, open to remote and relocation.', answer: 'Yes: I’m looking for a first full-time junior AI, ML or software engineering role, remote or relocating.' },
    fr: { title: 'Disponibilité (recruteurs)', text: 'Ouvert aux postes junior en IA, ML et génie logiciel. Basé au Maroc, ouvert au travail à distance et à la relocalisation.', answer: 'Oui : je cherche un premier poste junior à temps plein en IA, ML ou génie logiciel, à distance ou en me relocalisant.' },
  },
  {
    id: 'availability-freelance', tags: 'freelance client project contract hire mission projet indépendant',
    en: { title: 'Availability (clients)', text: 'Taking freelance projects: automation and scraping, and web app MVPs, as two fixed-scope packs.', answer: 'Yes. Two fixed-scope packs: automation & data collection, and a web app MVP. Prices are on request.' },
    fr: { title: 'Disponibilité (clients)', text: 'Disponible en freelance : automatisation et scraping, et MVP d’application web, en deux offres au périmètre fixe.', answer: 'Oui. Deux offres au périmètre fixe : automatisation & scraping, et MVP d’application web. Prix sur demande.' },
  },
  {
    id: 'languages', tags: 'language languages speak spoken english french arabic spanish langue langues parle anglais français arabe espagnol',
    en: { title: 'Languages', text: 'English, French, Arabic; Spanish (beginner).', answer: 'English, French and Arabic, plus beginner Spanish.' },
    fr: { title: 'Langues', text: 'Anglais, français, arabe ; espagnol (débutant).', answer: 'Anglais, français et arabe, plus un espagnol débutant.' },
  },
  {
    id: 'education-aui', tags: 'education degree university study studied school aui al akhawayn ifrane bachelor computer science diplôme université études licence',
    en: { title: 'Education: Al Akhawayn', text: 'BSc in Computer Science with a minor in Communication Studies, Al Akhawayn University, Ifrane, September 2021 to July 2026. Capstone: AneuXplain (spring 2026).', answer: 'BSc Computer Science (minor in Communication Studies) at Al Akhawayn University in Ifrane, 2021–2026. My capstone was AneuXplain.' },
    fr: { title: 'Formation : Al Akhawayn', text: 'Licence (BSc) en informatique, mineure en communication, Université Al Akhawayn, Ifrane, de septembre 2021 à juillet 2026. Projet de fin d’études : AneuXplain (printemps 2026).', answer: 'Licence (BSc) en informatique, mineure en communication, à l’Université Al Akhawayn d’Ifrane, 2021–2026. Projet de fin d’études : AneuXplain.' },
  },
  {
    id: 'education-bogazici', tags: 'exchange istanbul turkey bogazici boğaziçi abroad semester échange turquie semestre',
    en: { title: 'Education: Boğaziçi', text: 'Exchange student in Computer Engineering at Boğaziçi University, Istanbul, fall 2024.', answer: 'A fall 2024 exchange semester in Computer Engineering at Boğaziçi University, Istanbul.' },
    fr: { title: 'Formation : Boğaziçi', text: 'Étudiant en échange en génie informatique à l’Université Boğaziçi, Istanbul, automne 2024.', answer: 'Un semestre d’échange en génie informatique à l’Université Boğaziçi d’Istanbul, à l’automne 2024.' },
  },
  {
    id: 'intelcia', tags: 'intelcia internship intern 2025 build built work did chatbot dataset llm training stage construit fait',
    en: { title: 'Intelcia internship', text: 'Software Engineer Intern at Intelcia Solutions in Rabat, June–August 2025. Built the DCE Scraper, which collects public-procurement documents (DCE) from marchespublics.gov.ma, marocao.com and Intelcia’s internal purchasing portal into an LLM training dataset for an AI chatbot: 90% less processing time (2h30 → 15 min), 10+ hours saved per week.', answer: 'At Intelcia (summer 2025) I built the DCE Scraper: it collects public-procurement documents from three portals into an LLM training dataset for an AI chatbot. Processing time fell by 90%, from 2h30 to 15 min, saving 10+ hours a week.' },
    fr: { title: 'Stage chez Intelcia', text: 'Stagiaire ingénieur logiciel chez Intelcia Solutions à Rabat, juin–août 2025. Conception du DCE Scraper, qui collecte des documents de marchés publics (DCE) sur marchespublics.gov.ma, marocao.com et le portail d’achats interne d’Intelcia pour un jeu de données d’entraînement de chatbot IA : 90 % de temps de traitement en moins (2 h 30 → 15 min), plus de 10 heures gagnées par semaine.', answer: 'Chez Intelcia (été 2025), j’ai construit le DCE Scraper : il collecte des documents de marchés publics sur trois portails pour le jeu de données d’entraînement d’un chatbot IA. Le temps de traitement a baissé de 90 %, de 2 h 30 à 15 min, soit plus de 10 heures gagnées par semaine.' },
  },
  {
    id: 'dce-numbers', tags: 'numbers result results faster speed performance metrics microservices monolith impact chiffres résultats vitesse',
    en: { title: 'DCE Scraper results', text: '90% less processing time: 2h30 → 15 minutes for 300 consultations, 10+ hours saved per week. A 3,643-line monolith split into 7 services running up to 10 browsers in parallel. YAML config per portal, so a new portal needs no code change. Retries and health checks brought silent failures to zero.', answer: '90% less processing time: 300 consultations in 15 minutes instead of 2h30, saving 10+ hours a week. A 3,643-line monolith became 7 services running up to 10 browsers in parallel, with zero silent failures.' },
    fr: { title: 'Résultats du DCE Scraper', text: '90 % de temps de traitement en moins : 2 h 30 → 15 minutes pour 300 consultations, plus de 10 heures gagnées par semaine. Un monolithe de 3 643 lignes découpé en 7 services, jusqu’à 10 navigateurs en parallèle. Une configuration YAML par portail : un nouveau portail sans changer le code. Reprises et contrôles de santé : zéro échec silencieux.', answer: '90 % de temps de traitement en moins : 300 consultations en 15 minutes au lieu de 2 h 30, soit plus de 10 heures gagnées par semaine. Un monolithe de 3 643 lignes devenu 7 services, jusqu’à 10 navigateurs en parallèle, sans échec silencieux.' },
  },
  {
    id: 'dce-stack', tags: 'stack tech technology scraper selenium python architecture services yaml click',
    en: { title: 'DCE Scraper stack', text: 'Python 3.12, Selenium WebDriver, YAML configuration per portal, threading and async, a Click CLI. Seven services: HybridOrchestrator, UrlExtraction, FormProcessing, DownloadManagement, WorkerPool, FileManagement, Retry.', answer: 'Python 3.12 and Selenium WebDriver, YAML config per portal and a Click CLI, split into 7 services around a HybridOrchestrator.' },
    fr: { title: 'Stack du DCE Scraper', text: 'Python 3.12, Selenium WebDriver, configuration YAML par portail, threading et async, une CLI Click. Sept services : HybridOrchestrator, UrlExtraction, FormProcessing, DownloadManagement, WorkerPool, FileManagement, Retry.', answer: 'Python 3.12 et Selenium WebDriver, une configuration YAML par portail et une CLI Click, en 7 services autour d’un HybridOrchestrator.' },
  },
  {
    id: 'its', tags: 'its elaraki preparia 2024 wordpress h5p internship school platform baccalaureate students teachers stage école baccalauréat élèves',
    en: { title: 'ITS Elaraki internship', text: 'Web applications intern at ITS Elaraki School in Marrakech, June–August 2024. Built Preparia, an exam-prep platform on WordPress and H5P with 30+ interactive modules across 6 baccalaureate subjects, and onboarded 150+ students and 12 teachers. Live at preparia.ma.', answer: 'In summer 2024 I built Preparia for ITS Elaraki School: 30+ interactive modules across 6 baccalaureate subjects, on WordPress and H5P. I ran the training that onboarded 150+ students and 12 teachers.' },
    fr: { title: 'Stage chez ITS Elaraki', text: 'Stagiaire en applications web chez ITS Elaraki School à Marrakech, juin–août 2024. Conception de Preparia, plateforme de préparation aux examens sur WordPress et H5P : plus de 30 modules interactifs sur 6 matières du baccalauréat, plus de 150 élèves et 12 enseignants formés. En ligne sur preparia.ma.', answer: 'À l’été 2024, j’ai construit Preparia pour ITS Elaraki School : plus de 30 modules interactifs sur 6 matières du baccalauréat, sur WordPress et H5P. J’ai assuré la formation de plus de 150 élèves et 12 enseignants.' },
  },
  {
    id: 'mentor', tags: 'mentor mentoring compete aui algorithms algorithmic problem solving competitive programming leadership tutorat algorithmique',
    en: { title: 'Mentoring', text: 'Mentor with the AUI Compete Organisation: algorithmic problem solving.', answer: 'I mentor students with the AUI Compete Organisation in algorithmic problem solving.' },
    fr: { title: 'Mentorat', text: 'Mentor à l’AUI Compete Organisation : résolution de problèmes algorithmiques.', answer: 'J’accompagne des étudiants de l’AUI Compete Organisation en résolution de problèmes algorithmiques.' },
  },
  {
    id: 'aneu-what', tags: 'research paper aneuxplain aneurysm medical capstone publication icoa explainable ai recherche article anévrisme',
    en: { title: 'AneuXplain', text: 'AneuXplain: explainable AI for intracranial aneurysm rupture-risk prediction from 3D vascular geometry. AUI capstone, spring 2026; paper accepted at ICOA 2026. A research prototype, not a medical device.', answer: 'AneuXplain is my capstone (spring 2026): explainable AI that predicts intracranial aneurysm rupture risk from 3D vessel geometry. The paper was accepted at ICOA 2026. It’s a research prototype, not a medical device.' },
    fr: { title: 'AneuXplain', text: 'AneuXplain : IA explicable pour prédire le risque de rupture des anévrismes intracrâniens à partir de la géométrie vasculaire 3D. Projet de fin d’études AUI, printemps 2026 ; article accepté à ICOA 2026. Prototype de recherche, pas un dispositif médical.', answer: 'AneuXplain est mon projet de fin d’études (printemps 2026) : une IA explicable qui prédit le risque de rupture d’anévrismes intracrâniens à partir de la géométrie 3D des vaisseaux. L’article a été accepté à ICOA 2026. C’est un prototype de recherche, pas un dispositif médical.' },
  },
  {
    id: 'aneu-results', tags: 'results accuracy auc roc metrics score performance dataset intra lausanne résultats précision',
    en: { title: 'AneuXplain results', text: 'Held-out internal test (16 patients, patient-level split): ROC-AUC 0.834, accuracy 85%, PR-AUC 0.626. Trained on IntrA (2,012 3D samples, 103 patients). External Lausanne TOF-MRA cohort (50 subjects): 48 processed end to end, cross-dataset ROC-AUC 0.557.', answer: 'ROC-AUC 0.834 and 85% accuracy on 16 held-out patients (patient-level split), inside the published range for PointNet on IntrA. On another hospital’s scans it drops to 0.557, and the app flags them as out of distribution: generalising across hospitals is the open problem.' },
    fr: { title: 'Résultats d’AneuXplain', text: 'Test interne mis de côté (16 patients, découpage par patient) : ROC-AUC 0,834, exactitude 85 %, PR-AUC 0,626. Entraîné sur IntrA (2 012 échantillons 3D, 103 patients). Cohorte externe Lausanne TOF-MRA (50 sujets) : 48 traités de bout en bout, ROC-AUC entre jeux de données 0,557.', answer: 'ROC-AUC de 0,834 et 85 % d’exactitude sur 16 patients mis de côté (découpage par patient), dans la fourchette publiée pour PointNet sur IntrA. Sur les examens d’un autre hôpital, elle tombe à 0,557, et l’application les signale hors distribution : la généralisation d’un hôpital à l’autre reste le problème ouvert.' },
  },
  {
    id: 'aneu-method', tags: 'pointnet model method how explainability heatmap morphology point cloud 3d méthode modèle',
    en: { title: 'AneuXplain method', text: 'PointNet on 2,048 points sampled on the vessel surface → max pool → MLP → risk probability. Each prediction gives three explanations: a risk probability, a gradient-saliency heatmap of the regions driving it, and a morphology report of 8 measurements.', answer: 'PointNet reads 2,048 points sampled on the vessel surface and outputs a risk probability, explained by a gradient-saliency heatmap and an 8-measurement morphology report (dome-to-neck ratio, neck size, aspect ratio and more).' },
    fr: { title: 'Méthode d’AneuXplain', text: 'PointNet sur 2 048 points échantillonnés à la surface du vaisseau → max pooling → MLP → probabilité de risque. Chaque prédiction donne trois explications : une probabilité, une carte de chaleur des zones en cause, et un rapport morphologique de 8 mesures.', answer: 'PointNet lit 2 048 points échantillonnés à la surface du vaisseau et donne une probabilité de risque, expliquée par une carte de chaleur et un rapport morphologique de 8 mesures (rapport dôme/collet, taille du collet, rapport d’aspect…).' },
  },
  {
    id: 'aneu-supervision', tags: 'supervisor advisor professor evaluator kafi bouanane encadrant',
    en: { title: 'AneuXplain supervision', text: 'Supervised by Dr. Oualid Kafi; evaluated by Dr. Lamiae Bouanane.', answer: 'My capstone supervisor was Dr. Oualid Kafi, and the evaluator was Dr. Lamiae Bouanane.' },
    fr: { title: 'Encadrement d’AneuXplain', text: 'Encadré par le Dr Oualid Kafi ; évalué par le Dr Lamiae Bouanane.', answer: 'Mon encadrant était le Dr Oualid Kafi, et l’évaluatrice le Dr Lamiae Bouanane.' },
  },
  {
    id: 'esaha', tags: 'esaha mental health web app react typescript flask mongodb gpt llm assistant multilingual languages jwt 2025 santé mentale langues',
    en: { title: 'eSaha', text: 'eSaha (2025): a mental-health platform with a GPT-powered conversational assistant in 4 languages. React and TypeScript front end, Flask back end, MongoDB, JWT authentication, sentiment analysis, dashboards and appointment booking.', answer: 'eSaha is a mental-health platform with a GPT-powered assistant in 4 languages, built with React, TypeScript, Flask and MongoDB, behind JWT-secured APIs.' },
    fr: { title: 'eSaha', text: 'eSaha (2025) : une plateforme de santé mentale avec un assistant conversationnel GPT en 4 langues. Interface React et TypeScript, back-end Flask, MongoDB, authentification JWT, analyse de sentiment, tableaux de bord et prise de rendez-vous.', answer: 'eSaha est une plateforme de santé mentale avec un assistant GPT en 4 langues, construite en React, TypeScript, Flask et MongoDB, avec des API sécurisées par JWT.' },
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
    id: 'pitchpoint', tags: 'pitchpoint football soccer xg expected goals statsbomb lightgbm attention set encoder calibration ece evaluation tests model now building current working on sport buts attendus en cours',
    en: { title: 'PitchPoint', text: 'PitchPoint (2026, web demo in progress): a football expected-goals (xG) model trained on 99,000+ events. An attention-based set encoder over player positions, blended 50/50 with LightGBM, benchmarked against gradient boosting and linear baselines. The evaluation harness came before any model: grouped cross-validation, out-of-distribution holdouts, clustered bootstrap significance tests, 444 passing tests and a model card. Calibration error (ECE) fell from 0.0464 to 0.0038.', answer: 'PitchPoint is a football xG model trained on 99,000+ events, benchmarked against gradient boosting and linear baselines. Its calibration error (ECE) fell from 0.0464 to 0.0038, checked on out-of-distribution holdouts with bootstrap significance tests and 444 passing tests. The FastAPI + React web demo is in progress.' },
    fr: { title: 'PitchPoint', text: 'PitchPoint (2026, démo web en cours) : un modèle de buts attendus (xG) entraîné sur plus de 99 000 événements. Un encodeur d’ensembles à attention sur les positions des joueurs, mélangé à 50/50 avec LightGBM, comparé à des références de gradient boosting et linéaire. Le banc d’évaluation est venu avant tout modèle : validation croisée groupée, données hors distribution, tests de significativité par bootstrap, 444 tests au vert et une fiche de modèle. L’erreur de calibration (ECE) est passée de 0,0464 à 0,0038.', answer: 'PitchPoint est un modèle xG entraîné sur plus de 99 000 événements, comparé à des références de gradient boosting et linéaire. Son erreur de calibration (ECE) est passée de 0,0464 à 0,0038, vérifiée hors distribution avec des tests de significativité par bootstrap et 444 tests au vert. La démo web FastAPI + React est en cours.' },
  },

  {
    id: 'mini-private-cloud', tags: 'mini private cloud docker orchestration cli devops containers infra nginx yaml scaling load balancing self-healing conteneurs',
    en: { title: 'Mini Private Cloud', text: 'Mini Private Cloud (2026): a Python CLI that drives the Docker Engine. Declarative YAML provisioning, isolated container networking, persistent volumes, an Nginx gateway, horizontal scaling, load balancing, monitoring and self-healing services.', answer: 'Mini Private Cloud is a Python CLI that drives the Docker Engine: you declare services in YAML, and it provisions, scales and load-balances them behind an Nginx gateway, with self-healing services.' },
    fr: { title: 'Mini Private Cloud', text: 'Mini Private Cloud (2026) : un CLI Python qui pilote le Docker Engine. Provisionnement déclaratif en YAML, réseaux de conteneurs isolés, volumes persistants, passerelle Nginx, montée en charge horizontale, répartition de charge, supervision et services auto-réparateurs.', answer: 'Mini Private Cloud est un CLI Python qui pilote le Docker Engine : on déclare les services en YAML, et il les provisionne, les fait monter en charge et répartit la charge derrière une passerelle Nginx, avec des services auto-réparateurs.' },
  },
  {
    id: 'skills-code', tags: 'programming languages code coding skills python javascript typescript kotlin java c sql dart langages',
    en: { title: 'Programming languages', text: 'Python, SQL, JavaScript, TypeScript, Java, C/C++, Kotlin, Dart and YAML.', answer: 'Python, SQL, JavaScript, TypeScript, Java, C/C++, Kotlin, Dart and YAML.' },
    fr: { title: 'Langages de programmation', text: 'Python, SQL, JavaScript, TypeScript, Java, C/C++, Kotlin, Dart et YAML.', answer: 'Python, SQL, JavaScript, TypeScript, Java, C/C++, Kotlin, Dart et YAML.' },
  },
  {
    id: 'skills-stack', tags: 'skills stack frameworks tools technologies react fastapi flask node three flutter docker kubernetes nginx aws tekton postgres postgresql mongodb pytorch scikit-learn lightgbm git compétences outils',
    en: { title: 'Frameworks and tools', text: 'ML: PyTorch, scikit-learn, LightGBM, Pandas, NumPy. Generative AI: GPT API integration, prompt engineering. Backend and data: FastAPI, Flask, Node.js, PostgreSQL, MySQL, MongoDB, SQLAlchemy. Frontend: React, Next.js, Three.js, Tailwind, Flutter. DevOps: Docker, Kubernetes, Nginx, CI/CD (Tekton), AWS, Linux, Git. Automation: Selenium.', answer: 'PyTorch, scikit-learn and LightGBM for ML; FastAPI, Flask and React for products; PostgreSQL and MongoDB for data; Docker, Kubernetes, Nginx, Tekton CI/CD and AWS for deployment.' },
    fr: { title: 'Frameworks et outils', text: 'ML : PyTorch, scikit-learn, LightGBM, Pandas, NumPy. IA générative : intégration de l’API GPT, prompt engineering. Back-end et données : FastAPI, Flask, Node.js, PostgreSQL, MySQL, MongoDB, SQLAlchemy. Front-end : React, Next.js, Three.js, Tailwind, Flutter. DevOps : Docker, Kubernetes, Nginx, CI/CD (Tekton), AWS, Linux, Git. Automatisation : Selenium.', answer: 'PyTorch, scikit-learn et LightGBM pour le ML ; FastAPI, Flask et React pour les produits ; PostgreSQL et MongoDB pour les données ; Docker, Kubernetes, Nginx, CI/CD Tekton et AWS pour le déploiement.' },
  },
  {
    id: 'service-automation', tags: 'scraping scrape automation automate bot hire service pack price cost portal excel automatiser robot prix tarif',
    en: { title: 'Pack 01: Automation & scraping', text: 'A Python/Selenium bot for your portals: login, forms, downloads, retries, health checks and failure alerts. Delivered as a repo, YAML config, clean Excel/CSV or database tables, and a one-page runbook. Price on request.', answer: 'Pack 01, Automation & scraping: a Python/Selenium bot for your portals with retries and failure alerts, delivered with clean Excel/CSV or database output and a runbook. Price on request; see /services.' },
    fr: { title: 'Offre 01 : Automatisation & scraping', text: 'Un robot Python/Selenium pour vos portails : connexion, formulaires, téléchargements, reprises, contrôles de santé et alertes. Livré avec le dépôt, la configuration YAML, des tableaux Excel/CSV ou une base propres, et une fiche d’exploitation. Prix sur demande.', answer: 'Offre 01, Automatisation & scraping : un robot Python/Selenium pour vos portails, avec reprises et alertes, livré avec des données Excel/CSV ou en base et une fiche d’exploitation. Prix sur demande ; voir /fr/services.' },
  },
  {
    id: 'service-mvp', tags: 'web app mvp startup dashboard fastapi flask react build product application prix',
    en: { title: 'Pack 02: Web app MVP', text: 'A FastAPI or Flask back end with a React front end: auth, a dashboard, the three screens that matter, and deployment. Delivered as a live URL, the repo and a handover call. Price on request.', answer: 'Pack 02, Web app MVP: a FastAPI or Flask back end with a React front end, auth, a dashboard and deployment, handed over with the repo. Price on request.' },
    fr: { title: 'Offre 02 : MVP d’application web', text: 'Un back-end FastAPI ou Flask avec une interface React : authentification, tableau de bord, les trois écrans qui comptent et la mise en ligne. Livré avec l’URL, le dépôt et un appel de passation. Prix sur demande.', answer: 'Offre 02, MVP d’application web : un back-end FastAPI ou Flask avec une interface React, authentification, tableau de bord et mise en ligne, remis avec le dépôt. Prix sur demande.' },
  },
  {
    id: 'process', tags: 'process how work working steps method scope demo handover processus étapes méthode',
    en: { title: 'How a project runs', text: 'A call about the data and what “done” means, a one-page written scope, a working demo every week, then handover with code, docs and a walkthrough.', answer: 'A call, a one-page written scope, a working demo every week, then a handover with code and docs.' },
    fr: { title: 'Déroulé d’un projet', text: 'Un appel sur les données et ce que « terminé » veut dire, un périmètre écrit d’une page, une démo fonctionnelle chaque semaine, puis la passation avec code, documentation et démonstration.', answer: 'Un appel, un périmètre écrit d’une page, une démo chaque semaine, puis la passation avec le code et la documentation.' },
  },
  {
    id: 'contact', tags: 'contact email mail reach github linkedin message write joindre écrire',
    en: { title: 'Contact', text: 'Email: elaraki48@gmail.com. LinkedIn: linkedin.com/in/mohamed-al-mamoun-t-el-araki-27ab042a3. GitHub: github.com/mohamedelarakitantaoui.', answer: 'Email me at elaraki48@gmail.com, or find me on LinkedIn and GitHub (github.com/mohamedelarakitantaoui).' },
    fr: { title: 'Contact', text: 'E-mail : elaraki48@gmail.com. LinkedIn : linkedin.com/in/mohamed-al-mamoun-t-el-araki-27ab042a3. GitHub : github.com/mohamedelarakitantaoui.', answer: 'Écrivez-moi à elaraki48@gmail.com, ou retrouvez-moi sur LinkedIn et GitHub (github.com/mohamedelarakitantaoui).' },
  },
  {
    id: 'cv', tags: 'cv resume résumé pdf download curriculum télécharger',
    en: { title: 'CV', text: 'The CV is on /cv: experience, projects, education and skills, with PDF versions for AI/ML, data and software engineering.', answer: 'The CV is on the /cv page: experience, projects, education and skills, with PDF versions by track.' },
    fr: { title: 'CV', text: 'Le CV est sur /fr/cv : expérience, projets, formation et compétences, avec des versions PDF IA/ML, data, logiciel et un CV « Conseil » en français.', answer: 'Le CV est sur la page /fr/cv, avec des versions PDF IA/ML, data, logiciel et un CV « Conseil » en français.' },
  },
  {
    id: 'site', tags: 'site website built terminal how this demo bm25 retrieval search works astro gsap lenis comment fonctionne',
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
