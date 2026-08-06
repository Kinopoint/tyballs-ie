"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

type DatePickerProps = {
  id: string;
  name: string;
  required?: boolean;
};

const monthFormatter = new Intl.DateTimeFormat("en-IE", { month: "long", year: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "long", year: "numeric" });
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDisplayDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day} / ${month} / ${date.getFullYear()}`;
}

export function DatePicker({ id, name, required = false }: DatePickerProps) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(today));
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const firstWeekday = (visibleMonth.getDay() + 6) % 7;
    const count = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
    return [...Array(firstWeekday).fill(null), ...Array.from({ length: count }, (_, index) => new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1))];
  }, [visibleMonth]);

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    const reset = () => {
      setSelectedDate(null);
      setVisibleMonth(startOfMonth(today));
      setOpen(false);
    };
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [today]);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setVisibleMonth(startOfMonth(date));
    setOpen(false);
  };

  const moveMonth = (offset: number) => {
    setVisibleMonth(current => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  const handleCalendarKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      document.getElementById(id)?.focus();
      return;
    }

    const offsets: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    const offset = offsets[event.key];
    if (!offset) return;
    const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button[data-calendar-day]:not(:disabled)")];
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    event.preventDefault();
    buttons[Math.max(0, Math.min(buttons.length - 1, index + offset))]?.focus();
  };

  const selectedIso = selectedDate ? toIsoDate(selectedDate) : "";
  const previousMonthDisabled = visibleMonth.getFullYear() === today.getFullYear() && visibleMonth.getMonth() === today.getMonth();

  return (
    <div className={`date-picker${open ? " is-open" : ""}`} ref={rootRef}>
      <input name={name} type="hidden" value={selectedIso} />
      <input
        autoComplete="off"
        id={id}
        inputMode="none"
        onChange={() => undefined}
        onClick={() => setOpen(true)}
        onKeyDown={event => {
          if (["ArrowDown", "Enter", " "].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
          }
          if (event.key === "Escape") setOpen(false);
          if (event.key.length === 1) event.preventDefault();
        }}
        placeholder="DD / MM / YYYY"
        required={required}
        type="text"
        value={selectedDate ? toDisplayDate(selectedDate) : ""}
      />
      <button aria-controls={`${id}-calendar`} aria-expanded={open} aria-haspopup="dialog" aria-label="Open calendar" className="date-picker-trigger" onClick={() => setOpen(current => !current)} type="button">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3v3M17 3v3M4.5 9h15M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Z" /></svg>
      </button>

      {open ? (
        <div aria-label="Choose a preferred event date" aria-modal="false" className="date-picker-popover" id={`${id}-calendar`} role="dialog">
          <div className="date-picker-header">
            <button aria-label="Previous month" disabled={previousMonthDisabled} onClick={() => moveMonth(-1)} type="button">←</button>
            <strong aria-live="polite">{monthFormatter.format(visibleMonth)}</strong>
            <button aria-label="Next month" onClick={() => moveMonth(1)} type="button">→</button>
          </div>
          <div className="date-picker-weekdays" aria-hidden="true">
            {weekdays.map(day => <span key={day}>{day}</span>)}
          </div>
          <div className="date-picker-days" onKeyDown={handleCalendarKeyDown} role="grid">
            {days.map((date, index) => date ? (
              <button
                aria-label={fullDateFormatter.format(date)}
                aria-selected={selectedIso === toIsoDate(date)}
                className={`${toIsoDate(date) === toIsoDate(today) ? " is-today" : ""}${selectedIso === toIsoDate(date) ? " is-selected" : ""}`}
                data-calendar-day
                disabled={date < today}
                key={toIsoDate(date)}
                onClick={() => selectDate(date)}
                role="gridcell"
                tabIndex={selectedIso === toIsoDate(date) || (!selectedDate && toIsoDate(date) === toIsoDate(today)) ? 0 : -1}
                type="button"
              >
                {date.getDate()}
              </button>
            ) : <span aria-hidden="true" key={`empty-${index}`} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
}
