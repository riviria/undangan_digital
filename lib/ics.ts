import { invite } from './data';

export function downloadIcs() {
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Undangan Digital//ID', 'BEGIN:VEVENT',
    'UID:raisa-arjuna-20261212@undangan',
    'DTSTAMP:20261013T000000Z',
    'DTSTART:20261212T020000Z', // 09.00 WIB
    'DTEND:20261212T070000Z',   // 14.00 WIB
    `SUMMARY:Pernikahan ${invite.bride} & ${invite.groom}`,
    `LOCATION:${invite.venue}, ${invite.address}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'pernikahan-raisa-arjuna.ics';
  a.click();
  URL.revokeObjectURL(a.href);
}
