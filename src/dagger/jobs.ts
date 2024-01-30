import { Directory, File, dag } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  detect = "detect",
}

export const exclude = [];

/**
 * @function
 * @description Detect secrets in code
 * @param {string | Directory | undefined} src
 * @returns {string}
 */
export async function detect(
  src: string | Directory | undefined = "."
): Promise<File | string> {
  const context = await getDirectory(dag, src);
  const ctr = dag
    .pipeline(Job.detect)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["pkgx", "install", "gitleaks", "git"])
    .withExec(["gitleaks", "detect", "-v", "-r", "gitleaks-report.json"]);

  await ctr.stdout();
  const id = await ctr.file("gitleaks-report.json").id();
  ctr.file("gitleaks-report.json").export("./gitleaks-report.json");

  return id;
}

export type JobExec = (src?: string) => Promise<File | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.detect]: detect,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.detect]: "Detect secrets in code",
};
