"use client"; 
import { useState } from "react";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCredentials, setAuthCredentials] = useState({
    username: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Aspire Executive Desk", category: "Furniture", status: "Active", sales: 12, stock: 24, price: "$1,200" },
    { id: 2, name: "Horizon Pro Chair", category: "Office Supplies", status: "Active", sales: 18, stock: 15, price: "$450" },
    { id: 3, name: "Apex Blender", category: "Kitchenware", status: "Active", sales: 25, stock: 40, price: "$130" },
    { id: 4, name: "Zenith Coffee Maker", category: "Appliances", status: "Active", sales: 30, stock: 25, price: "$250" },
    { id: 5, name: "PureComfort Mattress", category: "Bedroom", status: "Active", sales: 10, stock: 20, price: "$800" },
    { id: 6, name: "Lumina Smart Lamp", category: "Electronics", status: "Active", sales: 50, stock: 10, price: "$100" },
    { id: 7, name: "Breeze Air Purifier", category: "Home Appliances", status: "Active", sales: 20, stock: 12, price: "$300" },
    { id: 8, name: "Velocity Running Shoes", category: "Sportswear", status: "Active", sales: 60, stock: 18, price: "$200" },
    { id: 9, name: "Prestige Dinner Set", category: "Kitchenware", status: "Active", sales: 40, stock: 35, price: "$350" },
    { id: 10, name: "Serenity Yoga Mat", category: "Fitness", status: "Active", sales: 80, stock: 60, price: "$50" },
    { id: 11, name: "Voyager Laptop Bag", category: "Accessories", status: "Active", sales: 15, stock: 25, price: "$120" },
    { id: 12, name: "Elevate Standing Desk", category: "Furniture", status: "Active", sales: 22, stock: 10, price: "$700" },
    { id: 13, name: "Aura Essential Oils", category: "Health & Wellness", status: "Active", sales: 35, stock: 50, price: "$40" },
    { id: 14, name: "Glide Hair Straightener", category: "Personal Care", status: "Active", sales: 45, stock: 20, price: "$80" },
    { id: 15, name: "Cascade Water Bottle", category: "Outdoor Gear", status: "Active", sales: 55, stock: 30, price: "$30" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    status: "Active",
    sales: "",
    stock: "",
    price: "",
  });
  const LOW_STOCK_THRESHOLD = 15;
  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = authCredentials;
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthCredentials({ username: "", password: "" });
    setAuthError("");
  };
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  const categories = [...new Set(products.map(product => product.category))];
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewProduct({
      name: "",
      category: "",
      status: "Active",
      sales: "",
      stock: "",
      price: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.sales || !newProduct.stock || !newProduct.price) {
      alert("Please fill in all fields.");
      return;
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const formattedPrice = newProduct.price.startsWith("$") ? newProduct.price : `$${newProduct.price}`;

    const productToAdd = {
      id: newId,
      name: newProduct.name,
      category: newProduct.category,
      status: newProduct.status,
      sales: parseInt(newProduct.sales, 10),
      stock: parseInt(newProduct.stock, 10),
      price: formattedPrice,
    };

    setProducts([...products, productToAdd]);
    closeModal();
  };
  const lowStockItems = products.filter(
    (product) => product.stock < LOW_STOCK_THRESHOLD && product.status === "Active"
  );
  const disabledItems = products.filter((product) => product.status === "Disabled");
  if (!isAuthenticated) {
    return (
      <div className={`login-container ${theme}`}>
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {authError && <p className="error">{authError}</p>}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={authCredentials.username}
              onChange={handleAuthChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={authCredentials.password}
              onChange={handleAuthChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>

        <style jsx>{`
          .login-container {
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${theme === "dark" ? "#1a1a2e" : "#f0f0f0"};
          }

          .login-form {
            background-color: ${theme === "dark" ? "#16213e" : "#fff"};
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 400px;
            color: ${theme === "dark" ? "#fff" : "#000"};
          }

          .login-form h2 {
            margin-bottom: 20px;
            text-align: center;
          }

          .login-form .error {
            color: #e74c3c;
            margin-bottom: 10px;
            text-align: center;
          }

          .login-form .form-group {
            margin-bottom: 15px;
          }

          .login-form .form-group label {
            display: block;
            margin-bottom: 5px;
          }

          .login-form .form-group input {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }

          .login-btn {
            width: 100%;
            padding: 10px;
            background-color: #6c63ff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .login-btn:hover {
            background-color: #5856d6;
          }
        `}</style>
      </div>
    );
  }
  return (
    <div className={`dashboard ${theme}`}>
      <div className={`sidebar ${theme}`}>
        <h2>Products</h2>
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>Statistics</li>
          <li>Inbox</li>
          <li>Notifications</li>
          <li onClick={handleLogout} className="logout">
            Logout
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="header">
          <h1>Products</h1>
          <div className="header-actions">
            <button className="add-product" onClick={openModal}>Add Product</button>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
        <div className="alerts">
          {lowStockItems.length > 0 && (
            <div className="alert alert-low-stock">
              <strong>Low Stock:</strong> {lowStockItems.length} item(s) are running low on stock.
              <ul>
                {lowStockItems.map((item) => (
                  <li key={item.id}>
                    {item.name} (Stock: {item.stock})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {disabledItems.length > 0 && (
            <div className="alert alert-disabled">
              <strong>Disabled Items:</strong> {disabledItems.length} item(s) are disabled.
              <ul>
                {disabledItems.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={theme === "light" ? "light" : ""}
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={theme === "light" ? "light" : ""}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={`product-table ${theme}`}>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Status</th>
                <th>Sales</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td className={`status ${product.status.toLowerCase()}`}>{product.status}</td>
                    <td>{product.sales}</td>
                    <td>{product.stock}</td>
                    <td>{product.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className={`modal ${theme}`} onClick={(e) => e.stopPropagation()}>
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                  className={theme === "light" ? "light" : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                  className={theme === "light" ? "light" : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  value={newProduct.status}
                  onChange={handleInputChange}
                  required
                  className={theme === "light" ? "light" : ""}
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sales">Sales:</label>
                <input
                  type="number"
                  id="sales"
                  name="sales"
                  value={newProduct.sales}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className={theme === "light" ? "light" : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className={theme === "light" ? "light" : ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                  placeholder="$"
                  className={theme === "light" ? "light" : ""}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Add</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard {
          display: flex;
          height: 100vh;
          overflow: hidden; /* Prevent the entire page from scrolling */
          background-color: #1a1a2e;
          color: #fff;
          font-family: Arial, sans-serif;
        }

        .dashboard.light {
          background-color: #fff;
          color: #000;
        }

        .sidebar {
          flex: 0 0 20%;
          background-color: #16213e;
          padding: 20px;
          height: 100vh; /* Ensure sidebar occupies full height */
          overflow-y: auto; /* Allow sidebar content to scroll if needed */
          position: relative;
        }

        .sidebar.light {
          background-color: #f0f0f0;
          color: #000;
        }

        .sidebar h2 {
          margin-bottom: 20px;
          text-align: center;
        }

        .sidebar ul {
          list-style-type: none;
          padding: 0;
        }

        .sidebar ul li {
          margin: 15px 0;
          font-size: 18px;
          cursor: pointer;
          transition: color 0.3s;
          position: relative;
        }

        .sidebar ul li:hover {
          color: #6c63ff;
        }

        .sidebar ul li.logout {
          color: #ff4d4d;
          margin-top: 30px;
        }

        .sidebar ul li.logout:hover {
          color: #e04343;
        }

        .content {
          flex: 1;
          padding: 20px;
          overflow-y: auto; /* Enable scrolling within content area */
          height: 100vh; /* Match the sidebar height */
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .header h1 {
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .add-product {
          background-color: #6c63ff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .add-product:hover {
          background-color: #5856d6;
        }

        .theme-toggle {
          background-color: #f39c12;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .dashboard.light .theme-toggle {
          background-color: #3498db;
          color: #000;
        }

        .filters {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filters input,
        .filters select {
          padding: 10px;
          border-radius: 5px;
          border: none;
          background-color: #2c2c54;
          color: white;
          flex: 1;
          min-width: 200px;
          transition: background-color 0.3s, color 0.3s;
        }

        .filters input {
          margin-right: 10px;
        }

        .filters .light {
          background-color: #fff;
          color: #000;
          border: 1px solid #ccc;
        }

        /* Alerts */
        .alerts {
          margin-bottom: 20px;
        }

        .alert {
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 10px;
          color: #fff;
          position: relative;
        }

        .alert-low-stock {
          background-color: #e74c3c; /* Bright Red */
        }

        .alert-disabled {
          background-color: #c0392b; /* Darker Red */
        }

        .alert ul {
          list-style-type: disc;
          margin-left: 20px;
          margin-top: 10px;
        }

        /* Product Table */
        .product-table {
          background-color: #0f3460;
          padding: 20px;
          border-radius: 10px;
          overflow-x: auto; /* Handle table overflow on small screens */
          margin-bottom: 20px;
        }

        .product-table.light {
          background-color: #fff;
          color: #000;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ccc;
        }

        th {
          background-color: #1e1e2f;
          color: #fff;
        }

        .dashboard.light th {
          background-color: #e0e0e0;
          color: #000;
        }

        td {
          color: #fff;
        }

        .dashboard.light td {
          color: #000;
        }

        .status.active {
          color: #29ffbf;
        }

        .status.disabled {
          color: #ff4d4d;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background-color: #16213e;
          padding: 30px;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          color: #fff;
          position: relative;
        }

        .modal.light {
          background-color: #f0f0f0;
          color: #000;
        }

        .modal h2 {
          margin-top: 0;
          margin-bottom: 20px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: none;
          background-color: #2c2c54;
          color: white;
          transition: background-color 0.3s, color 0.3s;
        }

        .modal.light .form-group input,
        .modal.light .form-group select {
          background-color: #fff;
          color: #000;
          border: 1px solid #ccc;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .submit-btn {
          background-color: #6c63ff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .submit-btn:hover {
          background-color: #5856d6;
        }

        .cancel-btn {
          background-color: #ff4d4d;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .cancel-btn:hover {
          background-color: #e04343;
        }

        /* Login Styles */
        .login-container {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-form {
          background-color: ${theme === "dark" ? "#16213e" : "#fff"};
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 90%;
          max-width: 400px;
          color: ${theme === "dark" ? "#fff" : "#000"};
        }

        .login-form h2 {
          margin-bottom: 20px;
          text-align: center;
        }

        .login-form .error {
          color: #e74c3c;
          margin-bottom: 10px;
          text-align: center;
        }

        .login-form .form-group {
          margin-bottom: 15px;
        }

        .login-form .form-group label {
          display: block;
          margin-bottom: 5px;
        }

        .login-form .form-group input {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .login-btn {
          width: 100%;
          padding: 10px;
          background-color: #6c63ff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-btn:hover {
          background-color: #5856d6;
        }

        /* Responsive Adjustments */
        @media screen and (max-width: 768px) {
          .dashboard {
            flex-direction: column;
          }

          .sidebar {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
          }

          .content {
            height: calc(100vh - auto);
          }

          .header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
            margin-top: 10px;
          }

          .filters {
            flex-direction: column;
            gap: 10px;
          }

          .filters input,
          .filters select {
            width: 100%;
            margin-right: 0;
          }

          /* Alerts adjustments */
          .alert {
            font-size: 14px;
          }

          .alert ul {
            margin-left: 15px;
          }
        }
      `}</style>
    </div>
  );
}
