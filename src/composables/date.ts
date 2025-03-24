export function convertDate() {
  function formatDate(isoString: string) {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  }

  function formatUnixTimeToHHMM(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getTimePeriod(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();

    if (hours >= 0 && hours < 6) return "Ночь";
    if (hours >= 6 && hours < 12) return "Утро";
    if (hours >= 12 && hours < 18) return "День";
    return "Вечер";
  }

  function formatDayOfWeek(time: number): string {
    const date = new Date(time * 1000);
    return new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(date);
  }

  return { formatDate, formatUnixTimeToHHMM, getTimePeriod, formatDayOfWeek };
}
