import type { DailyMetric, HourlyActivity } from "@/types";
import { subDays } from "@/lib/utils";

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return function () {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function formatDateKey(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const ANCHOR_DATE = new Date("2026-11-14T00:00:00.000Z");

export function getMockMetrics(useEmpty = false, baseDate?: Date): DailyMetric[] {
  const today = baseDate ? new Date(baseDate) : new Date(ANCHOR_DATE);
  today.setHours(0, 0, 0, 0);

  const rand = mulberry32(42);
  const metrics: DailyMetric[] = [];

  let runningContacts = 180;

  for (let i = 89; i >= 0; i--) {
    const dayDate = subDays(today, i);
    const dateStr = formatDateKey(dayDate);

    const newContacts = Math.floor(rand() * 4); // 0-3
    runningContacts += newContacts;
    const messagesSent = Math.floor(rand() * 21) + 5; // 5-25
    const messagesReceived = Math.floor(rand() * 18) + 3; // 3-20
    const openConversations = Math.floor(rand() * 9) + 2; // 2-10
    const repliedConversations = Math.floor(rand() * 8) + 1; // 1-8
    const isReplyNull = rand() < 0.15;
    const firstReplyMinutes = isReplyNull ? null : Math.floor(rand() * 41) + 5; // 5-45

    if (useEmpty) {
      metrics.push({
        date: dateStr,
        totalContacts: 0,
        newContacts: 0,
        messagesSent: 0,
        messagesReceived: 0,
        openConversations: 0,
        repliedConversations: 0,
        firstReplyMinutes: null,
      });
    } else {
      metrics.push({
        date: dateStr,
        totalContacts: runningContacts,
        newContacts,
        messagesSent,
        messagesReceived,
        openConversations,
        repliedConversations: Math.min(openConversations, repliedConversations),
        firstReplyMinutes,
      });
    }
  }

  return metrics;
}

export function getMockHourlyActivity(useEmpty = false): HourlyActivity[] {
  if (useEmpty) {
    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: 0,
    }));
  }

  const rand = mulberry32(42);

  return Array.from({ length: 24 }, (_, hour) => {
    let count: number;
    if ((hour >= 10 && hour <= 14) || (hour >= 17 && hour <= 20)) {
      // Peak hours: 8 to 15
      count = Math.floor(rand() * 8) + 8;
    } else if (hour >= 8 && hour <= 21) {
      // Moderate hours: 3 to 9
      count = Math.floor(rand() * 7) + 3;
    } else {
      // Off-peak hours: 0 to 3
      count = Math.floor(rand() * 4);
    }

    return {
      hour,
      count: Math.min(15, count),
    };
  });
}
