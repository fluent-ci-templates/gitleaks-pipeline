/**
 * @module gitleaks
 * @description This module provides a function to detect secrets in code using gitleaks
 */
import { Directory, File, dag } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  detect = "detect",
}

export const exclude = [];

/**
 * Detect secrets in code
 *
 * @function
 * @description Detect secrets in code
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function detect(
  src: string | Directory | undefined = "."
): Promise<File | string> {
  const context = await getDirectory(src);
  const ctr = dag
    .pipeline(Job.detect)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["pkgx", "install", "gitleaks", "git"])
    .withExec(["gitleaks", "detect", "-v", "-r", "gitleaks-report.json"]);

  await ctr.stdout();
  ctr.file("gitleaks-report.json").export("./gitleaks-report.json");
  return ctr.file("gitleaks-report.json").id();
}

export type JobExec = (src?: string) => Promise<File | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.detect]: detect,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.detect]: "Detect secrets in code",
};
