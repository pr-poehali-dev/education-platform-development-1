import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ElectronicJournal from "./ElectronicJournal";

interface TeacherDashboardProps {
  onLogout: () => void;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const classes = [
    { id: "5a", name: "5А", students: 28, subject: "Математика" },
    { id: "8b", name: "8Б", students: 26, subject: "Алгебра" },
    { id: "10v", name: "10В", students: 24, subject: "Геометрия" },
  ];

  const schedule = [
    { time: "08:30", class: "5А", subject: "Математика" },
    { time: "09:30", class: "8Б", subject: "Алгебра" },
    { time: "11:00", class: "10В", subject: "Геометрия" },
  ];

  if (selectedClass) {
    return (
      <ElectronicJournal
        classId={selectedClass}
        onBack={() => setSelectedClass(null)}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Icon name="GraduationCap" size={28} className="text-primary" />
              <span className="font-bold text-lg">EduPlatform</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} size={20} />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: "LayoutDashboard", label: "Главная", active: true },
            { icon: "BookOpen", label: "Журнал" },
            { icon: "Calendar", label: "Расписание" },
            { icon: "ClipboardList", label: "Домашние задания" },
            { icon: "MessageSquare", label: "Сообщения" },
          ].map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start ${!sidebarOpen && "justify-center px-2"} ${
                item.active ? "bg-sidebar-accent" : ""
              }`}
            >
              <Icon name={item.icon} size={20} />
              {sidebarOpen && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={onLogout}
            className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent ${
              !sidebarOpen && "justify-center px-2"
            }`}
          >
            <Icon name="LogOut" size={20} />
            {sidebarOpen && <span className="ml-2">Выйти</span>}
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Добрый день, Анна Сергеевна!
              </h1>
              <p className="text-muted-foreground">
                Сегодня {new Date().toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary to-secondary text-white">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Clock" size={24} />
              <h2 className="text-2xl font-semibold">Расписание на сегодня</h2>
            </div>
            <div className="space-y-3">
              {schedule.map((lesson, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all"
                >
                  <div className="text-lg font-mono font-semibold">{lesson.time}</div>
                  <div className="h-8 w-px bg-white/30" />
                  <div>
                    <div className="font-semibold">{lesson.subject}</div>
                    <div className="text-sm text-white/80">Класс {lesson.class}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-4">Мои классы</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {classes.map((classItem) => (
                <Card
                  key={classItem.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setSelectedClass(classItem.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon name="Users" size={24} className="text-primary" />
                    </div>
                    <Icon
                      name="ChevronRight"
                      size={20}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{classItem.name}</h3>
                  <p className="text-muted-foreground mb-1">{classItem.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {classItem.students} учеников
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
