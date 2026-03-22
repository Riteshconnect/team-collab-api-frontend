const Navbar = () => {
  return (
    <div className="h-14 bg-white shadow px-6 flex items-center justify-between">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span>User</span>
      </div>
    </div>
  );
};

export default Navbar;