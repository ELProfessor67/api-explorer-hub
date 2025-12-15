import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Bot,
  Phone,
  Key,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

interface NavGroup {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: "Agent",
    icon: <Bot className="w-4 h-4" />,
    items: [
      { title: "Create Agent", href: "/agent/create", method: "POST" },
      { title: "Get Agent", href: "/agent/get", method: "GET" },
      { title: "Update Agent", href: "/agent/update", method: "POST" },
      { title: "Delete Agent", href: "/agent/delete", method: "DELETE" },
    ],
  },
  {
    title: "Calls",
    icon: <Phone className="w-4 h-4" />,
    items: [
      { title: "Get Call History", href: "/calls/get", method: "GET" },
      { title: "Make Outbound Call", href: "/calls/make", method: "POST" },
      { title: "Get Call Stats", href: "/calls/stats", method: "GET" },
      { title: "Get Numbers", href: "/calls/numbers", method: "GET" },
      { title: "Delete Numbers", href: "/calls/delete-numbers", method: "DELETE" },
    ],
  },
];

const methodColors = {
  GET: "text-method-get",
  POST: "text-method-post",
  PUT: "text-method-put",
  DELETE: "text-method-delete",
};

export function ApiSidebar() {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Agent", "Calls"]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center glow-sm">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">API Docs</h1>
                <p className="text-xs text-muted-foreground">v1.0.0</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Introduction */}
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )
              }
            >
              <BookOpen className="w-4 h-4" />
              Introduction
            </NavLink>

            {/* API Groups */}
            {navigation.map((group) => (
              <div key={group.title} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <span className="flex items-center gap-3">
                    {group.icon}
                    {group.title}
                  </span>
                  {expandedGroups.includes(group.title) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {expandedGroups.includes(group.title) && (
                  <div className="ml-4 pl-4 border-l border-sidebar-border space-y-1 animate-fade-in">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive(item.href)
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        <span>{item.title}</span>
                        {item.method && (
                          <span
                            className={cn(
                              "text-[10px] font-mono font-semibold",
                              methodColors[item.method]
                            )}
                          >
                            {item.method}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">
                Need help?{" "}
                <a href="#" className="text-primary hover:underline">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
