import { Decimal } from "@prisma/client/runtime/library";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type Plain<T> = T extends Decimal
  ? string
  : T extends Date
  ? Date
  : T extends Array<infer U>
  ? Plain<U>[]
  : T extends object
  ? { [K in keyof T]: Plain<T[K]> }
  : T;
// convert a prisma object to a regular js object
export function convertToPlainObject<T>(value: T):Plain<T> {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decemal places a
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === "ZodError") {
    // Handle Zod validation errors
    const fieldErrors = Object.keys(error.errors).map((field) => ({
      message: error.errors[field].message,
    }));

    return fieldErrors.join(", ");
  } else if (
    error.name === "PrismaClientValidationError" &&
    error.code === "P2002"
  ) {
    //  Handle prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return ` ${field.charAt(0).toUpperCase() + field.slice(1)} alraedy exists`;
  } else {
    // handle other errors

    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error);
  }
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Invalid value type. Expected number or string.");
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

// Format number as currency
export function formatCurrency(amount: number | string | null) {
  if (amount === null || amount === undefined) {
    // return CURRENCY_FORMATTER.format(0);
    return "NaN";
  }
  return CURRENCY_FORMATTER.format(
    typeof amount === "string" ? Number(amount) : amount,
  );
}

// shorten the UUID 
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}

// formate date and times
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  );
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
