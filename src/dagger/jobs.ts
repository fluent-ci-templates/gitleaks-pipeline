import Client, { Directory, File } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  detect = "detect",
}

export const exclude = [];

/**
 * @function
 * @description Detect secrets in code
 * @param src {src: string | Directory | undefined}
 * @returns {string}
 */
export async function detect(
  src: string | Directory | undefined = "."
): Promise<File | string> {
  let id = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const ctr = client
      .pipeline(Job.detect)
      .container()
      .from("pkgxdev/pkgx:latest")
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec(["pkgx", "install", "gitleaks", "git"])
      .withExec(["gitleaks", "detect", "-v", "-r", "gitleaks-report.json"]);

    await ctr.stdout();
    id = await ctr.file("gitleaks-report.json").id();
  });

  return id;
}

export type JobExec = (src?: string) => Promise<File | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.detect]: detect,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.detect]: "Detect secrets in code",
};
