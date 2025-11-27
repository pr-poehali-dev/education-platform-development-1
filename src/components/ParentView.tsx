import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface ParentViewProps {
  onBack: () => void;
}

export default function ParentView({ onBack }: ParentViewProps) {
  const [activeTab, setActiveTab] = useState("home");

  const recentGrades = [
    { subject: "Математика", grade: "5", date: "25.11.2024", teacher: "Иванова А.С." },
    { subject: "Русский язык", grade: "4", date: "24.11.2024", teacher: "Петрова О.В." },
    { subject: "Физика", grade: "5", date: "23.11.2024", teacher: "Сидоров П.И." },
    { subject: "История", grade: "4", date: "22.11.2024", teacher: "Смирнова Е.А." },
    { subject: "Английский", grade: "5", date: "21.11.2024", teacher: "Козлова М.Н." },
  ];

  const homework = [
    { subject: "Математика", task: "Решить задачи №125-130", deadline: "Завтра" },
    { subject: "Русский язык", task: "Упражнение 45, страница 78", deadline: "Завтра" },
    { subject: "Физика", task: "Параграф 12, ответить на вопросы", deadline: "Завтра" },
  ];

  const attendance = [
    { day: "ПН", date: "21.11", present: true },
    { day: "ВТ", date: "22.11", present: true },
    { day: "СР", date: "23.11", present: true },
    { day: "ЧТ", date: "24.11", present: false },
    { day: "ПТ", date: "25.11", present: true },
  ];

  const schedule = [
    { time: "08:30", subject: "Математика", room: "Каб. 205" },
    { time: "09:30", subject: "Русский язык", room: "Каб. 301" },
    { time: "10:40", subject: "Физика", room: "Каб. 112" },
    { time: "11:40", subject: "История", room: "Каб. 208" },
    { time: "12:50", subject: "Английский", room: "Каб. 315" },
  ];

  const getGradeColor = (grade: string) => {
    if (grade === "5") return "bg-green-500";
    if (grade === "4") return "bg-blue-500";
    if (grade === "3") return "bg-yellow-500";
    if (grade === "2") return "bg-red-500";
    return "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="p-4 flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Icon name="GraduationCap" size={28} className="text-primary" />
            <div>
              <h1 className="font-bold text-lg">Александров Иван</h1>
              <p className="text-sm text-muted-foreground">5А класс</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="X" size={24} />
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pb-20 space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="home" className="gap-2">
              <Icon name="Home" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="grades" className="gap-2">
              <Icon name="Award" size={18} />
              Оценки
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Icon name="Calendar" size={18} />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <Icon name="MessageSquare" size={18} />
              Чат
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-4 mt-0">
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Icon name="Award" size={20} className="text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">Последние оценки</h2>
              </div>
              <div className="space-y-3">
                {recentGrades.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${getGradeColor(
                          item.grade
                        )} flex items-center justify-center text-white font-bold`}
                      >
                        {item.grade}
                      </div>
                      <div>
                        <div className="font-medium">{item.subject}</div>
                        <div className="text-sm text-muted-foreground">{item.teacher}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.date}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon name="ClipboardList" size={20} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Домашние задания на завтра</h2>
              </div>
              <div className="space-y-3">
                {homework.map((item, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium mb-1">{item.subject}</div>
                    <div className="text-sm text-muted-foreground">{item.task}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Icon name="CheckCircle2" size={20} className="text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold">Посещаемость за неделю</h2>
              </div>
              <div className="flex justify-between gap-2">
                {attendance.map((item, idx) => (
                  <div key={idx} className="flex-1 text-center">
                    <div
                      className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center mb-2 ${
                        item.present ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <Icon
                        name={item.present ? "Check" : "X"}
                        size={24}
                        className={item.present ? "text-green-600" : "text-red-600"}
                      />
                      <div className="text-xs font-semibold mt-1">{item.day}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-700">4 из 5 дней</div>
                <div className="text-sm text-green-600">Посещено на этой неделе</div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4 mt-0">
            <Card className="p-5">
              <h2 className="text-xl font-semibold mb-4">История оценок</h2>
              <div className="space-y-3">
                {recentGrades.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full ${getGradeColor(
                          item.grade
                        )} flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {item.grade}
                      </div>
                      <div>
                        <div className="font-semibold">{item.subject}</div>
                        <div className="text-sm text-muted-foreground">{item.teacher}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.date}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4 mt-0">
            <Card className="p-5">
              <h2 className="text-xl font-semibold mb-4">Расписание на неделю</h2>
              <div className="space-y-3">
                {schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-lg font-mono font-semibold text-primary min-w-[60px]">
                      {item.time}
                    </div>
                    <div className="h-10 w-px bg-gray-300" />
                    <div className="flex-1">
                      <div className="font-semibold">{item.subject}</div>
                      <div className="text-sm text-muted-foreground">{item.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4 mt-0">
            <Card className="p-5">
              <h2 className="text-xl font-semibold mb-4">Сообщения</h2>
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Новых сообщений нет</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
