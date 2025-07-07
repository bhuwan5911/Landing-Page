// dashboard.tsx
// Dashboard page for authenticated users. Displays contact stats, trends, recent contacts, and allows PDF export.
// Uses custom hooks, API calls, and charting libraries for data visualization.
import React from "react";
import { useAuth } from "../hooks/use-auth"; // Custom hook for authentication context
import { useNavigate } from "react-router-dom"; // Navigation between routes
import { motion } from "framer-motion"; // Animation library
import jsPDF from "jspdf"; // PDF generation
import autoTable from "jspdf-autotable"; // Table support for jsPDF
import { useTheme } from "../components/ui/theme-provider"; // Theme context
import { ChartContainer } from "../components/ui/chart"; // Chart component
import { Calendar } from "../components/ui/calendar"; // Calendar UI
import { Skeleton } from "../components/ui/skeleton"; // Loading skeleton
import { format, formatDistanceToNow } from "date-fns"; // Date formatting
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaChartLine, FaUserClock } from "react-icons/fa"; // Icons
const logoImg = "/4.jpg";
import * as RechartsPrimitive from "recharts"; // Charting primitives
import { DateRange } from "react-day-picker"; // Date range picker
import { apiCall } from "../lib/api"; // API utility for HTTP requests

// Type definitions for contacts and stats
interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface ContactStats {
  today: number;
  week: number;
  year: number;
}

interface TrendPoint { date: string; count: number; }
interface RecentContact { _id: string; name: string; createdAt: string; }

