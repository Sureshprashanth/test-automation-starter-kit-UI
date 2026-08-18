import * as winston from "winston";
import * as fs from "fs";

const logDir = ".logs";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  })
);

export const getLogger = (): winston.Logger => {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: logFormat,
    transports: [
      new winston.transports.File({
        filename: `${logDir}/test-execution.log`,
      }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `[${level}]: ${message}`;
          })
        ),
      }),
    ],
  });
};
