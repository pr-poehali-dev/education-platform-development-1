import { useState } from "react";
import { Button } from "@/components/ui/button";
import TeacherLogin from "@/components/TeacherLogin";
import TeacherDashboard from "@/components/TeacherDashboard";
import ParentView from "@/components/ParentView";
import Icon from "@/components/ui/icon";

type ViewMode = "welcome" | "teacher-login" | "teacher-dashboard" | "parent-view";

export default function Index() {
  const [viewMode, setViewMode] = useState<ViewMode>("welcome");

  if (viewMode === "teacher-login") {
    return <TeacherLogin onLogin={() => setViewMode("teacher-dashboard")} />;
  }

  if (viewMode === "teacher-dashboard") {
    return <TeacherDashboard onLogout={() => setViewMode("welcome")} />;
  }

  if (viewMode === "parent-view") {
    return <ParentView onBack={() => setViewMode("welcome")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4 animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mb-6 shadow-lg">
            <Icon name="GraduationCap" className="text-white" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            EduPlatform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Современная образовательная платформа для учителей и родителей
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Icon name="Users" size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Для учителей</h2>
            <p className="text-muted-foreground">
              Электронный журнал, расписание, управление домашними заданиями
            </p>
            <Button
              size="lg"
              className="w-full mt-4"
              onClick={() => setViewMode("teacher-login")}
            >
              Войти как учитель
            </Button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 space-y-4">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Icon name="UserCircle" size={32} className="text-secondary" />
            </div>
            <h2 className="text-2xl font-bold">Для родителей</h2>
            <p className="text-muted-foreground">
              Оценки, посещаемость, расписание и связь с учителями
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="w-full mt-4"
              onClick={() => setViewMode("parent-view")}
            >
              Открыть мобильную версию
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: "BookOpen",
                title: "Электронный журнал",
                desc: "Ведение оценок и посещаемости"
              },
              {
                icon: "Calendar",
                title: "Расписание",
                desc: "Актуальное расписание занятий"
              },
              {
                icon: "MessageSquare",
                title: "Сообщения",
                desc: "Прямая связь между учителями и родителями"
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