// Custom hook for animated count-up effect in stats
function useCountUp(target: number, duration = 1) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    if (target === 0) { setValue(0); return; }
    const step = Math.ceil(target / (duration * 60));
    let raf: number;
    function animate() {
      start += step;
      if (start >= target) { setValue(target); return; }
      setValue(start);
      raf = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const Dashboard = () => {
  // Main dashboard logic: authentication, navigation, state for contacts, stats, trends, and UI controls
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [stats, setStats] = React.useState<ContactStats | null>(null);
  const [trends, setTrends] = React.useState<TrendPoint[] | null>(null);
  const [recent, setRecent] = React.useState<RecentContact[] | null>(null);
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);
  const [rangeCount, setRangeCount] = React.useState<number | null>(null);
  const [trendRange, setTrendRange] = React.useState<'day' | 'week' | 'month' | 'year'>('week');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch contacts, stats, and recent contacts on mount
  React.useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiCall("/contacts");
        setContacts(data);
      } catch (err) {
        setError("Failed to fetch contacts");
      }
      setLoading(false);
    };
    const fetchStats = async () => {
      try {
        const data = await apiCall("/contacts/stats");
        setStats(data);
      } catch (err) {
        // ignore
      }
    };
    const fetchRecent = async () => {
      try {
        const data = await apiCall("/contacts/recent");
        setRecent(data);
      } catch {}
    };
    fetchContacts();
    fetchStats();
    fetchRecent();
  }, []);

  // Fetch trends when trendRange changes
  React.useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await apiCall(`/contacts/trends?range=${trendRange}`);
        setTrends(data);
      } catch {}
    };
    fetchTrends();
  }, [trendRange]);

  // Fetch stats for selected date range
  React.useEffect(() => {
    if (range && range.from && range.to) {
      const fetchRange = async () => {
        try {
          if (!range.from || !range.to) return;
          const fromStr = format(range.from, 'yyyy-MM-dd');
          const toStr = format(range.to, 'yyyy-MM-dd');
          const data = await apiCall(`/contacts/stats-range?from=${fromStr}&to=${toStr}`);
          setRangeCount(data.count);
        } catch { setRangeCount(null); }
      };
      fetchRange();
    }
  }, [range]);

  // Animated stats for today, week, year
  const todayCount = useCountUp(stats ? stats.today : 0);
  const weekCount = useCountUp(stats ? stats.week : 0);
  const yearCount = useCountUp(stats ? stats.year : 0);

  // Export contacts as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Contacts Data", 14, 16);
    autoTable(doc, {
      head: [["Name", "Email", "Subject", "Message", "Date"]],
      body: contacts.map((c) => [
        c.name,
        c.email,
        c.subject,
        c.message,
        new Date(c.createdAt).toLocaleString(),
      ]),
      startY: 22,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
    });
    doc.save("contacts.pdf");
  };

  // Delete a contact
  const handleDeleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      const res = await apiCall(`/contacts/${id}`, { method: "DELETE" });
      if (res && res.success) {
        setContacts(contacts.filter((c) => c._id !== id));
      } else {
        alert("Failed to delete contact");
      }
    } catch {
      alert("Failed to delete contact");
    }
  };

  // Main dashboard UI layout
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center transition-colors duration-700 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 p-4"
      style={{ transition: 'background 0.7s, color 0.7s' }}
    >
      <div
        className={`w-full max-w-5xl shadow-xl rounded-xl p-4 sm:p-8 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-700`}
        style={{ transition: 'background 0.7s, color 0.7s' }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="CreatorXJatin Logo" className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow" />
            <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-white">Dashboard</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              tabIndex={0}
              aria-label="Download PDF"
            >
              Download PDF
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold py-2 px-4 rounded-lg transition-all duration-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              title="Toggle day/night mode"
              tabIndex={0}
              aria-label="Toggle day/night mode"
            >
              {theme === "dark" ? "🌞 Day" : "🌙 Night"}
            </button>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              tabIndex={0}
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats ? (
            [
              { label: 'Today', icon: <FaCalendarDay />, color: 'text-green-600 dark:text-green-400', value: todayCount, highlight: 'bg-green-50 dark:bg-green-900' },
              { label: 'This Week', icon: <FaCalendarWeek />, color: 'text-blue-600 dark:text-blue-400', value: weekCount, highlight: 'bg-blue-50 dark:bg-blue-900' },
              { label: 'This Year', icon: <FaCalendarAlt />, color: 'text-purple-600 dark:text-purple-400', value: yearCount, highlight: 'bg-purple-50 dark:bg-purple-900' },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`flex flex-col items-center justify-center rounded-lg shadow-md p-4 ${card.highlight} transition-colors`}
              >
                <div className={`text-3xl mb-2 ${card.color}`}>{card.icon}</div>
                <div className="text-2xl font-bold mb-1">{card.value}</div>
                <div className="text-sm font-medium opacity-80">{card.label}</div>
              </motion.div>
            ))
          ) : (
            <>
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-blue-300 font-semibold">
              <FaChartLine />
              <span>Trends</span>
              <select
                value={trendRange}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTrendRange(e.target.value as any)}
                className="ml-2 px-2 py-1 rounded border border-gray-300 dark:bg-gray-900 dark:text-white text-sm"
                style={{ minWidth: 120 }}
              >
                <option value="day">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            {trends && trends.length > 0 ? (
              <>
                {trends.every(t => t.count === 0) ? (
                  <div className="text-center text-gray-400 py-8">No contacts in this period.</div>
                ) : (
                  <ChartContainer config={{ trend: { color: isDark ? '#60a5fa' : '#2563eb' } }} className="w-full h-32">
                    <RechartsPrimitive.BarChart data={trends} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                      <RechartsPrimitive.Bar dataKey="count" fill="var(--color-trend)" minPointSize={3} />
                      <RechartsPrimitive.XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 10 }} 
                        tickFormatter={date => {
                          if (trendRange === 'year') return date.slice(5); // show MM for year
                          if (trendRange === 'month' || trendRange === 'week' || trendRange === 'day') return date.slice(8); // show DD
                          return date;
                        }}
                      />
                      <RechartsPrimitive.YAxis allowDecimals={false} />
                      <RechartsPrimitive.Tooltip 
                        formatter={(value: any) => [`${value} people`, 'Contacts']} 
                        labelFormatter={label => {
                          if (trendRange === 'year') return `Month: ${label}`;
                          if (trendRange === 'month' || trendRange === 'week' || trendRange === 'day') return `Date: ${label}`;
                          return label;
                        }}
                        cursor={false}
                      />
                    </RechartsPrimitive.BarChart>
                  </ChartContainer>
                )}
              </>
            ) : <Skeleton className="h-20 w-full" />}
          </div>
          <div className="w-full md:w-64 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-300 font-semibold"><FaUserClock /> Recent Activity</div>
            {recent ? (
              <ul className="space-y-2">
                {recent.map(r => (
                  <li key={r._id} className="flex justify-between items-center">
                    <span className="font-semibold truncate max-w-[120px]">{r.name}</span>
                    <span className="text-xs opacity-70">{formatDistanceToNow(new Date(r.createdAt), { addSuffix: true })}</span>
                  </li>
                ))}
              </ul>
            ) : <Skeleton className="h-20 w-full" />}
          </div>
        </div>
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Custom Range:</span>
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={1}
              className="bg-white dark:bg-gray-900 rounded-lg shadow p-2"
            />
          </div>
          <div className="ml-4">
            {range && range.from && range.to && (
              <div className="text-lg font-semibold">
                Contacts: <span className="text-blue-600 dark:text-blue-400">{rangeCount !== null ? rangeCount : <Skeleton className="h-6 w-10 inline-block" />}</span>
                <span className="ml-2 text-xs opacity-70">({range.from && range.to ? `${format(range.from, 'MMM d, yyyy')} - ${format(range.to, 'MMM d, yyyy')}` : ''})</span>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-inner">
          {loading ? (
            <div className="text-center py-10 text-lg animate-pulse">Loading contacts...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <motion.table
              className={`min-w-full table-auto border-collapse rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              tabIndex={0}
              aria-label="Contacts Table"
            >
              <thead className={isDark ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}>
                <tr>
                  <th className="px-4 py-2" tabIndex={0}>Name</th>
                  <th className="px-4 py-2" tabIndex={0}>Email</th>
                  <th className="px-4 py-2" tabIndex={0}>Subject</th>
                  <th className="px-4 py-2" tabIndex={0}>Message</th>
                  <th className="px-4 py-2" tabIndex={0}>Date</th>
                  <th className="px-4 py-2" tabIndex={0}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, idx) => (
                  <motion.tr
                    key={contact._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={
                      isDark
                        ? 'even:bg-gray-800 odd:bg-gray-900 hover:bg-gray-700 transition-colors'
                        : 'even:bg-gray-100 odd:bg-white hover:bg-blue-50 transition-colors'
                    }
                    tabIndex={0}
                  >
                    <td className="px-4 py-2 font-semibold" tabIndex={0}>{contact.name}</td>
                    <td className="px-4 py-2" tabIndex={0}>{contact.email}</td>
                    <td className="px-4 py-2" tabIndex={0}>{contact.subject}</td>
                    <td className="px-4 py-2 max-w-xs truncate" title={contact.message} tabIndex={0}>{contact.message}</td>
                    <td className="px-4 py-2 text-sm" tabIndex={0}>{new Date(contact.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                        tabIndex={0}
                        aria-label={`Delete contact ${contact.name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 