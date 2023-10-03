import winston from "winston";
import env from "../../config.js";

const levelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warn: "yellow",
    info: "teal",
    http: "green",
    debug: "white",
  },
};

export const logger = winston.createLogger({
  levels: levelsOptions.levels,
});

winston.addColors(levelsOptions.colors);

if (env.nodeEnv === "development") {
  logger.level = "debug";
  logger.add(new winston.transports.Console());
} else if (env.nodeEnv === "production") {
  logger.level = "info";
  logger.add(new winston.transports.Console());
  logger.add(
    new winston.transports.File({ filename: "./errors.log", level: "error" })
  );
}
