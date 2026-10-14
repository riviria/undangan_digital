import { invite } from './data';

function escapeIcs(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

/** Unduh agenda berformat .ics, memakai jadwal contoh di lib/data.ts. */
export function downloadIcs() {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'PRODID:-//Undangan Digital//Pernikahan//ID',
    'BEGIN:VEVENT',
    'UID:raisa-arjuna-20261212@undangan.local',
    `DTSTAMP:${stamp}`,
    'DTSTART:20261212T020000Z', // 09.00 WIB
    'DTEND:20261212T070000Z',   // 14.00 WIB
    `SUMMARY:${escapeIcs(`Pernikahan ${invite.bride} & ${invite.groom}`)}`,
    `LOCATION:${escapeIcs(`${invite.venue}, ${invite.address}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pernikahan-raisa-arjuna.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
