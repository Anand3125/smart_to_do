# 👋 Hi, I'm Anand Kumar

🎓 Full-Stack Developer | MERN + Python | AI Integration Enthusiast  
🌱 Currently building smart, intelligent apps with Next.js, Django, and Gemini AI.



## 🔭 Latest Project

### 🧠 [Smart To-Do](https://github.com/Anand3125/smart_to_do)
A full-stack to-do app with Gemini AI-based grammar correction.

- ✅ Next.js + Django REST
- 🔮 Integrated Google Gemini API
- 🌐 Deployed on Vercel & Render
- 📦 Includes CORS, PostgreSQL, and auto deploys





## 🛠️ Getting Started Locally

### 🌐 Frontend

```bash
cd smart-todo-frontend
npm install
npm run dev
```

---

### 🔧 Backend

```bash
cd smart-todo-backend
python -m venv venv
source venv/bin/activate       # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```



## 🌐 Deployment Steps

### ✅ Frontend on Vercel

* Connect GitHub repo
* Set root to `/smart-todo-frontend`
* Auto deploy on push

### ✅ Backend on Render

* Connect repo → root: `/smart-todo-backend`
* Add env variables:

| Key                 | Description                   |
| ------------------- | ----------------------------- |
| `DJANGO_SECRET_KEY` | Django secret key             |
| `DEBUG`             | False                         |
| `DATABASE_URL`      | PostgreSQL DB URL from Render |
| `GEMINI_API_KEY`    | Your Gemini API key           |

* Build command:

  ```bash
  pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
  ```
* Start command:

  ```bash
  gunicorn your_project_name.wsgi:application
  ```

---



## 🛠️ Projec Demo Video 



🔗 VideoLink: [Google Drive Video](https://drive.google.com/file/d/1LBIJeIy4jvlZxUk33_UbnZjHtoknKrPY/view?usp=sharing)

## 🛠️ Full Projec Google Drive Link in case if you fail to load all the npm packages or not able to start the app due to version issue.



🔗 GooleDrive: [Google Drive Project link](https://drive.google.com/drive/folders/1rYD8zKLqsNvYXPNpkguCcGZh-dyRLBKR?usp=sharing)




 🗂️ Project Structure

```

AItodo/
├── smart-todo-frontend/    # Next.js client
└── smart-todo-backend/     # Django REST API server

````



## 🎯 Features

✅ Create, update, and delete tasks  
✅ AI-enhanced grammar correction via Gemini API  
✅ Responsive UI with Next.js  
✅ REST API with Django REST Framework  
✅ CORS-enabled frontend-backend integration  
✅ Ready for deployment (Vercel + Render)

---

## 🔮 Gemini AI Integration

This project integrates **Google Gemini AI** to enhance the user experience through:

- ✏️ **Grammar correction** for task inputs  
- 🧠 **Smart suggestions** while creating tasks  
- 🎤 (Planned) **Voice input** to text via AI  



## ⚙️ Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | Next.js, React, Tailwind CSS (?)    |
| Backend    | Django, Django REST, Gunicorn       |
| AI Service | Gemini API (Google)                 |
| Database   | PostgreSQL (via Render)             |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🌐 Deployment Overview

### 🖥️ Frontend on Vercel

* Connect GitHub repo
* Set project root: `/smart-todo-frontend`

### 🗄️ Backend on Render

* Connect GitHub repo
* Root: `smart-todo-backend`
* Add environment variables:

  * `DJANGO_SECRET_KEY`
  * `DEBUG=False`
  * `DATABASE_URL`
  * `GEMINI_API_KEY`

---

## 🧪 Roadmap / To-Do

* [x] Gemini AI integration for grammar check
* [ ] JWT-based user authentication
* [ ] Voice-to-text using Gemini speech input
* [ ] Docker support for local dev
* [ ] GitHub Actions for CI/CD
* [ ] API documentation with Swagger or Redoc

---



---


## 📌 Other Projects

👉 **E-commerce React Website (Frontend):**
🔗 [ecommerce-react-website-beta.vercel.app](https://ecommerce-react-website-beta.vercel.app/)

👉 **E-commerce API (Node.js/Express):**
🔗 [evara-main-backend.onrender.com/api/products](https://evara-main-backend.onrender.com/api/products)



## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss.

---

## 👨‍💻 About Me

Hi, I'm **Anand Kumar**, a full-stack developer passionate about modern web and AI integration.

* 📧 Email: [georgian3125anand@gmail.com](mailto:georgian3125anand@gmail.com)
* 📞 Phone: +91 9430417562
* 🌐 Portfolio: [https://anand3125.github.io/Akfolio/](https://anand3125.github.io/Akfolio/)
* 🔗 LinkedIn: [linkedin.com/in/georgian3125anand](https://www.linkedin.com/in/georgian3125anand/)
* 📅 Last Updated: **July 9th, 2025**
* 📄 Resume: [https://shorturl.at/6tjZ9](https://shorturl.at/6tjZ9)

---
