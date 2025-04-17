export function isSchoolTime() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isWeekday = day >= 1 && day <= 5;
  const isSchoolHours = (hour >= 9 && hour < 12) || (hour >= 13 && hour < 16);

  return isWeekday && isSchoolHours;
}
