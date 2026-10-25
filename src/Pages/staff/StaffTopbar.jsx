const StaffTopbar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-white/10 bg-slate-800/30 backdrop-blur-lg">
      <input
        type="text"
        placeholder="Search..."
        className="bg-slate-700/40 text-white px-4 py-2 rounded-lg"
      />

      <div className="flex gap-4 items-center">
        <div className="bg-slate-700/40 p-2 rounded-lg cursor-pointer">🔔</div>

        <div className="bg-slate-700/40 p-2 rounded-full cursor-pointer">
          👤
        </div>
      </div>
    </div>
  );
};

export default StaffTopbar;
