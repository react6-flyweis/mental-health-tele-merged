import { useEffect, useState } from "react"
import { Bell, Trash2, X } from "lucide-react"
import { dashboardApi } from "@/api/dashboard.service"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

export default function NotificationDrawer() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await dashboardApi.getNotification({
          filter: "all",
          page: 1,
          limit: 20,
        })

        const apiData = res?.data?.notifications || []

        const formattedData: Notification[] = apiData.map((item: any) => ({
          id: item._id,
          title: item.title,
          description: item.message,
          time: item.timeAgo,
          read: item.isRead,
        }))

        setNotifications(formattedData)
      } catch (err: any) {
        setError(err?.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])


  const [markAllLoading, setMarkAllLoading] = useState(false);

  const handleMarkAllAsRead = async () => {
    setMarkAllLoading(true);

    try {
      await dashboardApi.getNotificationReadAll();

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    } catch (err: any) {
      console.error(err?.message || "Failed to mark all as read");
    } finally {
      setMarkAllLoading(false);
    }
  };

  const [markLoadingId, setMarkLoadingId] = useState<string | null>(null);

  const handleMarkAsRead = async (id: string) => {
    setMarkLoadingId(id);

    try {
      await dashboardApi.getNotificationRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    } catch (err: any) {
      console.error(err?.message || "Failed to mark as read");
    } finally {
      setMarkLoadingId(null);
    }
  };

  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const handleDeleteNotification = async (id: string) => {
  setDeleteLoadingId(id);

  try {
    await dashboardApi.getNotificationDelete(id);

    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  } catch (err: any) {
    console.error(err?.message || "Failed to delete notification");
  } finally {
    setDeleteLoadingId(null);
  }
};

  const filtered =
    activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-md p-2 hover:bg-muted/50 transition-colors"
      >
        <Bell className="size-5 text-foreground" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-0.5 flex h-5 w-5 items-center justify-center rounded-xl bg-gradient-dash text-[11px] font-semibold text-white ring-2 ring-background">
            {unreadCount}
          </span>
        )}
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      <div
        className={`fixed top-0 right-0 h-full pb-5 max-w-[400px] w-full bg-white z-50 shadow-xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 text-xs rounded-md ${activeTab === "all"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
                }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveTab("unread")}
              className={`px-3 py-1 text-xs rounded-md ${activeTab === "unread"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
                }`}
            >
              Unread
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={() => {
                if (!markAllLoading) handleMarkAllAsRead();
              }}
              className="text-xs font-medium text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="p-4 pt-0 space-y-3 overflow-y-auto h-[calc(100%-100px)]">
          {loading && (
            <p className="text-sm text-gray-500 text-center min-h-[200px] flex items-center justify-center">
              Loading...
            </p>
          )}

          {error && (
            <p className="text-sm text-red-500 text-center min-h-[200px] flex items-center justify-center">
              {error}
            </p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="text-sm text-gray-500 text-center min-h-[200px] flex items-center justify-center">
              No notifications
            </p>
          )}

          {!loading && !error && filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (!item.read && markLoadingId !== item.id) {
                  handleMarkAsRead(item.id)
                }
              }}
              className={`p-3 rounded-lg border cursor-pointer group transition ${item.read
                ? "bg-gray-50 border-gray-200"
                : "bg-green-50 border-green-200"
                }`}
            >
              <div className="flex justify-between min-h-6">
                <h4 className="text-sm font-medium">{item.title}</h4>

                <div className="flex items-center gap-3">
                  {!item.read && (
                    <span className="text-[10px] px-2 py-0.5 bg-green-600 text-white rounded-full">
                      New
                    </span>
                  )}
                  {deleteLoadingId === item.id ? (
  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
) : (
  <Trash2
    onClick={(e) => {
      e.stopPropagation();
      if (deleteLoadingId !== item.id) {
        handleDeleteNotification(item.id);
      }
    }}
    className="w-0 text-red-400 hover:text-red-600 cursor-pointer group-hover:w-4 group-hover:h-4 transition-all"
  />
)}
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-1">
                {item.description}
              </p>

              <p className="text-[10px] text-gray-400 mt-2">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}