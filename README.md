
# Dashboard Application

A Responsive Dashboard Application for Managing Products and Services, featuring user authentication, stock level monitoring, and low stock alerts.



## Features

RESPONSIVE DASHBOARD LAYOUT: 
A flexible design that adapts to various screen sizes.

USER AUTHENTICATION: 
Login functionality to secure access to the dashboard.

PRODUCT LIST WITH STOCK DETAILS:
Displaying product name, price, and stock quantity in a table format.

STOCK LEVEL MONITORING:
Alerts for products with low stock levels.

DARK THEME: 
A visually appealing dark mode for the entire dashboard.

SEARCH BAR: 
To filter and find specific products easily.
Form for Adding New Products: A simple interface to create new product entries.


![Screenshot (47)](https://github.com/user-attachments/assets/f68f311f-a209-4490-93b8-34c3266e9ea7)

![Screenshot (48)](https://github.com/user-attachments/assets/567ab239-650d-4099-87dd-e10fa2774d0f)

![Screenshot (49)](https://github.com/user-attachments/assets/0c81b4f0-37cd-4d1e-99c0-b4954a3c09d6)

![Screenshot (50)](https://github.com/user-attachments/assets/d3ebe6ef-04fc-488e-814a-a7a09636fb21)

![Screenshot (51)](https://github.com/user-attachments/assets/1fd88308-bf91-44eb-bb20-fef132b445dc)

## Assumption

Basic Authentication Required: 
User authentication is done using basic username(admin) and password(password). It assumes no advanced role management or external authentication systems (like OAuth) are implemented.

Local Storage for User Sessions: 
The user session is maintained locally without using advanced authentication tokens.

Simple Stock Alerts: 
The low-stock alert system assumes a static threshold for all products without dynamic calculations.
## Breif Explanation

Dashboard Layout: 
I created a responsive dashboard using Next.js with structured components such as a sidebar for navigation and a main content area displaying various pages like product listing

Product Management: The product list is displayed in a table format with details like name, price, stock, and status. I have implemented features like sorting, filtering.

User Authentication: I added a basic user authentication system with login functionality, enabling access to the dashboard. The username and password are validated before allowing entry into the dashboard.

Stock Alert Notification: The dashboard also includes a stock alert notification system, where products with low stock levels trigger a visible alert. This helps users manage inventory more effectively.

Product Creation Form: A form is included for adding new products, which allows the user to input product details and submit them to be added to the product list.

Dark Theme: A dark theme design has been integrated to enhance the visual appearance of the dashboard and improve user experience, especially for low-light environments.


## Challenges Faced

Authentication Visibility: 
Initially, there were issues with making the password field visible during typing. I faced a challenge ensuring that both the username and password fields displayed entered values, which required some JavaScript adjustments to handle input types dynamically.

Chart Implementation: Integrating charts to display stock data visually required using an external library like Chart.js or Recharts and adapting it to dynamically update when product data changed.

