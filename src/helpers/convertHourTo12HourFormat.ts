export function convertHourTo12HourFormat(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const restHours = hours % 12;
  const hours12 = restHours === 0 ? 12 : restHours;
  const formattedTime = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
  return formattedTime;
}