export const Layout = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem("login");
    window.location.reload();
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {children}
    </div>
  );
};
