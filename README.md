# Laravel React Eshop

A full-stack e-commerce application built with Laravel (backend and API) and React.js with React-Redux (frontend). Tailwind CSS is used for styling. 

The project showcases a complete shopping experience for customers, as well as an admin dashboard for e-shop management. It is built to demonstrate my full-stack development skills.

## Demo

### Website

https://laravel-react-eshop.sileikisdemo.net 

**Test Account for Customers:**
```
Email: user@example.com
Password: user123
```


### Admin Dashboard
https://laravel-react-eshop.sileikisdemo.net/dashboard  

**Test Account for Admin:**
```
Email: admin@example.com
Password: admin123
```

## Features

### Customer Website
- Browse and search products
- Add products to the shopping cart
- Register and log in to complete purchases
- View order history and status in the user profile

### Admin Dashboard
- Admin-only access to manage the e-shop
- Add, edit, or delete products and categories
- View and manage customer orders

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- PHP 8.2 or higher
- MySQL
- Composer
- Node.js and npm

### Steps to Install

1. **Clone the Repository**
   ```
   git clone <https://github.com/RaimondasSileikis/laravel-react-eshop.git>
   cd laravel-react-eshop
   ```

2. **Set up Backend (Laravel)**

- Copy the example environment file and update credentials: `cp .env.example .env`
- Set up the database and configure credentials in `.env.`
- Install dependencies: `composer install`
- Generate the application key: `php artisan key:generate --ansi`
- Run migrations and seed the database: `php artisan migrate --seed`
- Start the Laravel server: `php artisan serve`

3. **Set up Frontend (React)**

- Navigate to the React frontend directory: `cd react`
- Install npm dependencies: `npm install`
- Copy `cp .env.example .env`
- Make sure VITE_API_BASE_URL key in `.env` is set to your Laravel API host (http://localhost:8000)
- Start the Vite development server: `npm run dev`

4. **Access the Application**

- Website: Visit URL (default: http://localhost:3000)
- Admin Dashboard: Navigate to /dashboard on the same URL

### Built With
- Backend: Laravel 11
- Frontend: React.js, React-Redux, Tailwind CSS
- API: RESTful API routes created in Laravel

### Demonstrated Skills

- Full-stack development using Laravel and React
- Implementing secure user authentication and authorization
- RESTful API development and integration
- State management with React-Redux
- Responsive and modern UI design with Tailwind CSS
- Role-based access control for admin and customer functionalities
- Database design and seeding

### Let me know if you’d like to tweak this further!
