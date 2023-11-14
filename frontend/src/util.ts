import { IManifest } from "./interfaces/IManifest";

export async function getManifest(repoFetchContentsURL: string): Promise<{
  ok: boolean;
  manifest: IManifest | null;
}> {
  const routeToManifest: string = `${repoFetchContentsURL}.manifest.json`;
  const manifestReponse: Response = await fetch(routeToManifest);
  if (!manifestReponse.ok) {
    return { ok: false, manifest: null };
  }

  const manifestBase64: string = (await manifestReponse.json()).content;
  const manifest: IManifest = JSON.parse(atob(manifestBase64));

  return { ok: true, manifest };
}
