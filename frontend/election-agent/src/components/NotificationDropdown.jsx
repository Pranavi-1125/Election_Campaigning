function NotificationDropdown() {

  const notifications = [
    "Campaign Started",
    "CSV Uploaded Successfully",
    "AI Agent Connected",
    "Call Completed",
  ];

  return (
    <div className="absolute right-20 top-16 w-72 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-4 z-50">

      <h2 className="text-lg font-bold mb-4">
        Notifications
      </h2>

      <div className="space-y-3">

        {notifications.map((note, index) => (
          <div
            key={index}
            className="bg-white/5 p-3 rounded-xl"
          >
            {note}
          </div>
        ))}

      </div>
    </div>
  );
}

export default NotificationDropdown;