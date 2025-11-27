import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface ElectronicJournalProps {
  classId: string;
  onBack: () => void;
  onLogout: () => void;
}

export default function ElectronicJournal({ classId, onBack, onLogout }: ElectronicJournalProps) {
  const [selectedSubject, setSelectedSubject] = useState("math");
  const [selectedWeek, setSelectedWeek] = useState("current");

  const students = [
    { id: 1, name: "Александров Иван" },
    { id: 2, name: "Белова Мария" },
    { id: 3, name: "Васильев Петр" },
    { id: 4, name: "Григорьева Анна" },
    { id: 5, name: "Дмитриев Алексей" },
    { id: 6, name: "Егорова Екатерина" },
    { id: 7, name: "Жуков Николай" },
    { id: 8, name: "Зайцева Ольга" },
  ];

  const dates = [
    { date: "21.11", day: "ПН" },
    { date: "22.11", day: "ВТ" },
    { date: "23.11", day: "СР" },
    { date: "24.11", day: "ЧТ" },
    { date: "25.11", day: "ПТ" },
  ];

  const [grades, setGrades] = useState<Record<string, string>>({
    "1-21.11": "5",
    "1-22.11": "4",
    "2-21.11": "4",
    "2-23.11": "5",
    "3-22.11": "3",
    "3-24.11": "4",
    "4-21.11": "5",
    "5-23.11": "4",
    "6-21.11": "5",
    "6-22.11": "5",
  });

  const handleGradeChange = (studentId: number, date: string, value: string) => {
    const key = `${studentId}-${date}`;
    if (value === "") {
      const newGrades = { ...grades };
      delete newGrades[key];
      setGrades(newGrades);
    } else {
      setGrades({ ...grades, [key]: value });
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade === "5") return "bg-green-100 text-green-700 border-green-300";
    if (grade === "4") return "bg-blue-100 text-blue-700 border-blue-300";
    if (grade === "3") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    if (grade === "2") return "bg-red-100 text-red-700 border-red-300";
    return "";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
          <Icon name="GraduationCap" size={28} className="text-primary" />
          <span className="font-bold text-lg">EduPlatform</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="ml-2">Назад</span>
          </Button>
          {[
            { icon: "LayoutDashboard", label: "Главная" },
            { icon: "BookOpen", label: "Журнал", active: true },
            { icon: "Calendar", label: "Расписание" },
            { icon: "ClipboardList", label: "Домашние задания" },
            { icon: "MessageSquare", label: "Сообщения" },
          ].map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start ${item.active ? "bg-sidebar-accent" : ""}`}
            >
              <Icon name={item.icon} size={20} />
              <span className="ml-2">{item.label}</span>
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Icon name="LogOut" size={20} />
            <span className="ml-2">Выйти</span>
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Электронный журнал</h1>
          </div>

          <Card className="p-6 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Класс</label>
                <Select value={classId} disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5a">5А</SelectItem>
                    <SelectItem value="8b">8Б</SelectItem>
                    <SelectItem value="10v">10В</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Предмет</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Математика</SelectItem>
                    <SelectItem value="algebra">Алгебра</SelectItem>
                    <SelectItem value="geometry">Геометрия</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Неделя</label>
                <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prev">Прошлая неделя</SelectItem>
                    <SelectItem value="current">Текущая неделя</SelectItem>
                    <SelectItem value="next">Следующая неделя</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6 overflow-x-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Журнал оценок</h2>
              <Button className="gap-2">
                <Icon name="Plus" size={18} />
                Добавить домашнее задание
              </Button>
            </div>

            <div className="min-w-[800px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-3 font-semibold bg-gray-50 sticky left-0 z-10 min-w-[200px]">
                      Ученик
                    </th>
                    {dates.map((d) => (
                      <th key={d.date} className="text-center p-3 font-semibold bg-gray-50 min-w-[100px]">
                        <div className="text-xs text-muted-foreground mb-1">{d.day}</div>
                        <div>{d.date}</div>
                      </th>
                    ))}
                    <th className="text-center p-3 font-semibold bg-gray-50 min-w-[80px]">Средний балл</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const studentGrades = dates.map(d => grades[`${student.id}-${d.date}`]).filter(Boolean);
                    const average = studentGrades.length > 0
                      ? (studentGrades.reduce((sum, g) => sum + parseInt(g), 0) / studentGrades.length).toFixed(1)
                      : "—";

                    return (
                      <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-medium bg-white sticky left-0 z-10">{student.name}</td>
                        {dates.map((d) => {
                          const key = `${student.id}-${d.date}`;
                          const grade = grades[key] || "";
                          return (
                            <td key={d.date} className="p-3 text-center">
                              <input
                                type="text"
                                maxLength={1}
                                value={grade}
                                onChange={(e) => handleGradeChange(student.id, d.date, e.target.value)}
                                className={`w-12 h-12 text-center text-lg font-semibold rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                                  grade ? getGradeColor(grade) : "border-gray-200 hover:border-gray-300"
                                }`}
                                placeholder="—"
                              />
                            </td>
                          );
                        })}
                        <td className="p-3 text-center font-semibold text-lg">{average}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
