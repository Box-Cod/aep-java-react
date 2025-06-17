// // src/api/accidentService.ts
// export interface Accident {
//   id: number;
//   title: string;
//   location: string;
//   datetime: string;      // ISO‑string
//   description: string;
//   photoUrl: string;
// }

// /* ---------- helpers ---------- */
// const STORAGE_KEY = "accidents";

// /** Lê a lista guardada (ou um array vazio) */
// function load(): Accident[] {
//   return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
// }

// /** Salva a lista completa no localStorage */
// function save(list: Accident[]) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
// }

// /* ---------- API fake ---------- */

// /** Retorna os acidentes mais recentes (mantive a Promise p/ não quebrar código) */
// export function getLastAccidents(): Promise<{ data: Accident[] }> {
//   return Promise.resolve({ data: load() });
// }

// /** “Cria” um acidente apenas no front */
// export function createAccident(fd: FormData): Promise<void> {
//   const list = load();

//   // monta objeto a partir dos campos do <form>
//   const acc: Accident = {
//     id: Date.now(),                                          // simples, único no navegador
//     title: fd.get("title") as string,
//     location: fd.get("location") as string,
//     datetime: fd.get("datetime") as string,
//     description: (fd.get("description") as string) || "",
//     photoUrl: (() => {
//       const file = fd.get("photo") as File | null;
//       return file ? URL.createObjectURL(file) : "/static/placeholder.jpg";
//     })(),
//   };

//   // coloca no topo da lista e grava
//   list.unshift(acc);
//   save(list);

//   return Promise.resolve();          // mantém mesma assinatura assíncrona
// }

// src/api/accidentService.ts
export interface Accident {
  id: number;
  title: string;
  location: string;
  datetime: string;   // ISO
  description: string;
  photoUrl: string;   // agora é base64
}

const STORAGE_KEY = "accidents";

/* utilidades */
function load(): Accident[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}
function save(list: Accident[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/* ------------  NOVO: reduzir + converter p/ base64  ------------ */
function resizeImage(file: File, maxW = 800, maxH = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        /* calcula escala mantendo proporção */
        let { width: w, height: h } = img;
        const ratio = Math.min(maxW / w, maxH / h, 1); // nunca aumenta
        w *= ratio;
        h *= ratio;

        /* desenha no canvas */
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);

        /* jpeg 0.8 → string base64 */
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/* ------------  API fake  ------------ */
export function getLastAccidents(): Promise<{ data: Accident[] }> {
  return Promise.resolve({ data: load() });
}

export async function createAccident(fd: FormData): Promise<void> {
  const list = load();

  /* se veio foto, converte; senão usa placeholder */
  let photoUrl = "/static/placeholder.jpg";
  const file = fd.get("photo") as File | null;
  if (file) {
    photoUrl = await resizeImage(file);        // <= AQUI
  }

  const acc: Accident = {
    id: Date.now(),
    title: fd.get("title") as string,
    location: fd.get("location") as string,
    datetime: fd.get("datetime") as string,
    description: (fd.get("description") as string) || "",
    photoUrl,
  };

  list.unshift(acc);
  save(list);
}

export function deleteAccident(id: number): void {
  const list = load().filter((acc) => acc.id !== id);
  save(list);
}

export function updateAccident(updated: Accident): void {
  const list = load().map((acc) => (acc.id === updated.id ? updated : acc));
  save(list);
}